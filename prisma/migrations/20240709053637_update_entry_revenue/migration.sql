/*
  Warnings:

  - You are about to drop the column `receiveDate` on the `entry_revenues` table. All the data in the column will be lost.
  - Added the required column `entryDate` to the `entry_revenues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entry_revenues" DROP COLUMN "receiveDate",
ADD COLUMN     "entryDate" TIMESTAMP(3) NOT NULL;
