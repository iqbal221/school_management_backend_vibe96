import { PrismaClient, SchoolHeader } from '@prisma/client';

import httpStatus from 'http-status';

import ApiError from '../../../../../errors/ApiError';

import { FileUploadHelper } from '../../../../../helpers/FileUploadHelper';

const prisma = new PrismaClient();

type MulterRequest = Request & {
  file?: Express.Multer.File;
  files: any;
  params: {
    id?: string;
  };
};

// =========================================================
// CREATE SCHOOL HEADER
// =========================================================

const createSchoolHeader = async (
  req: MulterRequest
): Promise<SchoolHeader> => {
  const { schoolName, slogan, isActive }: any = req.body;

  console.log('Create school header data:', req.body);

  console.log('Uploaded file:', req.file);

  // =========================================
  // VALIDATE
  // =========================================

  if (!schoolName?.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'School name is required');
  }

  // =========================================
  // LOGO
  // =========================================

  let logo: string[] = [];

  if (req.file) {
    console.log('Uploading logo:', req.file.originalname);

    const uploadedImage = await FileUploadHelper.uploadToCloudinary(
      req.file.buffer
    );

    console.log('Cloudinary response:', uploadedImage);

    if (uploadedImage?.secure_url) {
      logo = [uploadedImage.secure_url];
    }
  }

  // =========================================
  // DATABASE
  // =========================================

  const result = await prisma.schoolHeader.create({
    data: {
      schoolName: schoolName.trim(),

      slogan: slogan?.trim() || null,

      isActive: isActive !== undefined ? Boolean(isActive) : true,

      logo,
    },
  });

  return result;
};

const getSchoolHeaders = async () => {
  const result = await prisma.schoolHeader.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

const getSchoolHeaderById = async (id: string) => {
  const result = await prisma.schoolHeader.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School header not found');
  }

  return result;
};

const getActiveSchoolHeader = async () => {
  const result = await prisma.schoolHeader.findFirst({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return result;
};

const updateSchoolHeader = async (
  req: MulterRequest
): Promise<SchoolHeader> => {
  const { id } = req.params;

  const data: any = req.body;

  console.log('Update data:', data, req.file, id);

  // Only update image when a new image is selected
  if (req.file) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(
      req.file.buffer
    );

    if (uploadedImage?.secure_url) {
      data.logo = [uploadedImage.secure_url];
    }
  }

  return await prisma.schoolHeader.update({
    where: {
      id,
    },
    data,
  });
};

const deleteSchoolHeader = async (id: string) => {
  const existing = await prisma.schoolHeader.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School header not found');
  }

  const result = await prisma.schoolHeader.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SchoolHeaderService = {
  createSchoolHeader,
  getSchoolHeaders,
  getSchoolHeaderById,
  getActiveSchoolHeader,
  updateSchoolHeader,
  deleteSchoolHeader,
};
