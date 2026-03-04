
import type { SalesRepository, SaleWithRelation } from "@/repositories/sales-repository.js"
import { ResourceNotFoundError } from "../errors/resourse-not-found-error.js"

interface GetSaleUseCaseRequest{
    publicId: string
}

type GetSaleUseCaseResponse = {
    sale: SaleWithRelation
}

export class GetSaleUseCase{
    constructor( private salesRepository: SalesRepository){}

    async execute({
        publicId,
    }: GetSaleUseCaseRequest): Promise <GetSaleUseCaseResponse>{

        const sale = await this.salesRepository.findBy({publicId})

        if(!sale){
            throw new ResourceNotFoundError()
        }

        return { sale }
    }
}