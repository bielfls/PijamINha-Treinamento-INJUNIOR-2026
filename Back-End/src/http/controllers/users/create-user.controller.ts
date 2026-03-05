import z from "zod"
import type { FastifyReply, FastifyRequest } from "fastify"
import { UserPresenter } from "@/http/presenters/users-presenter.js"
import { makeCreateUserUseCase } from "@/use-cases/factories/users/make-create-user.js"
import { ItemAlreadyExistsError } from "@/use-cases/errors/item-already-exists-error.js"


export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
        const registerBodySchema = z.object({
            name: z.string().trim().min(1).max(32),
            username: z.string().trim().min(8).max(32),
            email: z.email().trim(),
            password: z.string().min(6).max(16),
        })

        const { name, username, email, password } = registerBodySchema.parse(request.body)

        const registerUserUseCase = makeCreateUserUseCase()

        const { user } = await registerUserUseCase.execute({
            name,
            username,
            email,
            password
        })

        return reply.status(201).send(UserPresenter.toHTTP(user))
    } catch (error) {
        if (error instanceof ItemAlreadyExistsError) {
            return reply.status(409).send({
                message: error.message
            })
        }
        throw error
    }
}