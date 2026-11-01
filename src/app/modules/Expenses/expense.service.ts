import { EntryExpense, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { EntryExpenseSearchableFields } from './expense.constant';
import { IEntryExpenseFilters } from './expense.interface';

const InsertIntoDB = async (data: any): Promise<EntryExpense> => {

  console.log("expense",data)
  const dateString = data.entryDate;

  const dateObject = new Date(dateString);

  // Convert the date object to ISO format
  const isoString = dateObject.toISOString();
  data.entryDate = isoString;

  const result = await prisma.entryExpense.create({
    data,
  });
  return result;
};

const GetAllFromDB = async (
  filters: IEntryExpenseFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<EntryExpense[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  console.log('hello', filters);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: EntryExpenseSearchableFields.map(field => ({
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

  const whereCondition: Prisma.EntryExpenseWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.entryExpense.findMany({
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
  const total = await prisma.entryExpense.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetDataById = async (id: string): Promise<EntryExpense | null> => {
  const result = await prisma.entryExpense.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const UpdateIntoDB = async (
  id: string,
  payload: Partial<EntryExpense>
): Promise<EntryExpense> => {
  const result = await prisma.entryExpense.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const DeleteFromDB = async (id: string) => {
  const result = await prisma.entryExpense.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ExpenseService = {
  InsertIntoDB,
  GetAllFromDB,
  GetDataById,
  UpdateIntoDB,
  DeleteFromDB,
};
