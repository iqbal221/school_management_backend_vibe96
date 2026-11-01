import {
  AttendanceMethod,
  AttendanceStatus,
  Prisma,
} from "@prisma/client";



import { prisma } from "../../../../shared/prisma";
import {
  ICreateOfficialAttendance,
  IUpdateOfficialAttendance,
} from "./officialAttendance.interface";

// =========================================================
// CREATE OFFICIAL ATTENDANCE
// =========================================================

const createOfficialAttendance = async (
  payload: ICreateOfficialAttendance
) => {
  const {
    officialId,
    attendanceDate,
    checkInTime,
    checkOutTime,
    status,
    method,
    confidence,
    deviceId,
    verificationId,
  } = payload;

  console.log("oficial",payload)

  // Validate official ID
  if (!officialId || typeof officialId !== "string" || !officialId.trim()) {
    throw new Error("Official ID is required");
  }

  const official = await prisma.official.findUnique({
    where: {
      id: officialId.trim(),
    },
  });

  if (!official) {
    throw new Error("Official not found");
  }

  const date = attendanceDate
    ? new Date(attendanceDate)
    : new Date();

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid attendance date");
  }

  const existingAttendance =
    await prisma.officialAttendance.findUnique({
      where: {
        officialId_attendanceDate: {
          officialId: officialId.trim(),
          attendanceDate: date,
        },
      },
    });

  if (existingAttendance) {
    throw new Error(
      "Official attendance already exists for this date"
    );
  }

  return prisma.officialAttendance.create({
    data: {
      officialId: officialId.trim(),
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
      official: true,
    },
  });
};
// =========================================================
// GET ALL OFFICIAL ATTENDANCE
// =========================================================

