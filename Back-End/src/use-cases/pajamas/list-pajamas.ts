import type { PajamaWithSizes } from '@/http/presenters/pajamas-presenter.js'
import type { PajamasRepository } from '@/repositories/pajamas-repository.js'

interface ListPajamasUseCaseRequest {
  name?: string
  season?: string 
  type?: string
  gender?: string
  page: number
  limit: number
}

interface ListPajamasUseCaseResponse {
  pajamas: PajamaWithSizes[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export class ListPajamasUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({
    name,
    season,
    type,
    gender,
    page,
    limit,
  }: ListPajamasUseCaseRequest): Promise<ListPajamasUseCaseResponse> {
    const {
      data: pajamas,
      totalCount,
      totalPages,
      currentPage,
    } = await this.pajamasRepository.listWithSizes({ name, season, type, gender, page, limit })

    return {
      pajamas,
      totalCount,
      totalPages,
      currentPage,
    }
  }
}