import { Prisma, Teacher } from '@prisma/client';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { TeacherSearchableFields } from './teacher.constant';
import { ITeacherFilters } from './teacher.interface';

type MulterRequest = {
  files: any; // Adjust the type of 'files' according to your implementation
  params: any;
} & Request;

const InsertIntoDB = async (req: MulterRequest): Promise<Teacher> => {
  const files = req.files;
  const imageUrlList: string[] = [];

  for (const file of files) {
    console.log(file)
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file.buffer);
    console.log(uploadedImage)
    if (uploadedImage) {
      imageUrlList.push(uploadedImage.secure_url);
    }
  }

  const data:any = req.body;
  data.image = imageUrlList;

  // Insert data into the database
  const result = await prisma.teacher.create({
    data,
  });
  return result;
};

const GetAllFromDB = async (
  filters: ITeacherFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Teacher[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: TeacherSearchableFields.map(field => ({
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

  const whereCondition: Prisma.TeacherWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.teacher.findMany({
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
  const total = await prisma.teacher.count();
  console.log(result)

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (id: string): Promise<Teacher | null> => {
  const result = await prisma.teacher.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdateIntoDB = async (req: MulterRequest): Promise<Teacher> => {
  const { id } = req.params;
  const data: any = req.body;

  if (data.dateOfBirth) {
    const dateString = data?.dateOfBirth;
    const dateObject = new Date(dateString);
    // Convert the date object to ISO format
    const isoString = dateObject.toISOString();
    data.dateOfBirth = isoString;
  }

  const result = await prisma.teacher.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.teacher.delete({
    where: {
      id,
    },
  });
  return result;
};

export const TeacherService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
