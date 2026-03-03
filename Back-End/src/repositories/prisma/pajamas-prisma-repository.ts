import { prisma } from '@/libs/prisma.js'
import { Prisma } from '@/@types/prisma/client.js'

export class PrismaPajamasRepository {
    async create(data: Prisma.PajamasCreateInput) {
        const pajama = await prisma.pajamas.create({
            data: {
                ...data,
                sizes: {
                    create: [
                        { size: 'PP', stockQuantity: 0 },
                        { size: 'P', stockQuantity: 0 },
                        { size: 'M', stockQuantity: 0 },
                        { size: 'G', stockQuantity: 0 },
                        { size: 'GG', stockQuantity: 0 },
                    ]
                }
            },
            include: {
                sizes: true
            }
        })

        return pajama
    }

    async update(pajamaId: string, size: string, quantity: number): Promise<void> {
        await prisma.pajamas.update({
            where: {
                publicId: pajamaId
            },
            data: {
                sizes: {
                    updateMany: {
                        where: { 
                            size: size
                        },
                        data: { 
                            stockQuantity: quantity
                        }
                    }
                }
            }
        })
    }
    
    async findById(publicId: string) {
        const pajama = await prisma.pajamas.findUnique({
            where: {
                publicId
            }
        })
        return pajama
    }

    async findWithSizesById(publicId: string) {
        const pajama = await prisma.pajamas.findUnique({
            where: {
                publicId
            },
            include: {
                sizes: true
            }
        })
        return pajama
    }

    async delete(id: number) {
        return await prisma.pajamas.delete({
            where: {
                id
            },
        })
    }


    async listWithSizes({
        name,
        page = 1,
        limit = 5,
    }: {
        name?: string
        page?: number
        limit?: number
    }) {
        const skip = (page - 1) * limit

        const where: Prisma.PajamasWhereInput = {
            name: name
                ? {
                    contains: name,
                    mode: 'insensitive',
                }
                : undefined,
        }

        const pajamas = await prisma.pajamas.findMany({
            where,
            include: {
                sizes: true
            },
            skip,
            take: limit,
            orderBy: [{ name: 'asc' }, { id: 'desc' }],
        })

        const totalCount = await prisma.pajamas.count({
            where,
        })

        const totalPages = Math.ceil(totalCount / limit)

        return {
            data: pajamas,
            totalCount,
            totalPages,
            currentPage: page,
        }
    }
}