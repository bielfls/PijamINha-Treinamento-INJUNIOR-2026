import type { Prisma, User } from "@/@types/prisma/client.js"

export interface UsersRepository {
    createUser(data: Prisma.UserCreateInput) : Promise<User>
    findByUsernameOrEmail(email: string | undefined, username: string | undefined): Promise<User | null>
    getUser(where: Prisma.UserWhereInput): Promise<User | null>
    listUsers(): Promise<User[]>
    deleteUser(id: number): Promise<void>
    updateUser(id: number, data: any): Promise<User>
}