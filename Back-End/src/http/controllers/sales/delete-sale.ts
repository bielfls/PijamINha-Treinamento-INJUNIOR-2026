import { ResourceNotFoundError } from "@/use-cases/errors/resourse-not-found-error.js"
import { makeDeleteSaleUseCase } from "@/use-cases/factories/sale/make-delete-sale.js"
import type { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"


export async function deleteSale(request: FastifyRequest, reply: FastifyReply){

    try{

        const deleteSaleParamsSchema = z.object({
            publicId: z.string()
        })
    
        const { publicId } = deleteSaleParamsSchema.parse(request.params)

        const deleteSaleUseCase = makeDeleteSaleUseCase()

        await deleteSaleUseCase.execute({
            publicId
        })

        reply.status(204).send()
    }catch(error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }

        throw error
    }
}