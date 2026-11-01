-- CreateTable
CREATE TABLE "RecentNews" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecentNews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecentNews_order_idx" ON "RecentNews"("order");

-- CreateIndex
CREATE INDEX "RecentNews_isActive_idx" ON "RecentNews"("isActive");
