import { Official, Prisma } from '@prisma/client';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { OfficialSearchableFields } from './official.constant';
import { IOfficialFilters } from './official.interface';

type MulterRequest = {
  files: any; // Adjust the type of 'files' according to your implementation
  params: any;
} & Request;

const InsertIntoDB = async (req: MulterRequest): Promise<Official | undefined> => {
  const files = req.files;
  const imageUrlList: string[] = [];

  // 2. Upload images to Cloudinary


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

    const data: any = req.body;
    console.log('hello', data);
    data.image = imageUrlList;

    // Insert data into the database
    const result = await prisma.official.create({
      data,
    });
    return result;
  };
}


const GetAllFromDB = async (
  filters: IOfficialFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Official[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: OfficialSearchableFields.map(field => ({
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

  const whereCondition: Prisma.OfficialWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.official.findMany({
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
  const total = await prisma.official.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (id: string): Promise<Official | null> => {
  const result = await prisma.official.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdateIntoDB = async (req: MulterRequest): Promise<Official> => {
  const { id } = req.params;
  const data: any = req.body;

  if (data.dateOfBirth) {
    const dateString = data?.dateOfBirth;
    const dateObject = new Date(dateString);
    // Convert the date object to ISO format
    const isoString = dateObject.toISOString();
    data.dateOfBirth = isoString;
  }

  const result = await prisma.official.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.official.delete({
    where: {
      id,
    },
  });
  return result;
};

export const OfficialService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
