import type { SaleWithRelation } from "@/repositories/sales-repository.js"


type HTTPSale = {
    id: string
    buyerName: string
    cpf: string
    price: number
    paymentMethod: string
    installments: number
    address:{
        zipCode: string
        state: string
        city: string
        neighborhood: string
        address: string
        number: string
    }
}

export class SalePresenter {
    static toHTTP(Sale: SaleWithRelation): HTTPSale
    static toHTTP(Sales: SaleWithRelation[]): HTTPSale[]
    static toHTTP(input: SaleWithRelation | SaleWithRelation[]): HTTPSale | HTTPSale[] {
        if (Array.isArray(input)) {
            return input.map((p) => this.toHTTP(p))
        }
        
        return {
            id: input.publicId,
            buyerName: input.buyerName,
            cpf: input.cpf,
            price: input.price,
            paymentMethod: input.paymentMethod,
            installments: input.installments,
            address: {
                zipCode: input.address.zipCode,
                state: input.address.state,
                city: input.address.city,
                neighborhood: input.address.neighborhood,
                address: input.address.address,
                number: input.address.number
            }
            }
        }
    }
