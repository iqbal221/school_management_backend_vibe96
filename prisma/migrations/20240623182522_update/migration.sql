/*
  Warnings:

  - You are about to drop the `expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `revenues` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "expenses";

-- DropTable
DROP TABLE "revenues";

-- CreateTable
CREATE TABLE "entry_expenses" (
    "id" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "expenseHead" TEXT NOT NULL,
    "expenseType" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entry_expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entry_revenues" (
    "id" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "receiveDate" TIMESTAMP(3) NOT NULL,
    "revenue" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entry_revenues_pkey" PRIMARY KEY ("id")
);
