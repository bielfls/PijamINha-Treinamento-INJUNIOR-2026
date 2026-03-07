import { prisma } from '@/libs/prisma.js'
import { Prisma } from '@/@types/prisma/client.js'
import type { PajamaWithSizes } from '@/http/presenters/pajamas-presenter.js'

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

    async update(pajamaId: string, favorite?: boolean, size?: string, quantity?: number): Promise<PajamaWithSizes> {
        return await prisma.pajamas.update({
            where: {
                publicId: pajamaId
            },
            data: {
                favorite: favorite !== undefined ? favorite : undefined,
                sizes: size? {
                    updateMany: {
                        where: { 
                            size: size
                        },
                        data: { 
                            stockQuantity: quantity
                        }
                    }
                } : undefined
            },
            include: { sizes: true }
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
        season,
        type,
        gender,
        page = 1,
        limit = 5,
    }: {
        name?: string
        season?: string 
        type?: string
        gender?: string
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
            season: season
                ? {
                    contains: season,
                    mode: 'insensitive',
                }
                : undefined,
            type: type
                ? {
                    contains: type,
                    mode: 'insensitive',
                }
                : undefined,
            gender: gender
                ? {
                    contains: gender,
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