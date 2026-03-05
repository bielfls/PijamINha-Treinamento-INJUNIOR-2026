import type { User } from "@/@types/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import { env } from "@/env/index.js"
import { hash } from "bcryptjs"
import { ItemAlreadyExistsError } from "../errors/item-already-exists-error.js"


interface CreateUserUseCaseRequest {
    name: string
    username: string
    email: string
    password: string
}

type CreateUserUseCaseResponse = {
    user: User
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute({
        name,
        username,
        email,
        password
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const userAlreadyExists = await this.usersRepository.findByUsernameOrEmail(email, username)

        if (userAlreadyExists) {
            throw new ItemAlreadyExistsError()
        }

        const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

        const user = await this.usersRepository.createUser({
            name,
            username,
            email,
            passwordHash
        })

        return {user}
    }
}