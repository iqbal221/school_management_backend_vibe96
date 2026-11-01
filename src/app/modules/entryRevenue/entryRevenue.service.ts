import { EntryRevenue, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { EntryRevenueSearchableFields } from './entryRevenue.constant';
import { IEntryRevenueFilters } from './entryRevenue.interface';

const InsertIntoDB = async (data: any): Promise<EntryRevenue> => {
  console.log(data);
  const dateString = data.entryDate;

  const dateObject = new Date(dateString);

  // Convert the date object to ISO format
  const isoString = dateObject.toISOString();
  data.entryDate = isoString;

  const result = await prisma.entryRevenue.create({
    data,
  });
  return result;
};

const GetAllFromDB = async (
  filters: IEntryRevenueFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<EntryRevenue[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: EntryRevenueSearchableFields.map(field => ({
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

  const whereCondition: Prisma.EntryRevenueWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.entryRevenue.findMany({
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
  const total = await prisma.entryRevenue.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (id: string): Promise<EntryRevenue | null> => {
  const result = await prisma.entryRevenue.findUnique({
    where: {
      id,
    },
  });
  return result;
};


const UpdateIntoDB = async (
  id: string,
  payload: Partial<EntryRevenue>
): Promise<EntryRevenue> => {
  const result = await prisma.entryRevenue.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.entryRevenue.delete({
    where: {
      id,
    },
  });
  return result;
};

export const EntryRevenueService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
