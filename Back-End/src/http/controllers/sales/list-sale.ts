import { SalePresenter } from "@/http/presenters/sales-presenter.js"
import { makeListSaleUseCase } from "@/use-cases/factories/sale/make-list-sale.js"
import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"

export async function listSale(request: FastifyRequest, reply: FastifyReply){
    
    try{
        const listSaleQuerySchema = z.object({
            userId: z.string().uuid().optional(),
            page: z.coerce.number().default(1),
            limit: z.coerce.number().default(5)
        })

        const { userId, page, limit } = listSaleQuerySchema.parse(request.query)

        
        const listSaleUseCase = makeListSaleUseCase()
        const { sale , totalCount , totalPage, currentPage } = await listSaleUseCase.execute({userId, page, limit})

        reply.status(200).send({
            sale: SalePresenter.toHTTP(sale),
            totalCount,
            totalPage,
            currentPage,
        })

    }catch(error){
        throw new Error()
    }
}