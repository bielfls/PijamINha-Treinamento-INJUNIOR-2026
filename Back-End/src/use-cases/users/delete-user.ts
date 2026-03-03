import type { UsersRepository } from "@/repositories/users-repository.js"

interface DeleteUserUseCaseRequest {
  publicId: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
     publicId,
   }: DeleteUserUseCaseRequest) {
    const user = await this.usersRepository.getUser({publicId})

    if (!user) {
      throw new Error
    }

    await this.usersRepository.deleteUser(user.id)
  }
}