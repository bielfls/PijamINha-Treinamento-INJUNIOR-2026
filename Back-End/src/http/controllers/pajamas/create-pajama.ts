import type { FastifyReply, FastifyRequest } from "fastify"
import z from 'zod'

import { PajamaPresenter } from "@/http/presenters/pajamas-presenter.js"
import { makeCreatePajamaUseCase } from "@/use-cases/factories/pajamas/make-create-pajama.js"

export async function createPajama(request: FastifyRequest, reply: FastifyReply) {

        const createPajamaBodySchema = z.object({
            name: z.string().min(1).max(100),
            description: z.string().min(1),
            image: z.string(),
            price: z.number(),
            season: z.string(),
            type: z.string(),
            gender: z.string(),
            favorite: z.boolean(),
            onSale: z.boolean(),
            salePercent: z.number().nullable().optional()
        })

        const {name, description, image, price, season, type, gender, favorite, onSale, salePercent } = createPajamaBodySchema.parse(
            request.body,
        )

        const createPajamaUseCase = makeCreatePajamaUseCase()
        const { pajama } = await createPajamaUseCase.execute({
            name,
            description,
            image,
            price,
            season,
            type,
            gender,
            favorite,
            onSale,
            salePercent
        })

        return reply.status(201).send({pajama: PajamaPresenter.toHTTP(pajama)})
}