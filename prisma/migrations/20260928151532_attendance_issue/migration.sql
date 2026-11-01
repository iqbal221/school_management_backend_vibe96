/*
  Warnings:

  - The `status` column on the `official_attendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `student_attendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `teacher_attendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[officialId,attendanceDate]` on the table `official_attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `officials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[faceId]` on the table `officials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,attendanceDate]` on the table `student_attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId,attendanceDate]` on the table `teacher_attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[faceId]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `method` to the `official_attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `student_attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `teacher_attendance` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PersonType" AS ENUM ('STUDENT', 'TEACHER', 'OFFICIAL');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');

-- CreateEnum
CREATE TYPE "AttendanceMethod" AS ENUM ('FACE', 'BIOMETRIC', 'MANUAL');

-- DropForeignKey
ALTER TABLE "official_attendance" DROP CONSTRAINT "official_attendance_officialId_fkey";

-- DropForeignKey
ALTER TABLE "student_attendance" DROP CONSTRAINT "student_attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "teacher_attendance" DROP CONSTRAINT "teacher_attendance_teacherId_fkey";

-- AlterTable
ALTER TABLE "official_attendance" ADD COLUMN     "checkInTime" TIMESTAMP(3),
ADD COLUMN     "checkOutTime" TIMESTAMP(3),
ADD COLUMN     "confidence" DOUBLE PRECISION,
ADD COLUMN     "deviceId" TEXT,
ADD COLUMN     "method" "AttendanceMethod" NOT NULL,
ADD COLUMN     "verificationId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "AttendanceStatus" NOT NULL DEFAULT 'PRESENT',
ALTER COLUMN "attendanceDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "officials" ADD COLUMN     "faceEmbedding" TEXT,
ADD COLUMN     "faceId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "school_leadership" ALTER COLUMN "founderImage" DROP NOT NULL,
ALTER COLUMN "principalImage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "student_attendance" ADD COLUMN     "checkInTime" TIMESTAMP(3),
ADD COLUMN     "checkOutTime" TIMESTAMP(3),
ADD COLUMN     "confidence" DOUBLE PRECISION,
ADD COLUMN     "deviceId" TEXT,
ADD COLUMN     "method" "AttendanceMethod" NOT NULL,
ADD COLUMN     "notificationSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificationSentAt" TIMESTAMP(3),
ADD COLUMN     "verificationId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "AttendanceStatus" NOT NULL DEFAULT 'PRESENT',
ALTER COLUMN "attendanceDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "classId" TEXT,
ADD COLUMN     "faceEmbedding" JSONB,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "sectionId" TEXT;

-- AlterTable
ALTER TABLE "teacher_attendance" ADD COLUMN     "checkInTime" TIMESTAMP(3),
ADD COLUMN     "checkOutTime" TIMESTAMP(3),
ADD COLUMN     "confidence" DOUBLE PRECISION,
ADD COLUMN     "deviceId" TEXT,
ADD COLUMN     "method" "AttendanceMethod" NOT NULL,
ADD COLUMN     "verificationId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "AttendanceStatus" NOT NULL DEFAULT 'PRESENT',
ALTER COLUMN "attendanceDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "faceEmbedding" TEXT,
ADD COLUMN     "faceId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "fatherName" TEXT,
    "motherName" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "face_profiles" (
    "id" TEXT NOT NULL,
    "personType" "PersonType" NOT NULL,
    "personId" TEXT NOT NULL,
    "faceImage" TEXT,
    "embedding" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "face_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "face_profiles_personType_personId_idx" ON "face_profiles"("personType", "personId");

-- CreateIndex
CREATE INDEX "sections_classId_idx" ON "sections"("classId");

-- CreateIndex
CREATE INDEX "official_attendance_attendanceDate_idx" ON "official_attendance"("attendanceDate");

-- CreateIndex
CREATE INDEX "official_attendance_officialId_idx" ON "official_attendance"("officialId");

-- CreateIndex
CREATE INDEX "official_attendance_deviceId_idx" ON "official_attendance"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "official_attendance_officialId_attendanceDate_key" ON "official_attendance"("officialId", "attendanceDate");

-- CreateIndex
CREATE UNIQUE INDEX "officials_email_key" ON "officials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "officials_faceId_key" ON "officials"("faceId");

-- CreateIndex
CREATE INDEX "student_attendance_attendanceDate_idx" ON "student_attendance"("attendanceDate");

-- CreateIndex
CREATE INDEX "student_attendance_studentId_idx" ON "student_attendance"("studentId");

-- CreateIndex
CREATE INDEX "student_attendance_deviceId_idx" ON "student_attendance"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "student_attendance_studentId_attendanceDate_key" ON "student_attendance"("studentId", "attendanceDate");

-- CreateIndex
CREATE INDEX "teacher_attendance_attendanceDate_idx" ON "teacher_attendance"("attendanceDate");

-- CreateIndex
CREATE INDEX "teacher_attendance_teacherId_idx" ON "teacher_attendance"("teacherId");

-- CreateIndex
CREATE INDEX "teacher_attendance_deviceId_idx" ON "teacher_attendance"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_attendance_teacherId_attendanceDate_key" ON "teacher_attendance"("teacherId", "attendanceDate");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_email_key" ON "teachers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_faceId_key" ON "teachers"("faceId");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_attendance" ADD CONSTRAINT "student_attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_attendance" ADD CONSTRAINT "teacher_attendance_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "official_attendance" ADD CONSTRAINT "official_attendance_officialId_fkey" FOREIGN KEY ("officialId") REFERENCES "officials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
