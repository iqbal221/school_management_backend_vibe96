import { AttendanceMethod, AttendanceStatus } from '@prisma/client';

export interface ICreateStudentAttendance {
  studentId: string;
  classId?: string;
  sectionId?: string;
  admissionId: string;
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

export interface IUpdateStudentAttendance {
  status?: AttendanceStatus;

  checkInTime?: string | Date;
  checkOutTime?: string | Date;

  remarks?: string;
}