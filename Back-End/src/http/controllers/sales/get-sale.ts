import { SalePresenter } from "@/http/presenters/sales-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resourse-not-found-error.js"
import { makeGetSaleUseCase } from "@/use-cases/factories/sale/make-get-sale.js"
import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"


export async function getSale(request: FastifyRequest, reply: FastifyReply){

    try{
        const getSaleParamsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = getSaleParamsSchema.parse(request.params)

        const getSaleUseCase = makeGetSaleUseCase()

        const { sale } = await getSaleUseCase.execute({publicId})

        reply.status(200).send(SalePresenter.toHTTP(sale))
        
    }catch(error){
        if(error instanceof ResourceNotFoundError){
            return reply.send(404).send({message: error.message})
        }

        throw error
    }
}