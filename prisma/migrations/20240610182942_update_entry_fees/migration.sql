/*
  Warnings:

  - You are about to drop the `fees_managements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "fees_managements";

-- CreateTable
CREATE TABLE "entry_feess" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "roll" TEXT NOT NULL,
    "feesType" TEXT NOT NULL,
    "fees" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entry_feess_pkey" PRIMARY KEY ("id")
);
