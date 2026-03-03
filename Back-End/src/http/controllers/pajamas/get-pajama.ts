import { PajamaPresenter } from '@/http/presenters/pajamas-presenter.js'
import { makeGetPajamaUseCase } from '@/use-cases/factories/pajamas/make-get-pajama.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getPajamaById(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
        publicId: z.uuid(),
    })

  const { publicId } = getParamsSchema.parse(request.params)

  try {
    const getPajamaUseCase = makeGetPajamaUseCase()

    const { pajama } = await getPajamaUseCase.execute({ publicId })

    return reply.status(200).send({pajama: PajamaPresenter.toHTTP(pajama)})

  } catch (error: any) {
    return reply.status(404).send({ message: error.message })
  }
}