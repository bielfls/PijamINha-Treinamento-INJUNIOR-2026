import type { PajamaSize} from "@/@types/prisma/client.js";


export interface PajamasSizeRepository{
    decrementStock(pajamaId: number, size: string, quantity: number): Promise<PajamaSize>
    findBy(pajamId: number, size: string):Promise<PajamaSize | null>
}