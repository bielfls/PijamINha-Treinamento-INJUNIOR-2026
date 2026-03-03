import type { Prisma, Pajamas } from "@/@types/prisma/client.js"

export interface PajamasRepository {
    create(data: Prisma.PajamasCreateInput) : Promise<Pajamas>
    update(pajamaId: string, size: string, quantity: number): Promise<void>
    findById(publicId: string): Promise<Pajamas | null>
    delete(id: number): Promise<Pajamas>
}

