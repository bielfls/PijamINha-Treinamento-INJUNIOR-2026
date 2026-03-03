import type { User } from "@/@types/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import { env } from "@/env/index.js"
import { hash } from "bcryptjs"


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
        try {
            const userAlreadyExists = await this.usersRepository.findByUsernameOrEmail(email, username)

            if (userAlreadyExists) {
                if (userAlreadyExists.email === email) {
                    throw new Error("Email já em uso")
                }
                if (userAlreadyExists.username === username) {
                    throw new Error("Username já em uso")
                }
            }

            const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

            const user = await this.usersRepository.createUser({
                name,
                username,
                email,
                passwordHash
            })

            return {user}
        } catch (error) {
            throw error
        }
    }
}