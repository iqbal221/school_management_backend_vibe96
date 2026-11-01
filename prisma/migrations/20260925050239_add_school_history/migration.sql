-- CreateTable
CREATE TABLE "school_history" (
    "id" TEXT NOT NULL,
    "sectionTitle" TEXT NOT NULL,
    "aboutSchool" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_history_pkey" PRIMARY KEY ("id")
);
