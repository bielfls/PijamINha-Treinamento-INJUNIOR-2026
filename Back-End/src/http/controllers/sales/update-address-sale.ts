import { SalePresenter } from "@/http/presenters/sales-presenter.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resourse-not-found-error.js";
import { makeUpdateAddressUseCase } from "@/use-cases/factories/sale/make-update-address-sale.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function updateAddress(request: FastifyRequest, reply: FastifyReply){

    try{

        const { sub: userId } = request.user as { sub: string }

        const updateAddressParamsSchema = z.object({
            publicId: z.string().uuid()
        })

        const { publicId } = updateAddressParamsSchema.parse(request.params)

        const updateAddressBodySchema = z.object({
            address: z.object({
                zipCode: z.string().min(8).optional(),
                state: z.string().min(1).optional(),
                city: z.string().min(1).optional(),
                neighborhood: z.string().min(1).optional(),
                address: z.string().min(1).optional(),
                number: z.string().min(1).optional()
            })
        })

        const { address: {zipCode, state, city, neighborhood, address, number }} = updateAddressBodySchema.parse(request.body)

        const updateAddressUseCase = makeUpdateAddressUseCase()

        const {sale} = await updateAddressUseCase.execute({
            userId,
            publicId,
            address: {
                zipCode,
                state,
                city,
                neighborhood,
                address,
                number}
        })

        reply.status(200).send(SalePresenter.toHTTP(sale))
    }catch(error){
        if(error instanceof ResourceNotFoundError){
            return reply.status(404).send({message: error.message})
        }
        /*if(error instanceof CrendentialInvalid){
            return reply.status(401).send({message: error.message})
        }*/
       throw error
    }
}