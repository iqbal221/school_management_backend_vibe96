/*
  Warnings:

  - The `subjectName` column on the `student_result` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SubjectName" AS ENUM ('Bangla', 'English', 'Mathematics', 'Science', 'Religious');

-- AlterTable
ALTER TABLE "student_result" DROP COLUMN "subjectName",
ADD COLUMN     "subjectName" "SubjectName";
