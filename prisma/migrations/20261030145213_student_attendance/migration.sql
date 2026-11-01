/*
  Warnings:

  - You are about to drop the column `admissinId` on the `student_attendance` table. All the data in the column will be lost.
  - Added the required column `admissionId` to the `student_attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_attendance" DROP COLUMN "admissinId",
ADD COLUMN     "admissionId" TEXT NOT NULL;
