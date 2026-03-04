import { PrismaPajamasRepository } from "@/repositories/prisma/pajamas-prisma-repository.js";
import { PajamaSizePrismaRepository } from "@/repositories/prisma/pajamas-size-prisma-repository.js";
import { SalesPrismaRepository } from "@/repositories/prisma/sales-prisma-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { CreateSaleUseCase } from "@/use-cases/sales/create-sale.js";


export function makeCreateSaleUseCase(){
    const saleRepository = new SalesPrismaRepository()
    const pajamaRepository = new PrismaPajamasRepository()
    const pajamaSizeRepository = new PajamaSizePrismaRepository()
    const usersRepository = new PrismaUsersRepository()
    const createSaleUseCase = new CreateSaleUseCase(saleRepository, pajamaRepository, pajamaSizeRepository, usersRepository)

    return createSaleUseCase
}