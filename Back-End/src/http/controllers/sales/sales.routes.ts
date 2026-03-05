import type { FastifyInstance } from "fastify";
import { createSale } from "./create-sale.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { listSale } from "./list-sale.js";
import { getSale } from "./get-sale.js";
import { deleteSale } from "./delete-sale.js";
import { updateAddress } from "./update-address-sale.js";


export async function saleRoutes(app: FastifyInstance) {
    app.post('/',{onRequest: [verifyJwt]}, createSale)

    app.get('/', listSale)

    app.get('/:publicId', getSale)

    app.delete('/:publicId', deleteSale) //aqui deveria estar autenticado pra admin

    app.patch('/:publicId',{onRequest: [verifyJwt]}, updateAddress)
}