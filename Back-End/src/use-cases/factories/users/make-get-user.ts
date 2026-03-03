import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { GetUserUseCase } from "@/use-cases/users/get-user.js";

export function makeGetUserUseCase() {
    const userRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(userRepository)

    return getUserUseCase
}