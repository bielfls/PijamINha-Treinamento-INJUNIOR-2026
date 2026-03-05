import type { PajamasRepository } from '@/repositories/pajamas-repository.js'
import type {
  SalesRepository,
  SaleWithRelation,
} from '@/repositories/sales-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-error.js'
import type { PajamasSizeRepository } from '@/repositories/pajamas-size-repository.js'
import { InsufficientStock } from '../errors/insufficient-stock-error.js'
import type { UsersRepository } from '@/repositories/users-repository.js'

interface CreateSaleUseCaseRequest {
  userId: string
  buyerName: string
  cpf: string
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
    pajamasId: string
    size: string
    quantity: number
  }[]
}

interface CreateSaleUseCaseResponse {
  sale: SaleWithRelation
}

export class CreateSaleUseCase {
    constructor(
      private saleRepository: SalesRepository,
      private pajamaRepository: PajamasRepository,
      private pajamaSizeRepository: PajamasSizeRepository,
      private usersRepository: UsersRepository
    ) {}

    async execute({
      userId,
      buyerName,
      cpf,
      paymentMethod,
      installments,
      cardNumber,
      address: { zipCode, state, city, neighborhood, address, number },
      pajamasBuy,
    }: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse> {

      const user = await this.usersRepository.getUser({publicId: userId})

      if(!user){
          throw new ResourceNotFoundError()
      }

      const formatPajamas = await Promise.all(
        pajamasBuy.map(async (pajama) => {
          const foundPajama = await this.pajamaRepository.findById(
            pajama.pajamasId,
          )

          if (!foundPajama) {
            throw new ResourceNotFoundError()
          }

          const pajamaSize = await this.pajamaSizeRepository.findBy(
            foundPajama.id,
            pajama.size,
          )

          if (!pajamaSize) {
            throw new ResourceNotFoundError()
          }

          if (pajamaSize.stockQuantity < pajama.quantity) {
            throw new InsufficientStock()
          }

          await this.pajamaSizeRepository.decrementStock(
            foundPajama.id,
            pajama.size,
            pajama.quantity,
          )

          return {
            pajamasId: foundPajama.id,
            price: (foundPajama.price * pajama.quantity),
            quantity: pajama.quantity,
          }
        }),
      )

      const totalPrice = formatPajamas.reduce((sum, pajama) => sum + (pajama.price), 0)

      const sale = await this.saleRepository.create({
        user: {
          connect: {
            id: user.id
          }
        },
        buyerName,
        cpf,
        price: totalPrice,
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
            number,
          },
        },
        pajamas: {
          createMany: {
            data: formatPajamas,
          },
        },
      })

      return { sale }
    }
  }
