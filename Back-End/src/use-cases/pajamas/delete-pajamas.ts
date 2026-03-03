import type { PajamasRepository } from "@/repositories/pajamas-repository.js"
import { ResourceNotFoundError } from "../errors/resourse-not-found-error.js"
import type { Pajamas } from "@/@types/prisma/client.js"

interface DeletePajamaUseCaseRequest {
  publicId: string
}

type DeletePajamaUseCaseResponse = {
  pajama: Pajamas
}

export class DeletePajamaUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ publicId }: DeletePajamaUseCaseRequest): Promise<DeletePajamaUseCaseResponse> {
    const pajamaToDelete = await this.pajamasRepository.findById(publicId)

    if (!pajamaToDelete) {
      throw new ResourceNotFoundError()
    }

    const pajama = await this.pajamasRepository.delete(pajamaToDelete.id)
    return { pajama }
  }
}