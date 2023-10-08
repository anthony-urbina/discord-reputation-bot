-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "body" TEXT,
    "type" "ReviewType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "writtenById" TEXT NOT NULL,
    "receivedById" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
