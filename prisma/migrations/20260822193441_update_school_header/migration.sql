/*
  Warnings:

  - The `logo` column on the `school_headers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "school_headers" DROP COLUMN "logo",
ADD COLUMN     "logo" TEXT[];
