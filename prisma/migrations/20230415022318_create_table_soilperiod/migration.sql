-- CreateTable
CREATE TABLE "SoyPeriod" (
    "id" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SoyPeriod_pkey" PRIMARY KEY ("id")
);
