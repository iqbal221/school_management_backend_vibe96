import { AttendanceMethod, AttendanceStatus } from "@prisma/client";

export interface ICreateOfficialAttendance {
  officialId: string;

  attendanceDate?: Date;

  checkInTime?: Date;
  checkOutTime?: Date;

  status?: AttendanceStatus;

  method: AttendanceMethod;

  confidence?: number;

  deviceId?: string;

  verificationId?: string;
}

export interface IUpdateOfficialAttendance {
  attendanceDate?: Date;

  checkInTime?: Date;
  checkOutTime?: Date;

  status?: AttendanceStatus;

  method?: AttendanceMethod;

  confidence?: number;

  deviceId?: string;

  verificationId?: string;
}