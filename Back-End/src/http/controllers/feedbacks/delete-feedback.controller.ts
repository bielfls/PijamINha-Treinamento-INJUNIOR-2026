import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeDeleteFeedbackUseCase } from "@/use-cases/factories/feedbacks/make-delete-feedback.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resourse-not-found-error.js"

export async function deleteFeedback(request: FastifyRequest, reply: FastifyReply) {
    try {
        const deleteFeedbackParamsSchema = z.object({
            publicId: z.string(),
        })
        const { publicId } = deleteFeedbackParamsSchema.parse(request.params)

        const deleteFeedbackUseCase = makeDeleteFeedbackUseCase()

        await deleteFeedbackUseCase.execute({ publicId })

        return reply.status(204).send()
    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        throw new Error()
    }
}