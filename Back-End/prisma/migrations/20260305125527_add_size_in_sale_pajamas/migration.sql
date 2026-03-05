/*
  Warnings:

  - A unique constraint covering the columns `[sale_id,pajamas_id,size]` on the table `sale_pajamas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `size` to the `sale_pajamas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sale_pajamas_sale_id_pajamas_id_key";

-- AlterTable
ALTER TABLE "sale_pajamas" ADD COLUMN     "size" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sale_pajamas_sale_id_pajamas_id_size_key" ON "sale_pajamas"("sale_id", "pajamas_id", "size");
