import type { FastifyInstance } from "fastify";
import { createPajama } from "./create-pajama.js";

export async function pajamasRoutes(app: FastifyInstance) {
    app.post('/', createPajama)
}