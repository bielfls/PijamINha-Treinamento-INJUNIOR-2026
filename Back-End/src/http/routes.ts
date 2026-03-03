import { type FastifyInstance } from "fastify"
import { pajamasRoutes } from "./controllers/pajamas/pajamas.routes.js"
import { saleRoutes } from "./controllers/sales/sales.routes.js"

export async function appRoutes(app: FastifyInstance) {
    app.register(pajamasRoutes, { prefix: '/pajamas' })

    app.register(saleRoutes, {prefix: '/sales'})
}