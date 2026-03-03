import type { FastifyReply, FastifyRequest } from "fastify"
import { UserPresenter } from "@/http/presenters/users-presenter.js"
import { makeListAllUsersUseCase } from "@/use-cases/factories/users/make-list-users.js"

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
    try {
        const getAllUsersUseCase = makeListAllUsersUseCase()

        const { users } = await getAllUsersUseCase.execute()

        return reply.status(201).send(UserPresenter.toHTTP(users))
    } catch (error) {
        throw new Error()
    }
}