/*
  Warnings:

  - You are about to drop the column `MathematicsGrade` on the `student_result` table. All the data in the column will be lost.
  - You are about to drop the column `MathematicsMarks` on the `student_result` table. All the data in the column will be lost.
  - Added the required column `mathematicsGrade` to the `student_result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student_result" DROP COLUMN "MathematicsGrade",
DROP COLUMN "MathematicsMarks",
ADD COLUMN     "mathematicsGrade" TEXT NOT NULL,
ADD COLUMN     "mathematicsMarks" INTEGER NOT NULL DEFAULT 0;
