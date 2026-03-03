import { PrismaPajamasRepository } from "@/repositories/prisma/pajamas-prisma-repository.js";
import { UpdatePajamaUseCase } from "@/use-cases/pajamas/update-pajama.js";

export function makeUpdatePajamaUseCase() {
    const pajamasRepository = new PrismaPajamasRepository()
    const updateUseCase = new UpdatePajamaUseCase(pajamasRepository)

    return updateUseCase
}