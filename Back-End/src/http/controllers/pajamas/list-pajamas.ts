import { PajamaPresenter } from '@/http/presenters/pajamas-presenter.js'
import { makeListPajamasUseCase } from '@/use-cases/factories/pajamas/make-list-pajamas.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listPajamas(request: FastifyRequest, reply: FastifyReply) {
    const listPajamasSchema = z.object({
        name: z.string().optional(),
        season: z.string().optional(),
        type: z.string().optional(),
        gender: z.string().optional(),
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().default(5),
    })
  
    const { name, season, type, gender, page, limit } = listPajamasSchema.parse(request.query)

    const listPajamasUseCase = makeListPajamasUseCase()

    const { pajamas, totalCount, totalPages, currentPage } =
        await listPajamasUseCase.execute({
            name,
            season,
            type,
            gender,
            page,
            limit,
        })

    return reply.status(200).send({
        pajamas: PajamaPresenter.toHTTP(pajamas),
        totalCount,
        totalPages,
        currentPage,
    })
}