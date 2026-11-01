import { AttendanceMethod, AttendanceStatus } from "@prisma/client";

export interface ICreateTeacherAttendance {
  teacherId: string;

  attendanceDate?: Date;

  checkInTime?: Date;
  checkOutTime?: Date;

  status?: AttendanceStatus;

  method: AttendanceMethod;

  confidence?: number;

  deviceId?: string;

  verificationId?: string;
}

export interface IUpdateTeacherAttendance {
  attendanceDate?: Date;

  checkInTime?: Date;
  checkOutTime?: Date;

  status?: AttendanceStatus;

  method?: AttendanceMethod;

  confidence?: number;

  deviceId?: string;

  verificationId?: string;
}