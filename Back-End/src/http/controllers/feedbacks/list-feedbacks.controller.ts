import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeListFeedbacksUseCase } from "@/use-cases/factories/feedbacks/make-list-feedbacks.js"
import { FeedbackPresenter } from "@/http/presenters/feedbacks-presenter.js"

export async function listFeedbacks(request: FastifyRequest, reply: FastifyReply) {
    try {
        const listFeedbacksQuerySchema = z.object({
        min: z.coerce.number().optional()
    })

    const { min } = listFeedbacksQuerySchema.parse(request.query)

    const listFeedbacksUseCase = makeListFeedbacksUseCase()

    const { feedbacks } = await listFeedbacksUseCase.execute({ min })

    return reply.status(200).send(FeedbackPresenter.toHTTP(feedbacks))
    } catch (error) {
        throw new Error()
    }
}