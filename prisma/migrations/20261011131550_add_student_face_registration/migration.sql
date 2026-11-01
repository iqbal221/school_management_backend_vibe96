/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `apps_users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[officialtId]` on the table `officials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.
  - The required column `officialtId` was added to the `officials` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `studentId` was added to the `students` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `teacherId` was added to the `teachers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "officials" ADD COLUMN     "officialtId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "teacherId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "apps_users_email_key" ON "apps_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "officials_officialtId_key" ON "officials"("officialtId");

-- CreateIndex
CREATE UNIQUE INDEX "students_studentId_key" ON "students"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_teacherId_key" ON "teachers"("teacherId");
