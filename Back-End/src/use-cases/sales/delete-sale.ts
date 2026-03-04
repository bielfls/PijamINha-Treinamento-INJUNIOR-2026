import type { SalesRepository } from "@/repositories/sales-repository.js"
import { ResourceNotFoundError } from "../errors/resourse-not-found-error.js"

interface DeleteSaleUseCaseRequest {
  publicId: string
}


export class DeleteSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({ publicId }: DeleteSaleUseCaseRequest): Promise<void> {
    
    const SaleToDelete = await this.salesRepository.findBy({publicId})

    if (!SaleToDelete) {
      throw new ResourceNotFoundError()
    }

    await this.salesRepository.delete(SaleToDelete.id)
  }
}