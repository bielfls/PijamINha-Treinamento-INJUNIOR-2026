import { PrismaPajamasRepository } from "@/repositories/prisma/pajamas-prisma-repository.js";
import { CreatePajamaUseCase } from "../../pajamas/create-pajama.js";

export function makeCreatePajamaUseCase() {
    const pajamasRepository = new PrismaPajamasRepository()
    const createUseCase = new CreatePajamaUseCase(pajamasRepository)

    return createUseCase
}