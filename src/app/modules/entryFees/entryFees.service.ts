import { Authorization, EntryFees, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { EntryFeesSearchableFields } from './entryFees.constant';
import { IEntryFeesFilters } from './entryFees.interface';

const InsertIntoDB = async (data: any): Promise<EntryFees> => {
  const dateString = data.entryDate;

  const dateObject = new Date(dateString);

  // Convert the date object to ISO format
  const isoString = dateObject.toISOString();
  data.entryDate = isoString;

  const result = await prisma.entryFees.create({
    data,
  });
  return result;
};

const GetAllFromDB = async (
  filters: IEntryFeesFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<EntryFees[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: EntryFeesSearchableFields.map(field => ({
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

  const whereCondition: Prisma.EntryFeesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.entryFees.findMany({
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
  const total = await prisma.entryFees.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (id: string): Promise<EntryFees | null> => {
  const result = await prisma.entryFees.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdateIntoDB = async (
  id: string,
  payload: Partial<EntryFees>
): Promise<EntryFees> => {
  const result = await prisma.entryFees.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.entryFees.delete({
    where: {
      id,
    },
  });
  return result;
};

// .................Authorization..............
const InsertAuthorizationIntoDB = async (data: any): Promise<Authorization> => {
  console.log('auth', data);
  const result = await prisma.authorization.create({
    data,
  });
  return result;
};

const GetAuthorizationFromDB = async (): Promise<Authorization[]> => {
  const result = await prisma.authorization.findMany();
  return result;
};

const UpdateAuthorizationIntoDB = async (
  id: string,
  payload: Partial<Authorization>
): Promise<Authorization> => {
  const result = await prisma.authorization.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const EntryFeesService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
  InsertAuthorizationIntoDB,
  GetAuthorizationFromDB,
  UpdateAuthorizationIntoDB,
};
