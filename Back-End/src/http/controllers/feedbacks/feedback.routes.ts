import { verifyJwt } from "@/http/middlewares/verify-jwt.js"
import type { FastifyInstance } from "fastify"
import { createFeedback } from "./create-feedback.controller.js"
import { getFeedback } from "./get-feedback.controller.js"
import { listFeedbacks } from "./list-feedbacks.controller.js"
import { deleteFeedback } from "./delete-feedback.controller.js"

export async function feedbackRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: [verifyJwt]}, createFeedback)
    app.get('/:publicId', getFeedback)
    app.get('/', listFeedbacks)
    app.delete('/:publicId', {onRequest: [verifyJwt]}, deleteFeedback)
}