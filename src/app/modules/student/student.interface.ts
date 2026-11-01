import { Student } from "@prisma/client";

// =========================================================
// STUDENT CREATE INTERFACE
// =========================================================

export interface ICreateStudent {
  firstName: string;
  lastName?: string;
  studentIdNumber: string;
  email?: string;
  phone?: string;

  dateOfBirth?: Date | null;
  gender?: string;

  rollNumber?: number | null;

  classId: string;
  sectionId?: string | null;

  image?: string[];

  address?: string;
  bloodGroup?: string;

  fatherName?: string;
  fatherPhone?: string;

  motherName?: string;
  motherPhone?: string;

  admissionDate?: Date | null;

  isActive?: boolean;
}

// =========================================================
// STUDENT UPDATE INTERFACE
// =========================================================

export interface IUpdateStudent {
  firstName?: string;
  lastName?: string;
  studentIdNumber?: string;
  email?: string;
  phone?: string;

  dateOfBirth?: Date | null;
  gender?: string;

  rollNumber?: number | null;

  classId?: string;
  sectionId?: string | null;

  image?: string[];

  address?: string;
  bloodGroup?: string;

  fatherName?: string;
  fatherPhone?: string;

  motherName?: string;
  motherPhone?: string;

  admissionDate?: Date | null;

  isActive?: boolean;
}

// =========================================================
// STUDENT RESPONSE
// =========================================================

export type IStudent = Student;