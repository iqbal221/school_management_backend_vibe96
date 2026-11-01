import { AttendanceMethod, AttendanceStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ICreateStudentAttendance {
  studentId: string;
  classId?: string;
  sectionId?: string;
  admissionId:string;
  attendanceDate?: string | Date;

  status: AttendanceStatus;

  method: AttendanceMethod;

  checkInTime?: string | Date;
  checkOutTime?: string | Date;

  deviceId?: string;

  confidence?: number;

  remarks?: string;

  markedById?: string;
}

interface IUpdateStudentAttendance {
  status?: AttendanceStatus;

  checkInTime?: string | Date;
  checkOutTime?: string | Date;

  remarks?: string;
}

const createStudentAttendance = async (
  payload: ICreateStudentAttendance
) => {
  // 1. Parse payload if needed
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      throw new Error("Invalid attendance JSON payload");
    }
  }

  console.log("attendance body:", payload);

  const {
    studentId,
    admissionId: payloadAdmissionId,
    attendanceDate,
    classId,
    sectionId,
    markedById,
    remarks,
    status,
    method,
    confidence,
    deviceId,
    checkInTime,
    checkOutTime,
  } = payload;

  // 2. Validate required fields
  if (!studentId) {
    throw new Error("Student ID is required");
  }

  if (!status) {
    throw new Error("Attendance status is required");
  }

  if (!method) {
    throw new Error("Attendance method is required");
  }

  // 3. Check student
  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const studentadmissionId = student.admission;

  // 4. Resolve admission ID
  const admissionId = payloadAdmissionId || studentadmissionId;

  if (!admissionId) {
    throw new Error("Admission ID is required");
  }

  // 5. Validate date
  const date = attendanceDate
    ? new Date(attendanceDate)
    : new Date();

  if (isNaN(date.getTime())) {
    throw new Error("Invalid attendance date");
  }

  // Normalize to start of day using server-local timezone.
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // 6. Check existing attendance
  const existingAttendance =
    await prisma.studentAttendance.findFirst({
      where: {
        studentId,
        attendanceDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

  console.log("existingAttendance:", existingAttendance);

  if (existingAttendance) {
    throw new Error(
      "Student attendance has already been recorded for this date"
    );
  }

  // 7. Create attendance
  const attendance = await prisma.studentAttendance.create({
    data: {
      studentId,
      admissionId,
      ...(classId && { classId }),
      ...(sectionId && { sectionId }),

      attendanceDate: date,
      status,
      method,

      ...(checkInTime && {
        checkInTime: new Date(checkInTime),
      }),

      ...(checkOutTime && {
        checkOutTime: new Date(checkOutTime),
      }),

      ...(deviceId && { deviceId }),

      ...(confidence !== undefined && {
        confidence,
      }),

      ...(remarks && { remarks }),

      ...(markedById && { markedById }),
    },
    include: {
      student: true,
    },
  });

  return attendance;
};

// =======================================================
// GET ALL STUDENT ATTENDANCE
// =======================================================

const getAllStudentAttendance = async (query: any) => {
  const {
    studentId,
    classId,
    sectionId,
    status,
    method,
    date,
    page = 1,
    limit = 20,
  } = query;

  const skip =
    (Number(page) - 1) * Number(limit);

  const where: any = {};

  if (studentId) {
    where.studentId = studentId;
  }

  if (classId) {
    where.classId = classId;
  }

  if (sectionId) {
    where.sectionId = sectionId;
  }

  if (status) {
    where.status = status;
  }

  if (method) {
    where.method = method;
  }

  // =====================================================
  // DATE FILTER
  // =====================================================

  if (date) {
    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getTime())) {
      throw new Error('Invalid date');
    }

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    where.attendanceDate = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  const [data, total] =
    await Promise.all([
      prisma.studentAttendance.findMany({
        where,

        skip,

        take: Number(limit),

        orderBy: {
          attendanceDate: 'desc',
        },

        include: {
          student: true,
        },
      }),

      prisma.studentAttendance.count({
        where,
      }),
    ]);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPage: Math.ceil(
        total / Number(limit)
      ),
    },

    data,
  };
};


// =======================================================
// GET SINGLE ATTENDANCE
// =======================================================

const getStudentAttendanceById = async (
  id: string
) => {
  const attendance =
    await prisma.studentAttendance.findUnique({
      where: {
        id,
      },

      include: {
        student: true,
      },
    });

  if (!attendance) {
    throw new Error(
      'Student attendance not found'
    );
  }

  return attendance;
};


// =======================================================
// GET STUDENT ATTENDANCE HISTORY
// =======================================================

const getStudentAttendanceHistory = async (
  studentId: string,
  query: any
) => {
  const {
    startDate,
    endDate,
  } = query;

  const where: any = {
    studentId,
  };

  if (startDate || endDate) {
    where.attendanceDate = {};

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      where.attendanceDate.gte = start;
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      where.attendanceDate.lte = end;
    }
  }

  const data =
    await prisma.studentAttendance.findMany({
      where,

      orderBy: {
        attendanceDate: 'desc',
      },
    });

  return data;
};


// =======================================================
// UPDATE ATTENDANCE
// =======================================================

const updateStudentAttendance = async (
  id: string,
  payload: IUpdateStudentAttendance
) => {
  const existing =
    await prisma.studentAttendance.findUnique({
      where: {
        id,
      },
    });

  if (!existing) {
    throw new Error(
      'Student attendance not found'
    );
  }

  const data: any = {};

  if (payload.status !== undefined) {
    data.status = payload.status;
  }

  if (payload.checkInTime !== undefined) {
    data.checkInTime =
      new Date(payload.checkInTime);
  }

  if (payload.checkOutTime !== undefined) {
    data.checkOutTime =
      new Date(payload.checkOutTime);
  }

  if (payload.remarks !== undefined) {
    data.remarks = payload.remarks;
  }

  const result =
    await prisma.studentAttendance.update({
      where: {
        id,
      },

      data,

      include: {
        student: true,
      },
    });

  return result;
};


// =======================================================
// DELETE ATTENDANCE
// =======================================================

const deleteStudentAttendance = async (
  id: string
) => {
  const existing =
    await prisma.studentAttendance.findUnique({
      where: {
        id,
      },
    });

  if (!existing) {
    throw new Error(
      'Student attendance not found'
    );
  }

  await prisma.studentAttendance.delete({
    where: {
      id,
    },
  });

  return {
    message:
      'Student attendance deleted successfully',
  };
};


export const StudentAttendanceService = {
  createStudentAttendance,
  getAllStudentAttendance,
  getStudentAttendanceById,
  getStudentAttendanceHistory,
  updateStudentAttendance,
  deleteStudentAttendance,
};