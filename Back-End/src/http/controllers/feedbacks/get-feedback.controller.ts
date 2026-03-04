import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeGetFeedbackUseCase } from '@/use-cases/factories/feedbacks/make-get-feedback.js'
import { FeedbackPresenter } from '@/http/presenters/feedbacks-presenter.js'

export async function getFeedback(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getParamsSchema = z.object({
            publicId: z.string(),
        })

        const { publicId } = getParamsSchema.parse(request.params)

        const getFeedbackUseCase = makeGetFeedbackUseCase()
        const { feedback } = await getFeedbackUseCase.execute({
            publicId,
        })
        return reply.status(200).send(FeedbackPresenter.toHTTP(feedback))
    } catch (error) {
        throw new Error()
    }
}