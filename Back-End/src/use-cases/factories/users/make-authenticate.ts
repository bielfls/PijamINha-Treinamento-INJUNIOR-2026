import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { AuthenticateUseCase } from "@/use-cases/users/authenticate.js";

export function makeAuthenticateUseCase() {
    const userRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    return authenticateUseCase
}