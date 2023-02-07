-- DropForeignKey
ALTER TABLE "Drink" DROP CONSTRAINT "Drink_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Drink" ADD CONSTRAINT "Drink_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
