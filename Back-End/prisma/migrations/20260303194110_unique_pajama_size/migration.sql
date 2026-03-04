/*
  Warnings:

  - A unique constraint covering the columns `[size,pajama_id]` on the table `pajamas_size` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pajamas_size_size_pajama_id_key" ON "pajamas_size"("size", "pajama_id");
