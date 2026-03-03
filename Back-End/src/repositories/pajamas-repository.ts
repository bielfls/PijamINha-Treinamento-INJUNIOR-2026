import type { Prisma, Pajamas } from "@/@types/prisma/client.js"
import type { PajamaWithSizes } from "@/http/presenters/pajamas-presenter.js"

export interface PajamasRepository {
    create(data: Prisma.PajamasCreateInput) : Promise<PajamaWithSizes>
    update(pajamaId: string, size: string, quantity: number): Promise<void>
    findById(publicId: string): Promise<Pajamas | null>
    findWithSizesById(publicId: string): Promise<PajamaWithSizes | null>
    delete(id: number): Promise<Pajamas>

}

