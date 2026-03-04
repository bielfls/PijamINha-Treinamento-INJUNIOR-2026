-- DropForeignKey
ALTER TABLE "sale_pajamas" DROP CONSTRAINT "sale_pajamas_sale_id_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_address_id_fkey";

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_pajamas" ADD CONSTRAINT "sale_pajamas_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
