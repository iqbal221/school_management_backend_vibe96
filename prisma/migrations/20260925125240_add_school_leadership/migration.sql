-- CreateTable
CREATE TABLE "school_leadership" (
    "id" TEXT NOT NULL,
    "founderName" TEXT NOT NULL,
    "founderImage" TEXT NOT NULL,
    "principalName" TEXT NOT NULL,
    "principalImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_leadership_pkey" PRIMARY KEY ("id")
);
