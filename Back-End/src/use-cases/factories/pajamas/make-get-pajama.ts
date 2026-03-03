import { PrismaPajamasRepository } from "@/repositories/prisma/pajamas-prisma-repository.js"
import { GetPajamaUseCase } from "@/use-cases/pajamas/get-pajama.js"

export function makeGetPajamaUseCase() {
    const pajamasRepository = new PrismaPajamasRepository()
    const getUseCase = new GetPajamaUseCase(pajamasRepository)

    return getUseCase
}