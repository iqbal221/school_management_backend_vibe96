-- CreateTable
CREATE TABLE "revenues" (
    "id" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "receiveDate" TIMESTAMP(3) NOT NULL,
    "revenue" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);
