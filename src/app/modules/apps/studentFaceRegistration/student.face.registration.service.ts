
import { PersonType, Prisma } from '@prisma/client';
import { Request } from 'express';
import { FileUploadHelper } from '../../../../helpers/FileUploadHelper';
import { prisma } from '../../../../shared/prisma';

type MulterRequest = Request & {
  file?: Express.Multer.File;
  body: {
    studentId?: string;
    faceEmbedding?: string | number[];
  };
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// =========================================================
// PARSE FACE EMBEDDING
// =========================================================

const parseEmbedding = (
  input: string | number[],
): number[] => {
  let embedding: unknown;

  try {
    embedding =
      typeof input === 'string' ? JSON.parse(input) : input;
  } catch {
    throw new Error('Invalid faceEmbedding JSON');
  }

  if (
    !Array.isArray(embedding) ||
    embedding.length === 0 ||
    !embedding.every(
      (value): value is number =>
        typeof value === 'number' &&
        Number.isFinite(value),
    )
  ) {
    throw new Error(
      'Invalid faceEmbedding: expected an array of finite numbers',
    );
  }

  return embedding;
};

// =========================================================
// 1. REGISTER OR UPDATE STUDENT FACE
// =========================================================

const RegisterStudentFace = async (req: MulterRequest) => {
  const studentId = String(req.body.studentId ?? '').trim();
  const embeddingInput = req.body.faceEmbedding;
  const file = req.file;

  console.log('RegisterStudentFace called with:',req.body)

  if (!studentId) {
    throw new Error('studentId is required');
  }

  if (!file?.buffer || file.size <= 0) {
    throw new Error('Face image file is required');
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Face image must not exceed 5 MB');
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new Error(
      'Only JPEG, PNG, and WebP images are allowed',
    );
  }

  if (embeddingInput === undefined) {
    throw new Error('faceEmbedding is required');
  }

  const parsedEmbedding = parseEmbedding(embeddingInput);

  // Verify the Student record exists.
  // Assumes studentId contains Student.id (UUID).
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { id: true },
  });

  if (!student) {
    throw new Error('Student not found');
  }

  // personId is indexed, not unique, so use findFirst.
  const existingProfile = await prisma.faceProfile.findFirst({
    where: {
      personId: studentId,
      personType: PersonType.STUDENT,
    },
    select: {
      id: true,
      faceImage: true,
    },
  });

  const uploadedImage =
    await FileUploadHelper.uploadToCloudinary(file.buffer);

  if (!uploadedImage?.secure_url) {
    throw new Error('Face image upload failed');
  }

  try {
    const faceData = {
      faceImage: uploadedImage.secure_url,
      embedding: parsedEmbedding as Prisma.InputJsonValue,
      isActive: true,
    };

    const result = existingProfile
      ? await prisma.faceProfile.update({
          where: { id: existingProfile.id },
          data: faceData,
          select: {
            id: true,
            personId: true,
            personType: true,
            faceImage: true,
            embedding: true,
            isActive: true,
          },
        })
      : await prisma.faceProfile.create({
          data: {
            ...faceData,
            personId: studentId,
            personType: PersonType.STUDENT,
          },
          select: {
            id: true,
            personId: true,
            personType: true,
            faceImage: true,
            embedding: true,
            isActive: true,
          },
        });

    return {
      ...result,
      isFaceRegistered: true,
    };
  
  } catch (error) {
    console.error('Error during face profile operation:', error);
    throw new Error('Failed to register or update student face');
  }
};

// =========================================================
// 2. GET STUDENT FACE REGISTRATION
// =========================================================

const GetStudentFace = async (studentId: string) => {
  if (!studentId?.trim()) {
    throw new Error('studentId is required');
  }

  const profile = await prisma.faceProfile.findFirst({
    where: {
      personId: studentId.trim(),
      personType: PersonType.STUDENT,
    },
    select: {
      id: true,
      personId: true,
      faceImage: true,
      embedding: true,
      isActive: true,
    },
  });

  if (!profile) {
    throw new Error('Student face profile not found');
  }

  if (!profile.faceImage || !profile.isActive) {
    throw new Error('Student face is not registered');
  }

  return {
    ...profile,
    isFaceRegistered: true,
  };
};

// =========================================================
// 3. DELETE STUDENT FACE REGISTRATION
// =========================================================

const DeleteStudentFace = async (studentId: string) => {
  if (!studentId?.trim()) {
    throw new Error('studentId is required');
  }

  const profile = await prisma.faceProfile.findFirst({
    where: {
      personId: studentId.trim(),
      personType: PersonType.STUDENT,
    },
    select: {
      id: true,
      faceImage: true,
    },
  });

  if (!profile) {
    throw new Error('Student face profile not found');
  }

  if (!profile.faceImage) {
    throw new Error('Student face is not registered');
  }

  // Clear the face registration in the database.
  // The Cloudinary image remains because its public ID
  // is not stored in the current Prisma schema.
  const result = await prisma.faceProfile.update({
    where: { id: profile.id },
    data: {
      faceImage: null,
      embedding: Prisma.DbNull,
      isActive: false,
    },
    select: {
      id: true,
      personId: true,
      personType: true,
      isActive: true,
    },
  });

  return {
    ...result,
    isFaceRegistered: false,
  };
};

export const StudentFaceRegistrationService = {
  RegisterStudentFace,
  GetStudentFace,
  DeleteStudentFace,
};
