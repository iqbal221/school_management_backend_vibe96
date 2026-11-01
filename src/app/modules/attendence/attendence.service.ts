import {
  OfficialAttendance,
  Prisma,
  StudentAttendance,
  TeacherAttendance,
} from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { AttendanceSearchableFields } from './attendence.constant';
import { IAttendanceFilters } from './attendence.interface';

type BatchPayload = {
  id: string;
  studentId: string;
  status: string;
  attendance: string;
  attendanceDate: string;
  createdAt: Date;
  updatedAt: Date;
};

const InsertStudentAttedanceIntoDB = async (
  attendanceInfo: BatchPayload
): Promise<any> => {
  let { attendanceDate } = attendanceInfo;
  const { attendance } = attendanceInfo;

  const dateString = attendanceDate;

  const dateObject = new Date(dateString);

  // // Convert the date object to ISO format
  const isoString = dateObject.toISOString();

  attendanceDate = isoString;

  const attendanceRecords: any = Object.keys(attendance).map(
    (studentId: any) => ({
      attendanceDate,
      status: attendance[studentId],
      studentId,
    })
  );

  const result = await prisma.studentAttendance.createMany({
    data: attendanceRecords,
  });
  return result;
};

const InsertTeacherAttendanceIntoDB = async (
  attendanceInfo: any
): Promise<any> => {
  let { attendanceDate } = attendanceInfo;
  const { attendance } = attendanceInfo;

  const dateString = attendanceDate;

  const dateObject = new Date(dateString);

  // // Convert the date object to ISO format
  const isoString = dateObject.toISOString();

  attendanceDate = isoString;

  const attendanceRecords: any = Object.keys(attendance).map(teacherId => ({
    attendanceDate,
    status: attendance[teacherId],
    teacherId,
  }));

  const result = await prisma.teacherAttendance.createMany({
    data: attendanceRecords,
  });
  return result;
};

const InsertOfficialAttendanceIntoDB = async (
  attendanceInfo: any
): Promise<any> => {
  let { attendanceDate } = attendanceInfo;
  const { attendance } = attendanceInfo;

  const dateString = attendanceDate;

  const dateObject = new Date(dateString);

  // // Convert the date object to ISO format
  const isoString = dateObject.toISOString();

  attendanceDate = isoString;

  const attendanceRecords: any = Object.keys(attendance).map(officialId => ({
    attendanceDate,
    status: attendance[officialId],
    officialId,
  }));

  const result = await prisma.officialAttendance.createMany({
    data: attendanceRecords,
  });
  return result;
};

const GetStudentAttedanceFromDB = async (
  filters: IAttendanceFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<StudentAttendance[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AttendanceSearchableFields.map(field => ({
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

  const whereCondition: Prisma.StudentAttendanceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.studentAttendance.findMany({
    include: {
      student: true,
    },
    where: whereCondition,
    take: limit,
    skip,

    orderBy:
      sortBy && sortOrder
        ? {
            attendanceDate: 'asc',
          }
        : {
            [sortBy]: sortOrder,
          },
  });
  const total = await prisma.studentAttendance.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetTeacherAttedanceFromDB = async (
  filters: IAttendanceFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<TeacherAttendance[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AttendanceSearchableFields.map(field => ({
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

  const whereCondition: Prisma.TeacherAttendanceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.teacherAttendance.findMany({
    include: {
      teacher: true,
    },
    where: whereCondition,
    take: limit,
    skip,

    orderBy:
      sortBy && sortOrder
        ? {
            attendanceDate: 'asc',
          }
        : {
            [sortBy]: sortOrder,
          },
  });
  const total = await prisma.teacherAttendance.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetOfficialAttedanceFromDB = async (
  filters: IAttendanceFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<OfficialAttendance[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AttendanceSearchableFields.map(field => ({
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

  const whereCondition: Prisma.OfficialAttendanceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.officialAttendance.findMany({
    include: {
      official: true,
    },
    where: whereCondition,
    take: limit,
    skip,

    orderBy:
      sortBy && sortOrder
        ? {
            attendanceDate: 'asc',
          }
        : {
            [sortBy]: sortOrder,
          },
  });
  const total = await prisma.officialAttendance.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const AttendanceService = {
  InsertStudentAttedanceIntoDB,
  InsertTeacherAttendanceIntoDB,
  InsertOfficialAttendanceIntoDB,
  GetStudentAttedanceFromDB,
  GetTeacherAttedanceFromDB,
  GetOfficialAttedanceFromDB,
};
