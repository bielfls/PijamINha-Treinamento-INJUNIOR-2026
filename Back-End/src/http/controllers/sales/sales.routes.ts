import type { FastifyInstance } from "fastify";
import { createSale } from "./create-sale.js";


export async function saleRoutes(app: FastifyInstance) {
    app.post('/', createSale)
}