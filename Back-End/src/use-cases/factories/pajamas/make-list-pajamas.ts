import { PrismaPajamasRepository } from "@/repositories/prisma/pajamas-prisma-repository.js";
import { ListPajamasUseCase } from "@/use-cases/pajamas/list-pajamas.js";

export function makeListPajamasUseCase() {
    const pajamasRepository = new PrismaPajamasRepository()
    const listUseCase = new ListPajamasUseCase(pajamasRepository)

    return listUseCase
}