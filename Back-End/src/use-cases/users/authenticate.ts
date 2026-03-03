import type { User } from "@/@types/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import { compare } from "bcryptjs"

interface AuthenticateUseCaseRequest {
    login: string
    password: string
}
type AuthenticateUseCaseResponse = {
    user: User
}
export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute({
        login, password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByUsernameOrEmail(login, login)
        if (!user) {
            throw new Error()
        }
        const passwordMatches = await compare(password, user.passwordHash)
        if (!passwordMatches) {
            throw new Error()
        }

        return { user }
    }
}