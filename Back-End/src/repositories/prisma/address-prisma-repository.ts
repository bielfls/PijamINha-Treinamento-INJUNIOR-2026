
import type { AddressWhereInput } from "@/@types/prisma/models.js";
import type { AddressRepository } from "../address-repository.js";
import { prisma } from "@/libs/prisma.js";


export class AddressPrismaRepository implements AddressRepository{

    async list({page = 1, limit = 5}: { page?: number, limit?: number}){
        const skip = (page - 1)*limit

        const address = await prisma.address.findMany({
            skip,
            take: limit,
            orderBy: {
                id: 'desc', 
            }
        })

        const totalCount = await prisma.address.count()
        const totalPage = Math.ceil(totalCount/ limit)

        return {
            data: address,
            totalCount,
            totalPage,
            currentPage: page,
        }
    }

    async findBy(where: AddressWhereInput) {
        return await prisma.address.findFirst({where})
    }
}