/*
  Warnings:

  - Added the required column `category` to the `Drink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drink" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tag" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "volume" TEXT;
