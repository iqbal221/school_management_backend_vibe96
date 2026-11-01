-- CreateTable
CREATE TABLE "news" (
    "news_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("news_id")
);

-- CreateTable
CREATE TABLE "notices" (
    "notice_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notices_pkey" PRIMARY KEY ("notice_id")
);

-- CreateIndex
CREATE INDEX "news_order_idx" ON "news"("order");

-- CreateIndex
CREATE INDEX "news_isActive_idx" ON "news"("isActive");

-- CreateIndex
CREATE INDEX "notices_order_idx" ON "notices"("order");

-- CreateIndex
CREATE INDEX "notices_isActive_idx" ON "notices"("isActive");
