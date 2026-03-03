import type { Pajamas, PajamaSize } from "@/@types/prisma/client.js"

export type PajamaWithSizes = Pajamas & { sizes: PajamaSize[] }

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
    sizes: {
        size: string
        stockQuantity: number
    }[]
}

export class PajamaPresenter {
    static toHTTP(pajama: PajamaWithSizes): HTTPPajama
    static toHTTP(pajamas: PajamaWithSizes[]): HTTPPajama[]
    static toHTTP(input: PajamaWithSizes | PajamaWithSizes[]): HTTPPajama | HTTPPajama[] {
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
            salePercent: input.salePercent,
            sizes: input.sizes.map(sizeItem => {
                return {
                    size: sizeItem.size,
                    stockQuantity: sizeItem.stockQuantity
                }
            })
        }
    }
}