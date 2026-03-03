import type { UsersRepository } from "@/repositories/users-repository.js"
import type { User } from "@/@types/prisma/client.js"

type ListUsersUseCaseResponse = {
  users: User[]
}

export class ListAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.listUsers()

    return { users }
  }
}