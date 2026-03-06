import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-error.js'
import { makeUpdatePajamaUseCase } from '@/use-cases/factories/pajamas/make-update-pajama.js'

export async function updatePajamaStock(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
      publicId: z.uuid()
  })

  const updatePajamaBodySchema = z.object({
      favorite: z.boolean().optional(),
      size: z.string().min(1).optional(),
      quantity: z.number().optional()
  })

  const { publicId } = updateParamsSchema.parse(request.params)
  const { favorite, size, quantity } = updatePajamaBodySchema.parse(request.body)

  try {
    const updatePajamaUseCase = makeUpdatePajamaUseCase()

    await updatePajamaUseCase.execute({
      pajamaId: publicId,
      favorite,
      size,
      quantity
    })

    return reply.status(204).send()

  } catch (error) {
      if(error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: error.message})
      }
          
      throw error
  }
}