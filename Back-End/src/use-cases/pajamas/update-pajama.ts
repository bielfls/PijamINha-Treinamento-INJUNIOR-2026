
import type { PajamasRepository } from "@/repositories/pajamas-repository.js"
import { ResourceNotFoundError } from "../errors/resourse-not-found-error.js"


interface UpdatePajamaUseCaseRequest {
  pajamaId: string
  favorite?: boolean
  size?: string
  quantity?: number
}

export class UpdatePajamaUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ pajamaId, favorite, size, quantity }: UpdatePajamaUseCaseRequest) {
    const pajama = await this.pajamasRepository.findById(pajamaId)

    if (!pajama) {
        throw new ResourceNotFoundError()
    }

    await this.pajamasRepository.update(pajamaId, favorite, size, quantity)
  }
}