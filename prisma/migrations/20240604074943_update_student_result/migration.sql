/*
  Warnings:

  - You are about to drop the column `MathematicsPoint` on the `student_result` table. All the data in the column will be lost.
  - You are about to drop the column `banglaPoint` on the `student_result` table. All the data in the column will be lost.
  - You are about to drop the column `englishPoint` on the `student_result` table. All the data in the column will be lost.
  - You are about to drop the column `religiousPoint` on the `student_result` table. All the data in the column will be lost.
  - You are about to drop the column `sciencePoint` on the `student_result` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student_result" DROP COLUMN "MathematicsPoint",
DROP COLUMN "banglaPoint",
DROP COLUMN "englishPoint",
DROP COLUMN "religiousPoint",
DROP COLUMN "sciencePoint",
ADD COLUMN     "MathematicsMarks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "banglaMarks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "englishMarks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "religiousMarks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scienceMarks" INTEGER NOT NULL DEFAULT 0;
