
import type { PajamasRepository } from "@/repositories/pajamas-repository.js"
import { ResourceNotFoundError } from "../errors/resourse-not-found-error.js"
import type { PajamaWithSizes } from "@/http/presenters/pajamas-presenter.js"


interface UpdatePajamaUseCaseRequest {
  pajamaId: string
  favorite?: boolean
  size?: string
  quantity?: number
}

type UpdatePajamaUseCaseResponse = {
    pajamas: PajamaWithSizes
}

export class UpdatePajamaUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ pajamaId, favorite, size, quantity }: UpdatePajamaUseCaseRequest):Promise<UpdatePajamaUseCaseResponse> {
    const pajama = await this.pajamasRepository.findById(pajamaId)

    if (!pajama) {
        throw new ResourceNotFoundError()
    }

    const pajamas = await this.pajamasRepository.update(pajamaId, favorite, size, quantity)

    return { pajamas }
  }
}