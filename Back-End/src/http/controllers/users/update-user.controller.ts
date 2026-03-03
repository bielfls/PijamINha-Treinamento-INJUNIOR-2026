import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeUpdateUserUseCase } from "@/use-cases/factories/users/make-update-user.js"
import { UserPresenter } from "@/http/presenters/users-presenter.js"

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const paramsSchema = z.object({
            publicId: z.string()
        })
        const { publicId } = paramsSchema.parse(request.params)
        const bodySchema = z.object({
            name: z.string().trim().min(1).max(32).optional(),
            username: z.string().trim().min(8).max(32).optional(),
            email: z.string().email().optional(),
            password: z.string().min(8).max(16).optional(),
        })
        const { name, username, email, password } = bodySchema.parse(request.body)
        const UpdateUserUseCase = makeUpdateUserUseCase()
        const { user } = await UpdateUserUseCase.execute({
            publicId,
            name,
            username,
            email,
            password
        })
        return reply.status(200).send(UserPresenter.toHTTP(user))
    } catch (error) {
        throw new Error()
    }
}