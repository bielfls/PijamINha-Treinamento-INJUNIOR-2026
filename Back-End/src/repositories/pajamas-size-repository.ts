import type { PajamaSize, Prisma } from "@/@types/prisma/client.js";


export interface PajamasSizeRepository{
    update(pajamaId: number, data: Prisma.PajamaSizeUpdateInput): Promise<PajamaSize>
    decrementStock(pajamaId: number, size: string, quantity: number): Promise<PajamaSize>
    findBy(pajamId: number, size: string):Promise<PajamaSize | null>
}