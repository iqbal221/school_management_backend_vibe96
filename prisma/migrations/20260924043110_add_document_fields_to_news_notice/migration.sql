/*
  Warnings:

  - You are about to drop the column `isActive` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `notices` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `notices` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "news_isActive_idx";

-- DropIndex
DROP INDEX "news_order_idx";

-- DropIndex
DROP INDEX "notices_isActive_idx";

-- DropIndex
DROP INDEX "notices_order_idx";

-- AlterTable
ALTER TABLE "news" DROP COLUMN "isActive",
DROP COLUMN "order",
ADD COLUMN     "documentName" TEXT,
ADD COLUMN     "documentUrl" TEXT;

-- AlterTable
ALTER TABLE "notices" DROP COLUMN "isActive",
DROP COLUMN "order",
ADD COLUMN     "documentName" TEXT,
ADD COLUMN     "documentUrl" TEXT;
