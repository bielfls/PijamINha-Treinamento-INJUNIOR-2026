import { PrismaUsersRepository } from "@/repositories/prisma/users-prisma-repository.js";
import { ListAllUsersUseCase } from "@/use-cases/users/list-users.js";

export function makeListAllUsersUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const listAllUsers = new ListAllUsersUseCase(usersRepository)

    return listAllUsers
}