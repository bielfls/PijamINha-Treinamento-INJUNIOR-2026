import type { UsersRepository } from "@/repositories/users-repository.js"
import { hash } from "bcryptjs"
import { env } from "@/env/index.js"
import type { User } from "@/@types/prisma/client.js"
import { ItemAlreadyExistsError } from "../errors/item-already-exists-error.js"
import { ResourceNotFoundError } from "../errors/resourse-not-found-error.js"

interface UpdateUserUseCaseRequest {
  publicId: string
  name?: string
  username?: string
  email?: string
  password?: string
}

type UpdateUserUseCaseResponse = {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    publicId,
    name,
    username,
    email,
    password
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userToUpdate = await this.usersRepository.getUser({ publicId })

    if (!userToUpdate) {
        throw new ResourceNotFoundError()
    }

    if (email || username) {
        const existingUser = await this.usersRepository.findByUsernameOrEmail(email, username)

        if (existingUser && existingUser.id !== userToUpdate.id) {
          throw new ItemAlreadyExistsError()
        }
    }

    const dataToUpdate: any = {}

    if (name) dataToUpdate.name = name
    if (email) dataToUpdate.email = email
    if (username) dataToUpdate.username = username
    if (password) {dataToUpdate.password = await hash(password, env.HASH_SALT_ROUNDS)}

    const updatedUser = await this.usersRepository.updateUser(userToUpdate.id, dataToUpdate)

    return { user: updatedUser }
    }
}