/*
  Warnings:

  - You are about to drop the column `exam` on the `fees_managements` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `fees_managements` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `fees_managements` table. All the data in the column will be lost.
  - Added the required column `comment` to the `fees_managements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feesType` to the `fees_managements` table without a default value. This is not possible if the table is not empty.
  - Made the column `fees` on table `fees_managements` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "fees_managements" DROP COLUMN "exam",
DROP COLUMN "month",
DROP COLUMN "year",
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "feesType" TEXT NOT NULL,
ALTER COLUMN "fees" SET NOT NULL;
