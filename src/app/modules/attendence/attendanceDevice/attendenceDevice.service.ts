import {
  Prisma
} from "@prisma/client";

import {
  IAttendanceDeviceQuery,
  ICreateAttendanceDevice,
  IUpdateAttendanceDevice,
} from "./attendenceDevice.interface";

import { prisma } from "../../../../shared/prisma";

// =========================================================
// CREATE ATTENDANCE DEVICE
// =========================================================

const createAttendanceDevice = async (
  payload: ICreateAttendanceDevice
) => {
  const {
    name,
    deviceCode,
    type,
    schoolId,
    isActive,
  } = payload;

  // -------------------------------------------------------
  // Check duplicate device code
  // -------------------------------------------------------

  const existingDevice =
    await prisma.attendanceDevice.findUnique({
      where: {
        deviceCode,
      },
    });

  if (existingDevice) {
    throw new Error(
      "Attendance device with this device code already exists"
    );
  }

  // -------------------------------------------------------
  // Create device
  // -------------------------------------------------------

  const result =
    await prisma.attendanceDevice.create({
      data: {
        name,
        deviceCode,
        type,
        schoolId,

        isActive:
          isActive !== undefined
            ? isActive
            : true,
      },
    });

  return result;
};

// =========================================================
// GET ALL ATTENDANCE DEVICES
// =========================================================

const getAllAttendanceDevices = async (
  query: IAttendanceDeviceQuery
) => {
  const {
    searchTerm,
    type,
    isActive,
    schoolId,
  } = query;

  const andConditions: Prisma.AttendanceDeviceWhereInput[] =
    [];

  // -------------------------------------------------------
  // Search
  // -------------------------------------------------------

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },

        {
          deviceCode: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // -------------------------------------------------------
  // School
  // -------------------------------------------------------

  if (schoolId) {
    andConditions.push({
      schoolId,
    });
  }

  // -------------------------------------------------------
  // Device type
  // -------------------------------------------------------

  if (type) {
    andConditions.push({
      type,
    });
  }

  // -------------------------------------------------------
  // Active status
  // -------------------------------------------------------

  if (isActive !== undefined) {
    andConditions.push({
      isActive,
    });
  }

  // -------------------------------------------------------
  // WHERE
  // -------------------------------------------------------

  const where: Prisma.AttendanceDeviceWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  // -------------------------------------------------------
  // Get devices
  // -------------------------------------------------------

  const result =
    await prisma.attendanceDevice.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },
    });

  return result;
};

// =========================================================
// GET SINGLE DEVICE
// =========================================================

const getAttendanceDeviceById = async (
  id: string
) => {
  const result =
    await prisma.attendanceDevice.findUnique({
      where: {
        id,
      },
    });

  if (!result) {
    throw new Error(
      "Attendance device not found"
    );
  }

  return result;
};

// =========================================================
// GET DEVICE BY DEVICE CODE
// =========================================================

const getAttendanceDeviceByDeviceCode = async (
  deviceCode: string
) => {
  const result =
    await prisma.attendanceDevice.findUnique({
      where: {
        deviceCode,
      },
    });

  if (!result) {
    throw new Error(
      "Attendance device not found"
    );
  }

  return result;
};

// =========================================================
// UPDATE DEVICE
// =========================================================

const updateAttendanceDevice = async (
  id: string,
  payload: IUpdateAttendanceDevice
) => {
  // -------------------------------------------------------
  // Check device
  // -------------------------------------------------------

  const existingDevice =
    await prisma.attendanceDevice.findUnique({
      where: {
        id,
      },
    });

  if (!existingDevice) {
    throw new Error(
      "Attendance device not found"
    );
  }

  // -------------------------------------------------------
  // Check duplicate device code
  // -------------------------------------------------------

  if (
    payload.deviceCode &&
    payload.deviceCode !==
      existingDevice.deviceCode
  ) {
    const duplicateDevice =
      await prisma.attendanceDevice.findUnique({
        where: {
          deviceCode:
            payload.deviceCode,
        },
      });

    if (duplicateDevice) {
      throw new Error(
        "Another attendance device already uses this device code"
      );
    }
  }

  // -------------------------------------------------------
  // Update
  // -------------------------------------------------------

  const result =
    await prisma.attendanceDevice.update({
      where: {
        id,
      },

      data: {
        ...payload,
      },
    });

  return result;
};

// =========================================================
// DELETE DEVICE
// =========================================================

const deleteAttendanceDevice = async (
  id: string
) => {
  // -------------------------------------------------------
  // Check device
  // -------------------------------------------------------

  const existingDevice =
    await prisma.attendanceDevice.findUnique({
      where: {
        id,
      },
    });

  if (!existingDevice) {
    throw new Error(
      "Attendance device not found"
    );
  }

  // -------------------------------------------------------
  // Delete
  // -------------------------------------------------------

  const result =
    await prisma.attendanceDevice.delete({
      where: {
        id,
      },
    });

  return result;
};

// =========================================================
// ACTIVATE DEVICE
// =========================================================

const activateAttendanceDevice = async (
  id: string
) => {
  const existingDevice =
    await prisma.attendanceDevice.findUnique({
      where: {
        id,
      },
    });

  if (!existingDevice) {
    throw new Error(
      "Attendance device not found"
    );
  }

  const result =
    await prisma.attendanceDevice.update({
      where: {
        id,
      },

      data: {
        isActive: true,
      },
    });

  return result;
};

// =========================================================
// DEACTIVATE DEVICE
// =========================================================

const deactivateAttendanceDevice = async (
  id: string
) => {
  const existingDevice =
    await prisma.attendanceDevice.findUnique({
      where: {
        id,
      },
    });

  if (!existingDevice) {
    throw new Error(
      "Attendance device not found"
    );
  }

  const result =
    await prisma.attendanceDevice.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },
    });

  return result;
};

// =========================================================
// DEVICE HEARTBEAT
// =========================================================

const attendanceDeviceHeartbeat = async (
  deviceCode: string
) => {
  // -------------------------------------------------------
  // Find device
  // -------------------------------------------------------

  const device =
    await prisma.attendanceDevice.findUnique({
      where: {
        deviceCode,
      },
    });

  if (!device) {
    throw new Error(
      "Attendance device not found"
    );
  }

  // -------------------------------------------------------
  // Check active
  // -------------------------------------------------------

  if (!device.isActive) {
    throw new Error(
      "Attendance device is inactive"
    );
  }

  // -------------------------------------------------------
  // Update last seen
  // -------------------------------------------------------

  const result =
    await prisma.attendanceDevice.update({
      where: {
        deviceCode,
      },

      data: {
        lastSeenAt: new Date(),
      },
    });

  return result;
};

// =========================================================
// GET ACTIVE DEVICES
// =========================================================

const getActiveAttendanceDevices = async (
  schoolId?: string
) => {
  const where: Prisma.AttendanceDeviceWhereInput = {
    isActive: true,
  };

  if (schoolId) {
    where.schoolId = schoolId;
  }

  const result =
    await prisma.attendanceDevice.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },
    });

  return result;
};

// =========================================================
// EXPORT
// =========================================================

export const AttendanceDeviceService = {
  createAttendanceDevice,

  getAllAttendanceDevices,

  getAttendanceDeviceById,

  getAttendanceDeviceByDeviceCode,

  updateAttendanceDevice,

  deleteAttendanceDevice,

  activateAttendanceDevice,

  deactivateAttendanceDevice,

  attendanceDeviceHeartbeat,

  getActiveAttendanceDevices,
};