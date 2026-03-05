
import type { PajamasSizeRepository } from "../pajamas-size-repository.js";
import { prisma } from "@/libs/prisma.js";


export class PajamaSizePrismaRepository implements PajamasSizeRepository{

    async decrementStock(pajamaId: number,size: string, quantity: number){
        return await prisma.pajamaSize.update({
            where: {
                size_pajamaId: {size, pajamaId}
        },
            data: {stockQuantity: {
                decrement: quantity
            }}
        })
    }

    async findBy(pajamaId: number,size: string){
        return await prisma.pajamaSize.findUnique({
            where: {size_pajamaId: {size, pajamaId}}
        })
    }
}