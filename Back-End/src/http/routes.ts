import { type FastifyInstance } from "fastify"
import { pajamasRoutes } from "./controllers/pajamas/pajamas.routes.js"
import { saleRoutes } from "./controllers/sales/sales.routes.js"
import { userRoutes } from "./controllers/users/users.routes.js"
import { feedbackRoutes } from "./controllers/feedbacks/feedback.routes.js"

export async function appRoutes(app: FastifyInstance) {
    app.register(pajamasRoutes, { prefix: '/pajamas' })

    app.register(saleRoutes, {prefix: '/sales'})

    app.register(userRoutes, {prefix: '/users'})

    app.register(feedbackRoutes, {prefix: '/feedbacks'})
}