import { SalesPrismaRepository } from "@/repositories/prisma/sales-prisma-repository.js";
import { CreateSaleUseCase } from "@/use-cases/sales/create-sale.js";


export function makeCreateSaleUseCase(){
    const saleRepository = new SalesPrismaRepository()
    const createSaleUseCase = new CreateSaleUseCase(saleRepository)

    return createSaleUseCase
}