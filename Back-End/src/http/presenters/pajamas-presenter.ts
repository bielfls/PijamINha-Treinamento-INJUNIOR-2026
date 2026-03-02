import type { Pajamas } from "@/@types/prisma/client.js"

type HTTPPajama = {
    id: string
    name: string
    description: string
    image: string
    price: number
    season: string
    type: string
    gender: string
    favorite: boolean
    onSale: boolean
    salePercent: number | null
}

export class PajamaPresenter {
    static toHTTP(pajama: Pajamas): HTTPPajama
    static toHTTP(pajamas: Pajamas[]): HTTPPajama[]
    static toHTTP(input: Pajamas | Pajamas[]): HTTPPajama | HTTPPajama[] {
        if (Array.isArray(input)) {
            return input.map((p) => this.toHTTP(p))
        }
        
        return {
            id: input.publicId,
            name: input.name,
            description: input.description,
            image: input.image,
            price: input.price,
            season: input.season,
            type: input.type,
            gender: input.gender,
            favorite: input.favorite,
            onSale: input.onSale,
            salePercent: input.salePercent
        }
    }
}