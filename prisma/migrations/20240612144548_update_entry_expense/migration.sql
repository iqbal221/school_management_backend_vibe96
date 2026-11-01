/*
  Warnings:

  - Added the required column `comment` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "comment" TEXT NOT NULL;
