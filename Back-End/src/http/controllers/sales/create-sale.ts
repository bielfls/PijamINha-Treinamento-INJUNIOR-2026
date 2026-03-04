import { SalePresenter } from "@/http/presenters/sales-presenter.js";
import { InsufficientStock } from "@/use-cases/errors/insufficient-stock-error.js";
import { ResourceNotFoundError } from "@/use-cases/errors/resourse-not-found-error.js";
import { makeCreateSaleUseCase } from "@/use-cases/factories/sale/make-create-sale.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function createSale(request: FastifyRequest, reply: FastifyReply){

    try{

        const { sub: userId } = request.user as { sub: string }

        const createSaleBodySchema = z.object({
            buyerName: z.string().min(1).max(100),
            cpf: z.string().length(11),
            paymentMethod: z.enum(["PIX", "CARD", "BOLETO"]),
            installments: z.coerce.number().default(1),
            cardNumber: z.string().min(13).max(19).optional(),
            address: z.object({
                zipCode: z.string().length(8),
                state: z.string().min(1),
                city: z.string().min(1),
                neighborhood: z.string().min(1),
                address: z.string().min(1),
                number: z.string().min(1)
            }),
            pajamasBuy: z.array(z.object({
                pajamasId: z.string().uuid(),
                size: z.enum(['PP', 'P', 'M', 'G', 'GG']),
                quantity: z.number().int().positive(),
            })).min(1)

        })

        const {
            buyerName,
            cpf,
            paymentMethod,
            installments,
            cardNumber,
            address: {
                zipCode,
                state,
                city,
                neighborhood,
                address,
                number  
            },
                pajamasBuy
            } = createSaleBodySchema.parse(request.body)

        const createSaleUseCase =  makeCreateSaleUseCase()

        const { sale } = await createSaleUseCase.execute({
            userId,
            buyerName,
            cpf,
            paymentMethod,
            installments,
            cardNumber,
            address: {
                zipCode,
                state,
                city,
                neighborhood,
                address,
                number},

            pajamasBuy})

            reply.status(201).send(SalePresenter.toHTTP(sale))

        }catch(error){
            if(error instanceof InsufficientStock){
                return reply.status(404).send({message: error.message})
            }

            if(error instanceof ResourceNotFoundError){
                return reply.status(404).send({message: error.message})
            }

            throw error
        }
}