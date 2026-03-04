import { SalesPrismaRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { DeleteSaleUseCase } from "@/use-cases/sales/delete-sale.js"


export function makeDeleteSaleUseCase(){
    const salesRepository = new SalesPrismaRepository()
    const deleteSaleUseCase = new DeleteSaleUseCase(salesRepository)

    return deleteSaleUseCase
}