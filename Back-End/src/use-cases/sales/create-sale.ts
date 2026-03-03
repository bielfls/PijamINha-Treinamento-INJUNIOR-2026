import type { PajamasRepository } from '@/repositories/pajamas-repository.js'
import type {
  SalesRepository,
  SaleWithRelation,
} from '@/repositories/sales-repository.js'

interface CreateSaleUseCaseRequest {
    buyerName: string
    cpf: string
    price: number
    paymentMethod: string
    installments: number
    cardNumber?: string
    address: {
        zipCode: string
        state: string
        city: string
        neighborhood: string
        address: string
        number: string
    }
    pajamasBuy: {
        pajamaId: string
        size: string
        count: number
    }[]

}

interface CreateSaleUseCaseResponse {
  sale: SaleWithRelation
}

export class CreateSaleUseCase {
  constructor(private saleRepository: SalesRepository, private pajamaRepository: PajamasRepository) {}

  async execute({
    buyerName,
    cpf,
    price,
    paymentMethod,
    installments,
    cardNumber,
    address: {
        zipCode,
        state,
        city,
        neighborhood,
        address,
        number}, 
        pajamasBuy}: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse> {

    const formatPajamas = pajamasBuy.map(async (pajama) => {
      const foundPajama = await this.pajamaRepository.findBy({})
    })

    const sale = await this.saleRepository.create({
        buyerName,
        cpf,
        price,
        paymentMethod,
        installments,
        cardNumber,
        address: {
          create: {
            zipCode,
            state,
            city,
            neighborhood,
            address,
            number
          }
        },
      pajamas: {
        createMany: {
          data: pajamasBuy.map( (pajama) =>({
            pajamasId
          })) 
        }
      }})

        return { sale }
}
}