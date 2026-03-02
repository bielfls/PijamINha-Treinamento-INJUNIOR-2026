import type { Pajamas } from "@/@types/prisma/client.js"
import type { PajamasRepository } from "@/repositories/pajamas-repository.js"

interface CreatePajamaUseCaseRequest {
  name: string
  description: string
  image: string
  price: number
  season: string
  type: string
  gender: string
  favorite: boolean
  onSale: boolean
  salePercent?: number | null
}

type CreatePajamaUseCaseResponse = {
    pajama: Pajamas
}

export class CreatePajamaUseCase {
    constructor(
        private pajamasRepository: PajamasRepository,
    ) {}

    async execute({
        name,
        description,
        image,
        price,
        season,
        type,
        gender,
        favorite,
        onSale,
        salePercent
    }: CreatePajamaUseCaseRequest): Promise<CreatePajamaUseCaseResponse> {
        
        const pajama = await this.pajamasRepository.create({
            name,
            description,
            image,
            price,
            season,
            type,
            gender,
            favorite,
            onSale,
            salePercent
        })

        return { pajama }

    }
}