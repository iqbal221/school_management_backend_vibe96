import { AttendanceMethod, AttendanceStatus, Prisma } from "@prisma/client";

import { prisma } from "../../../../shared/prisma";
import {
  ICreateTeacherAttendance,
  IUpdateTeacherAttendance,
} from "./teacherAttendance.interface";

// =========================================================
// CREATE TEACHER ATTENDANCE
// =========================================================

const createTeacherAttendance = async (
  payload: ICreateTeacherAttendance
) => {
  const {
    teacherId,
    attendanceDate,
    checkInTime,
    checkOutTime,
    status,
    method,
    confidence,
    deviceId,
    verificationId,
  } = payload;

  // -------------------------------------------------------
  // Check teacher exists
  // -------------------------------------------------------

  const teacher = await prisma.teacher.findUnique({
    where: {
      id: teacherId,
    },
  });

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  // -------------------------------------------------------
  // Attendance date
  // -------------------------------------------------------

  const date = attendanceDate
    ? new Date(attendanceDate)
    : new Date();

  // -------------------------------------------------------
  // Check duplicate attendance
  // -------------------------------------------------------

  const existingAttendance =
    await prisma.teacherAttendance.findUnique({
      where: {
        teacherId_attendanceDate: {
          teacherId,
          attendanceDate: date,
        },
      },
    });

  if (existingAttendance) {
    throw new Error(
      "Teacher attendance already exists for this date"
    );
  }

  // -------------------------------------------------------
  // Create attendance
  // -------------------------------------------------------

  const result = await prisma.teacherAttendance.create({
    data: {
      teacherId,
      attendanceDate: date,
      checkInTime,
      checkOutTime,
      status: status ?? AttendanceStatus.PRESENT,
      method,
      confidence,
      deviceId,
      verificationId,
    },
    include: {
      teacher: true,
    },
  });

  return result;
};

// =========================================================
// GET ALL TEACHER ATTENDANCE
// =========================================================

const getAllTeacherAttendance = async (params: {
  teacherId?: string;
  status?: AttendanceStatus;
  method?: AttendanceMethod;
  startDate?: Date;
  endDate?: Date;
}) => {
  const {
    teacherId,
    status,
    method,
    startDate,
    endDate,
  } = params;

  const where: Prisma.TeacherAttendanceWhereInput = {};

  if (teacherId) {
    where.teacherId = teacherId;
  }

  if (status) {
    where.status = status;
  }

  if (method) {
    where.method = method;
  }

  if (startDate || endDate) {
    where.attendanceDate = {};

    if (startDate) {
      where.attendanceDate.gte = startDate;
    }

    if (endDate) {
      where.attendanceDate.lte = endDate;
    }
  }

  const result = await prisma.teacherAttendance.findMany({
    where,
    include: {
      teacher: true,
    },
    orderBy: {
      attendanceDate: "desc",
    },
  });

  return result;
};

// =========================================================
// GET SINGLE TEACHER ATTENDANCE
// =========================================================

const getTeacherAttendanceById = async (id: string) => {
  const result = await prisma.teacherAttendance.findUnique({
    where: {
      id,
    },
    include: {
      teacher: true,
    },
  });

  if (!result) {
    throw new Error("Teacher attendance not found");
  }

  return result;
};

// =========================================================
// GET TEACHER ATTENDANCE HISTORY
// =========================================================

const getTeacherAttendanceHistory = async (
  teacherId: string,
  startDate?: Date,
  endDate?: Date
) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      id: teacherId,
    },
  });

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  const where: Prisma.TeacherAttendanceWhereInput = {
    teacherId,
  };

  if (startDate || endDate) {
    where.attendanceDate = {};

    if (startDate) {
      where.attendanceDate.gte = startDate;
    }

    if (endDate) {
      where.attendanceDate.lte = endDate;
    }
  }

  const result = await prisma.teacherAttendance.findMany({
    where,
    orderBy: {
      attendanceDate: "desc",
    },
  });

  return result;
};

// =========================================================
// UPDATE TEACHER ATTENDANCE
// =========================================================

const updateTeacherAttendance = async (
  id: string,
  payload: IUpdateTeacherAttendance
) => {
  const existingAttendance =
    await prisma.teacherAttendance.findUnique({
      where: {
        id,
      },
    });

  if (!existingAttendance) {
    throw new Error("Teacher attendance not found");
  }

  const result = await prisma.teacherAttendance.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
    include: {
      teacher: true,
    },
  });

  return result;
};

// =========================================================
// DELETE TEACHER ATTENDANCE
// =========================================================

const deleteTeacherAttendance = async (id: string) => {
  const existingAttendance =
    await prisma.teacherAttendance.findUnique({
      where: {
        id,
      },
    });

  if (!existingAttendance) {
    throw new Error("Teacher attendance not found");
  }

  const result = await prisma.teacherAttendance.delete({
    where: {
      id,
    },
  });

  return result;
};

// =========================================================
// TEACHER CHECK-IN
// =========================================================

const teacherCheckIn = async (payload: {
  teacherId: string;
  method: AttendanceMethod;
  confidence?: number;
  deviceId?: string;
  verificationId?: string;
}) => {
  const {
    teacherId,
    method,
    confidence,
    deviceId,
    verificationId,
  } = payload;

  const now = new Date();

  // Start of today
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  // End of today
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const existingAttendance =
    await prisma.teacherAttendance.findFirst({
      where: {
        teacherId,
        attendanceDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

  if (existingAttendance) {
    throw new Error(
      "Teacher has already checked in today"
    );
  }

  const result = await prisma.teacherAttendance.create({
    data: {
      teacherId,
      attendanceDate: startOfDay,
      checkInTime: now,
      status: AttendanceStatus.PRESENT,
      method,
      confidence,
      deviceId,
      verificationId,
    },
    include: {
      teacher: true,
    },
  });

  return result;
};

// =========================================================
// TEACHER CHECK-OUT
// =========================================================

const teacherCheckOut = async (teacherId: string) => {
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const attendance =
    await prisma.teacherAttendance.findFirst({
      where: {
        teacherId,
        attendanceDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

  if (!attendance) {
    throw new Error(
      "Teacher attendance not found for today"
    );
  }

  if (attendance.checkOutTime) {
    throw new Error(
      "Teacher has already checked out today"
    );
  }

  const result = await prisma.teacherAttendance.update({
    where: {
      id: attendance.id,
    },
    data: {
      checkOutTime: now,
    },
    include: {
      teacher: true,
    },
  });

  return result;
};

export const TeacherAttendanceService = {
  createTeacherAttendance,
  getAllTeacherAttendance,
  getTeacherAttendanceById,
  getTeacherAttendanceHistory,
  updateTeacherAttendance,
  deleteTeacherAttendance,
  teacherCheckIn,
  teacherCheckOut,
};