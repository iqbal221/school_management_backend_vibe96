-- CreateTable
CREATE TABLE "school_headers" (
    "id" TEXT NOT NULL,
    "logo" TEXT,
    "schoolName" TEXT NOT NULL,
    "slogan" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_headers_pkey" PRIMARY KEY ("id")
);
