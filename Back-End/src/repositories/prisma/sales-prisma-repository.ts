import type { Prisma } from "@/@types/prisma/client.js";
import type { SalesRepository } from "../sales-repository.js";
import { prisma } from "@/libs/prisma.js";


export class SalesPrismaRepository implements SalesRepository{

    async create(data: Prisma.SaleCreateInput){
        return await prisma.sale.create({
            data,
            include: {
                address: true,
                pajamas: true
            },
        })
    }

    async findBy(where: Prisma.SaleWhereInput){
        return await prisma.sale.findFirst({
            where,
            include: {
                address: true,
                pajamas: true,
            }
        })
    }

    async delete(id: number){
        await prisma.sale.delete({where: {id}})
    }

    async list( {userId, page = 1, limit = 5}: {userId?: string, page?: number, limit?: number}){

        const skip = (page - 1) * limit

        const where: Prisma.SaleWhereInput = userId?{
            user: {
                publicId: userId
            }
            
        }: {}

        const user = await prisma.sale.findMany({
            where,
            include: {
                address: true,
                pajamas: true,
            },
            skip,
            take: limit
        })

        const totalCount = await prisma.address.count()
        const totalPage = Math.ceil(totalCount/ limit)

        return {
            data: user,
            totalCount,
            totalPage,
            currentPage: page,
        }
    }

    async update(id: number, data: Prisma.SaleUpdateInput){
        return await prisma.sale.update({
            where: {id},
            data,
            include: {
                address: true,
                pajamas: true
            },
        })
    }
}