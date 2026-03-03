import { verifyJwt } from "@/http/middlewares/verify-jwt.js"
import type { FastifyInstance } from "fastify"
import { createUser } from "./create-user.controller.js"
import { authenticate } from "./authenticate.controller.js"
import { updateUser } from "./update-user.controller.js"
import { deleteUser } from "./delete-user.controller.js"
import { getUser } from "./get-user.controller.js"
import { listUsers } from "./list-users.controller.js"


export async function userRoutes(app: FastifyInstance) {
    app.post('/', createUser)
    app.post('/authenticate', authenticate)
    app.get('/:publicId', getUser)
    app.get('/', listUsers)
    app.delete('/:publicId', {onRequest: [verifyJwt]}, deleteUser)
    app.patch('/:publicId', {onRequest: [verifyJwt]}, updateUser)
}