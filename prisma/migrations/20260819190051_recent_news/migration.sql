/*
  Warnings:

  - You are about to drop the `RecentNews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RecentNews";

-- CreateTable
CREATE TABLE "recent_news" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recent_news_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "recent_news_order_idx" ON "recent_news"("order");

-- CreateIndex
CREATE INDEX "recent_news_isActive_idx" ON "recent_news"("isActive");
