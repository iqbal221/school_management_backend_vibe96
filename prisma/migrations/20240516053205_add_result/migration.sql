-- CreateTable
CREATE TABLE "result" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "roll" TEXT NOT NULL,
    "banglaPoint" TEXT NOT NULL,
    "banglaGrade" TEXT NOT NULL,
    "englishPoint" TEXT NOT NULL,
    "englishGrade" TEXT NOT NULL,
    "MathematicsPoint" TEXT NOT NULL,
    "MathematicsGrade" TEXT NOT NULL,
    "sciencePoint" TEXT NOT NULL,
    "scienceGrade" TEXT NOT NULL,
    "religiousPoint" TEXT NOT NULL,
    "religiousGrade" TEXT NOT NULL,
    "point" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "result_pkey" PRIMARY KEY ("id")
);
