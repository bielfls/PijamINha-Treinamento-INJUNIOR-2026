import { SalesPrismaRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { GetSaleUseCase } from "@/use-cases/sales/get-sale.js"


export function makeGetSaleUseCase(){
    const salesRepository = new SalesPrismaRepository()
    const getSaleUseCase = new GetSaleUseCase(salesRepository )

    return getSaleUseCase
}