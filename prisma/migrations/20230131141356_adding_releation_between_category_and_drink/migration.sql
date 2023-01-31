/*
  Warnings:

  - You are about to drop the column `category` on the `Drink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Drink" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
