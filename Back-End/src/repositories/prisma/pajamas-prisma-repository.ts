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
            }
        })

        return pajama
    }
}