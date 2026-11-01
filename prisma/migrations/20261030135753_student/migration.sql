/*
  Warnings:

  - You are about to drop the column `studentId` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentIdNumber]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `admissinId` to the `student_attendance` table without a default value. This is not possible if the table is not empty.
  - The required column `studentIdNumber` was added to the `students` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "students_studentId_key";

-- AlterTable
ALTER TABLE "student_attendance" ADD COLUMN     "admissinId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "studentId",
ADD COLUMN     "studentIdNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "students_studentIdNumber_key" ON "students"("studentIdNumber");
