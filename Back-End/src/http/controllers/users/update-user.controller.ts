import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeUpdateUserUseCase } from "@/use-cases/factories/users/make-update-user.js"
import { UserPresenter } from "@/http/presenters/users-presenter.js"
import { ResourceNotFoundError } from "@/use-cases/errors/resourse-not-found-error.js"
import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists-error.js"

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
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: error.message
            })
        }
        if (error instanceof ItemAlreadyExistsError) {
            return reply.status(409).send({
                message: error.message
            })
        }
        throw new Error()
    }
}