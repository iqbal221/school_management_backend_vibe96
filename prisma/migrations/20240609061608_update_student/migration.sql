/*
  Warnings:

  - You are about to drop the column `dist` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `po` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `ps` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `village` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "dist",
DROP COLUMN "po",
DROP COLUMN "ps",
DROP COLUMN "village";
