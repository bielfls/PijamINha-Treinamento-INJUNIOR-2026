import { SalesPrismaRepository } from "@/repositories/prisma/sales-prisma-repository.js";
import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { UpdateAddressUseCase } from "@/use-cases/sales/update-address-sale.js";


export function makeUpdateAddressUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const salesRepository = new SalesPrismaRepository()
    const updateAddressUseCase = new UpdateAddressUseCase(usersRepository, salesRepository)

    return updateAddressUseCase
}