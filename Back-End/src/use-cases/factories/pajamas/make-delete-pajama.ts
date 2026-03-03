import { PrismaPajamasRepository } from "@/repositories/prisma/pajamas-prisma-repository.js";
import { DeletePajamaUseCase } from "@/use-cases/pajamas/delete-pajamas.js";

export function makeDeletePajamaUseCase() {
    const pajamasRepository = new PrismaPajamasRepository()
    const deleteUseCase = new DeletePajamaUseCase(pajamasRepository)

    return deleteUseCase
}