const getAllOfficialAttendance = async (params: {
  officialId?: string;
  status?: AttendanceStatus;
  method?: AttendanceMethod;
  startDate?: Date;
  endDate?: Date;
}) => {
  const {
    officialId,
    status,
    method,
    startDate,
    endDate,
  } = params;

  const where: Prisma.OfficialAttendanceWhereInput = {};

  if (officialId) {
    where.officialId = officialId;
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

  const result =
    await prisma.officialAttendance.findMany({
      where,

      include: {
        official: true,
      },

      orderBy: {
        attendanceDate: "desc",
      },
    });

  return result;
};

// =========================================================
// GET SINGLE OFFICIAL ATTENDANCE
// =========================================================

const getOfficialAttendanceById = async (
  id: string
) => {
  const result =
    await prisma.officialAttendance.findUnique({
      where: {
        id,
      },

      include: {
        official: true,
      },
    });

  if (!result) {
    throw new Error(
      "Official attendance not found"
    );
  }

  return result;
};

// =========================================================
// GET OFFICIAL ATTENDANCE HISTORY
// =========================================================

const getOfficialAttendanceHistory = async (
  officialId: string,
  startDate?: Date,
  endDate?: Date
) => {
  // -------------------------------------------------------
  // Check official
  // -------------------------------------------------------

  const official = await prisma.official.findUnique({
    where: {
      id: officialId,
    },
  });

  if (!official) {
    throw new Error("Official not found");
  }

  // -------------------------------------------------------
  // Build where condition
  // -------------------------------------------------------

  const where: Prisma.OfficialAttendanceWhereInput = {
    officialId,
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

  // -------------------------------------------------------
  // Get history
  // -------------------------------------------------------

  const result =
    await prisma.officialAttendance.findMany({
      where,

      orderBy: {
        attendanceDate: "desc",
      },
    });

  return result;
};

// =========================================================
// UPDATE OFFICIAL ATTENDANCE
// =========================================================

const updateOfficialAttendance = async (
  id: string,
  payload: IUpdateOfficialAttendance
) => {
  // -------------------------------------------------------
  // Check attendance
  // -------------------------------------------------------

  const existingAttendance =
    await prisma.officialAttendance.findUnique({
      where: {
        id,
      },
    });

  if (!existingAttendance) {
    throw new Error(
      "Official attendance not found"
    );
  }

  // -------------------------------------------------------
  // Update
  // -------------------------------------------------------

  const result =
    await prisma.officialAttendance.update({
      where: {
        id,
      },

      data: {
        ...payload,
      },

      include: {
        official: true,
      },
    });

  return result;
};

// =========================================================
// DELETE OFFICIAL ATTENDANCE
// =========================================================

const deleteOfficialAttendance = async (
  id: string
) => {
  const existingAttendance =
    await prisma.officialAttendance.findUnique({
      where: {
        id,
      },
    });

  if (!existingAttendance) {
    throw new Error(
      "Official attendance not found"
    );
  }

  const result =
    await prisma.officialAttendance.delete({
      where: {
        id,
      },
    });

  return result;
};

// =========================================================
// OFFICIAL CHECK-IN
// =========================================================

const officialCheckIn = async (payload: {
  officialId: string;

  method: AttendanceMethod;

  confidence?: number;

  deviceId?: string;

  verificationId?: string;
}) => {
  const {
    officialId,
    method,
    confidence,
    deviceId,
    verificationId,
  } = payload;

  const now = new Date();

  // -------------------------------------------------------
  // Start of today
  // -------------------------------------------------------

  const startOfDay = new Date(now);

  startOfDay.setHours(
    0,
    0,
    0,
    0
  );

  // -------------------------------------------------------
  // End of today
  // -------------------------------------------------------

  const endOfDay = new Date(now);

  endOfDay.setHours(
    23,
    59,
    59,
    999
  );

  // -------------------------------------------------------
  // Check duplicate
  // -------------------------------------------------------

  const existingAttendance =
    await prisma.officialAttendance.findFirst({
      where: {
        officialId,

        attendanceDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

  if (existingAttendance) {
    throw new Error(
      "Official has already checked in today"
    );
  }

  // -------------------------------------------------------
  // Create
  // -------------------------------------------------------

  const result =
    await prisma.officialAttendance.create({
      data: {
        officialId,

        attendanceDate: startOfDay,

        checkInTime: now,

        status: AttendanceStatus.PRESENT,

        method,

        confidence,

        deviceId,

        verificationId,
      },

      include: {
        official: true,
      },
    });

  return result;
};

// =========================================================
// OFFICIAL CHECK-OUT
// =========================================================

const officialCheckOut = async (
  officialId: string
) => {
  const now = new Date();

  // -------------------------------------------------------
  // Start of today
  // -------------------------------------------------------

  const startOfDay = new Date(now);

  startOfDay.setHours(
    0,
    0,
    0,
    0
  );

  // -------------------------------------------------------
  // End of today
  // -------------------------------------------------------

  const endOfDay = new Date(now);

  endOfDay.setHours(
    23,
    59,
    59,
    999
  );

  // -------------------------------------------------------
  // Find today's attendance
  // -------------------------------------------------------

  const attendance =
    await prisma.officialAttendance.findFirst({
      where: {
        officialId,

        attendanceDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

  if (!attendance) {
    throw new Error(
      "Official attendance not found for today"
    );
  }

  // -------------------------------------------------------
  // Already checked out
  // -------------------------------------------------------

  if (attendance.checkOutTime) {
    throw new Error(
      "Official has already checked out today"
    );
  }

  // -------------------------------------------------------
  // Update checkout
  // -------------------------------------------------------

  const result =
    await prisma.officialAttendance.update({
      where: {
        id: attendance.id,
      },

      data: {
        checkOutTime: now,
      },

      include: {
        official: true,
      },
    });

  return result;
};

// =========================================================
// EXPORT
// =========================================================

export const OfficialAttendanceService = {
  createOfficialAttendance,
  getAllOfficialAttendance,
  getOfficialAttendanceById,
  getOfficialAttendanceHistory,
  updateOfficialAttendance,
  deleteOfficialAttendance,
  officialCheckIn,
  officialCheckOut,
};