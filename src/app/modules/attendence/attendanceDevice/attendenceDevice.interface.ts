import {
  AttendanceDeviceType,
} from "@prisma/client";

// =========================================================
// CREATE ATTENDANCE DEVICE
// =========================================================

export interface ICreateAttendanceDevice {
  name: string;

  deviceCode: string;

  type: AttendanceDeviceType;

  schoolId: string;

  isActive?: boolean;
}

// =========================================================
// UPDATE ATTENDANCE DEVICE
// =========================================================

export interface IUpdateAttendanceDevice {
  name?: string;

  deviceCode?: string;

  type?: AttendanceDeviceType;

  schoolId?: string;

  isActive?: boolean;

  lastSeenAt?: Date;
}

// =========================================================
// ATTENDANCE DEVICE QUERY
// =========================================================

export interface IAttendanceDeviceQuery {
  searchTerm?: string;

  type?: AttendanceDeviceType;

  isActive?: boolean;

  schoolId?: string;
}