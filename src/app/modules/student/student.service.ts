import { Prisma, Student, StudentResult } from '@prisma/client';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { StudentSearchableFields } from './student.constant';


type MulterRequest = {
  file?: Express.Multer.File;
  files: any;
  params: any;
} & Request;



const InsertIntoDB = async (
  req: MulterRequest
): Promise<Student> => {
  try {
    // 1. Get uploaded files
    const files = Array.isArray(req.files)
      ? req.files
      : req.file
        ? [req.file]
        : [];

    console.log('========== CREATE STUDENT ==========');
    console.log('Body:', req.body);
    console.log(
      'Files:',
      files.map(file => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        hasBuffer: Boolean(file.buffer),
        path: file.path,
      })),
    );

    // 2. Upload images to Cloudinary
    const imageUrlList: string[] = [];

    for (const file of files) {
      if (!file) continue;

      // Validate that a usable image is available
      if (!file.buffer && !file.path) {
        throw new Error(
          `No image buffer or file path found for ${file.originalname}`,
        );
      }

      // Memory storage provides buffer; disk storage may provide path.
      const uploadSource = file.buffer || file.path;

      const uploadedImage =
        await FileUploadHelper.uploadToCloudinary(uploadSource);

      if (!uploadedImage?.secure_url) {
        throw new Error(
          `Cloudinary did not return an image URL for ${file.originalname}`,
        );
      }

      imageUrlList.push(uploadedImage.secure_url);

      console.log('Cloudinary upload successful:', {
        originalname: file.originalname,
        secure_url: uploadedImage.secure_url,
      });
    }

    // 3. Copy request body
    const data: any = {
      ...req.body,
    };

    // 4. Validate date of birth
    if (data.dateOfBirth) {
      const dateObject = new Date(data.dateOfBirth);

      if (Number.isNaN(dateObject.getTime())) {
        throw new Error('Invalid dateOfBirth');
      }

      data.dateOfBirth = dateObject;
    } else {
      data.dateOfBirth = null;
    }

    // 5. Add Cloudinary URLs
    data.image = imageUrlList;

    console.log('Data before Prisma create:', data);

    // 6. Create student record
    const result = await prisma.student.create({
      data,
    });

    console.log('Student created successfully:', result.id);

    return result;
  } catch (error) {
    console.error('========== CREATE STUDENT ERROR ==========');
    console.error(error);
    throw error;
  }
};


const UploadResult = async (data: StudentResult): Promise<StudentResult> => {
  const result = await prisma.studentResult.create({
    data,
  });
  return result;
};

const GetAllFromDB = async (
  filters: any,
  options: IPaginationOptions
): Promise<IGenericResponse<Student[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: StudentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.StudentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.student.findMany({
    where: whereCondition,
    take: limit,
    skip,

    orderBy:
      sortBy && sortOrder
        ? {
          [sortBy]: sortOrder,
        }
        : {
          createdAt: 'desc',
        },
  });
  const total = await prisma.student.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetStudentResult = async (): Promise<StudentResult[] | null> => {
  const result = await prisma.studentResult.findMany();
  return result;
};

const GetDataById = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdateIntoDB = async (req: MulterRequest): Promise<Student> => {
  const { id } = req.params;

  const data: any = req.body;

  console.log('Update data:', data);
  console.log('Uploaded file:', req.files);

  // 1. Get uploaded files
  const files = Array.isArray(req.files)
    ? req.files
    : req.file
      ? [req.file]
      : [];

  console.log('========== CREATE STUDENT ==========');
  console.log('Body:', req.body);
  console.log(
    'Files:',
    files.map(file => ({
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      hasBuffer: Boolean(file.buffer),
      path: file.path,
    })),
  );

  // 2. Upload images to Cloudinary
  const imageUrlList: string[] = [];

  for (const file of files) {
    if (!file) continue;

    // Validate that a usable image is available
    if (!file.buffer && !file.path) {
      throw new Error(
        `No image buffer or file path found for ${file.originalname}`,
      );
    }

    // Memory storage provides buffer; disk storage may provide path.
    const uploadSource = file.buffer || file.path;

    const uploadedImage =
      await FileUploadHelper.uploadToCloudinary(uploadSource);

    if (!uploadedImage?.secure_url) {
      throw new Error(
        `Cloudinary did not return an image URL for ${file.originalname}`,
      );
    }

    imageUrlList.push(uploadedImage.secure_url);

    console.log('Cloudinary upload successful:', {
      originalname: file.originalname,
      secure_url: uploadedImage.secure_url,
    });
  }

  if (data.dateOfBirth) {
    const dateObject = new Date(data.dateOfBirth);

    if (!isNaN(dateObject.getTime())) {
      data.dateOfBirth = dateObject;
    }
  }

  // 5. Add Cloudinary URLs
  data.image = imageUrlList;


  delete data.file;

  return await prisma.student.update({
    where: {
      id,
    },
    data,
  });
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.student.delete({
    where: {
      id,
    },
  });
  return result;
};

export const StudentService = {
  InsertIntoDB,
  UploadResult,
  GetAllFromDB,
  GetStudentResult,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
