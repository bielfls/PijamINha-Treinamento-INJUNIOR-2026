import type { Prisma } from '@/@types/prisma/client.js'
import type { UsersRepository } from '../users-repository.js'
import { prisma } from '@/libs/prisma.js'

export class PrismaUsersRepository implements UsersRepository {
    async createUser(data: Prisma.UserCreateInput) {
        return await prisma.user.create({ data })
    }
    async findByUsernameOrEmail(email: string | undefined, username: string | undefined) {
        return await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        })
    }
    async listUsers() {
        return await prisma.user.findMany({
            orderBy: { id: "asc"}
        })
    }
    async getUser(where: Prisma.UserWhereInput) {
        return await prisma.user.findFirst({ where })
    }
    async deleteUser(id: number) {
        await prisma.user.delete({
            where: { id }
        })
    }
    async updateUser(id: number, data: any) {
        return await prisma.user.update({
            where: { id },
            data
        })
    }
}