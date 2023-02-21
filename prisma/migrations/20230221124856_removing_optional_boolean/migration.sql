/*
  Warnings:

  - Made the column `addDescription` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `addTypes` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isDefault` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "addDescription" SET NOT NULL,
ALTER COLUMN "addTypes" SET NOT NULL,
ALTER COLUMN "isDefault" SET NOT NULL;
