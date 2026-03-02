import { type FastifyInstance } from "fastify"
import { pajamasRoutes } from "./controllers/pajamas/pajamas.routes.js"

export async function appRoutes(app: FastifyInstance) {
    app.register(pajamasRoutes, { prefix: '/pajamas' })
}