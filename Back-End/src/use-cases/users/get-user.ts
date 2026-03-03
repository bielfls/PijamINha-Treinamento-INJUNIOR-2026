import type { User } from "@/@types/prisma/client.js"
import type { UsersRepository } from "@/repositories/users-repository.js"

interface GetUserUseCaseRequest {
    publicId: string
}

type GetUserUseCaseResponse = {
    user: User
}

export class GetUserUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute({
        publicId,
    }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.getUser({ publicId })

        if (!user) {
            throw new Error()
        }

        return { user }
    }
}