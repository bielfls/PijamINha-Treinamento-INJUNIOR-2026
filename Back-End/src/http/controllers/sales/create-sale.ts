import { makeCreateSaleUseCase } from "@/use-cases/factories/sale/make-create-sale.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function createSale(request: FastifyRequest, reply: FastifyReply){

    try{

        const createSaleBodySchema = z.object({
            buyerName: z.string().min(1).max(100),
            cpf: z.string().length(11),
            price: z.coerce.number(),
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
                pajamaId: z.string().uuid(),
                size: z.string(),
                count: z.int().positive(),
            })).min(1)

        })

        const {
            buyerName,
            cpf,
            price,
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
            buyerName,
            cpf,
            price,
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

            reply.status(201).send(sale)
        }catch(error){
            console.error("ERRO NO PRISMA:", error); // Adicione isso!
            //eturn reply.status(500).send({ message: error.message });
        }
}