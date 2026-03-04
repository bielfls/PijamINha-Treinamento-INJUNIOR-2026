import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCreateFeedbackUseCase } from "@/use-cases/factories/feedbacks/make-create-feedback.js"
import { FeedbackPresenter } from "@/http/presenters/feedbacks-presenter.js"

export async function createFeedback(request: FastifyRequest, reply: FastifyReply) {
    try {
        const createFeedbackBodySchema = z.object({
        name: z.string().trim().min(1),
        description: z.string().trim().min(1),
        rating: z.number()
    })

    const { name, description, rating } = createFeedbackBodySchema.parse(request.body)

    const createFeedbackUseCase = makeCreateFeedbackUseCase()

    const { feedback } = await createFeedbackUseCase.execute({
        name,
        description,
        rating
    })

    return reply.status(201).send(FeedbackPresenter.toHTTP(feedback))
    } catch (error) {
        throw new Error()
    }
}