import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserPresenter } from '@/http/presenters/users-presenter.js'
import { makeGetUserUseCase } from '@/use-cases/factories/users/make-get-user.js'

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string(),
        })

        const { publicId } = getParamsSchema.parse(request.params)

        const getUserUseCase = makeGetUserUseCase()
        const { user } = await getUserUseCase.execute({
            publicId,
        })
        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error) {
        throw new Error()
    }
}