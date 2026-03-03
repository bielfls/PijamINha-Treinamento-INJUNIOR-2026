import { ResourceNotFoundError } from "../errors/resourse-not-found-error.js"
import type { PajamasRepository } from "@/repositories/pajamas-repository.js"
import type { PajamaWithSizes } from "@/http/presenters/pajamas-presenter.js"


interface GetPajamaUseCaseRequest {
  publicId: string
}

type GetPajamaUseCaseResponse = {
    pajama: PajamaWithSizes
}

export class GetPajamaUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ publicId }: GetPajamaUseCaseRequest): Promise<GetPajamaUseCaseResponse> {
    const pajama = await this.pajamasRepository.findWithSizesById(publicId)

    if (!pajama) {
      throw new ResourceNotFoundError()
    }

    return { pajama }
  }
}