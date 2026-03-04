import type { Prisma } from "@/@types/prisma/client.js";
import type { SalesRepository } from "../sales-repository.js";
import { prisma } from "@/libs/prisma.js";


export class SalesPrismaRepository implements SalesRepository{

    async create(data: Prisma.SaleCreateInput){

        return await prisma.sale.create({
            data,
            include:{
                address: true
            }
        })
    }

    async findBy(where: Prisma.SaleWhereInput){
        return await prisma.sale.findFirst({
            where,
            include: {
                address: true
            }
        })
    }

    async delete(id: number){
        await prisma.sale.delete({where: {id}})
    }
}