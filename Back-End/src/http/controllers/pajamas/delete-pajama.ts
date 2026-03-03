import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-error.js'
import { makeDeletePajamaUseCase } from '@/use-cases/factories/pajamas/make-delete-pajama.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deletePajama(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
        publicId: z.uuid(),
    })

  const { publicId } = getParamsSchema.parse(request.params)

  try {
    const deletePajamaUseCase = makeDeletePajamaUseCase()

    await deletePajamaUseCase.execute({ publicId })

    return reply.status(204).send()

  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}