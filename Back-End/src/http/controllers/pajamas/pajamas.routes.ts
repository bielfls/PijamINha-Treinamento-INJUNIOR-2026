import type { FastifyInstance } from "fastify";
import { createPajama } from "./create-pajama.js";
import { updatePajamaStock } from "./update-pajama.js";
import { deletePajama } from "./delete-pajama.js";
import { getPajamaById } from "./get-pajama.js";

export async function pajamasRoutes(app: FastifyInstance) {
    app.post('/', createPajama)
    app.put('/:publicId', updatePajamaStock)
    app.delete('/:publicId', deletePajama)
    app.get('/:publicId', getPajamaById)
}