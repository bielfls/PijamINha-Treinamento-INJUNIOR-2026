import { SalesPrismaRepository } from "@/repositories/prisma/sales-prisma-repository.js"
import { ListSaleUseCase } from "@/use-cases/sales/list-sale.js"


export function makeListSaleUseCase(){
    const salesRepository = new SalesPrismaRepository()
    const listSaleUseCase = new ListSaleUseCase(salesRepository)

    return listSaleUseCase
}