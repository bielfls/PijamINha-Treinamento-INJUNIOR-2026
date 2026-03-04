import type { PajamasRepository } from '@/repositories/pajamas-repository.js'
import type {
  SalesRepository,
  SaleWithRelation,
} from '@/repositories/sales-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-error.js'
import type { PajamasSizeRepository } from '@/repositories/pajamas-size-repository.js'
import { InsufficientStock } from '../errors/insufficient-stock-error.js'

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
  constructor(private saleRepository: SalesRepository, private pajamaRepository: PajamasRepository,
    private pajamaSizeRepository: PajamasSizeRepository
  ) {}

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

    const formatPajamas = await Promise.all(pajamasBuy.map(async (pajama) => {

      const foundPajama = await this.pajamaRepository.findById(pajama.pajamaId)

      if(!foundPajama){
        throw new ResourceNotFoundError()
      }

      const pajamaSize = await this.pajamaSizeRepository.findBy(foundPajama.id,pajama.size,)

      if(!pajamaSize){
        throw new ResourceNotFoundError()
      }

      if(!(pajamaSize.stockQuantity < pajama.count)){
        throw new InsufficientStock()
      }

      await this.pajamaSizeRepository.decrementStock(foundPajama.id,pajama.size, pajama.count)
      
      return {
        pajamasId: foundPajama.id,
        price: foundPajama.price,
        quantity: pajama.count,
      }
    }))

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
          data: formatPajamas
      }}})


        return { sale }
}
}