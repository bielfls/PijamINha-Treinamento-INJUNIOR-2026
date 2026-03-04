import type { SalesRepository, SaleWithRelation } from "@/repositories/sales-repository.js"

interface ListSaleUseCaseRequest{
    userId?: string
    page?: number
    limit?: number
}

interface ListSaleUseCaseResponse {
  sale: SaleWithRelation[]
  totalCount: number
  totalPage: number
  currentPage: number
}


export class ListSaleUseCase{
    constructor(private saleRespository: SalesRepository){}

    async execute({userId, page, limit}:ListSaleUseCaseRequest): Promise<ListSaleUseCaseResponse>{
        const { data: sale, totalCount, totalPage, currentPage} = await this.saleRespository.list({userId, page, limit})
        return { sale, totalCount, totalPage, currentPage }
    }
}