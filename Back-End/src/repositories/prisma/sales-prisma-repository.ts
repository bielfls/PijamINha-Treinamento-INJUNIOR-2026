import type { Prisma } from "@/@types/prisma/client.js";
import type { SalesRepository } from "../sales-repository.js";
import { prisma } from "@/libs/prisma.js";


export class SalesPrismaRepository implements SalesRepository{

    async create(data: Prisma.SaleCreateInput){

        const {address, pajamas, ...saleData } = data;

        return await prisma.sale.create({
            data: {
                ...saleData,
                address: {
                    create: address as any
                },
                pajamas: {
                    create: pajamas.map((pajama) =>({
                        
                    }))
                }
            },
            include: {
                address: true,
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