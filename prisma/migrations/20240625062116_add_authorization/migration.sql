-- CreateTable
CREATE TABLE "authorizations" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "approval" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authorizations_pkey" PRIMARY KEY ("id")
);
