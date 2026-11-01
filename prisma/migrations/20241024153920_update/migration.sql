/*
  Warnings:

  - You are about to drop the column `fullName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `permanentAddress` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "fullName",
DROP COLUMN "permanentAddress",
DROP COLUMN "presentAddress",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "name" TEXT;
