import fastify from "fastify"
import { appRoutes } from "./http/routes.js"
import fastifyJwt from '@fastify/jwt'
import { env } from "./env/index.js"
import cors from '@fastify/cors'
import z, { ZodError } from "zod"

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.register(cors, {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"]
})

app.register(appRoutes)


app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Dados de registro inválidos!',
      details: z.treeifyError(error),
    })
  }

  if (error instanceof SyntaxError) {
    return reply.status(400).send({
      message:
        'O corpo da requisição não está em formato JSON válido. Verifique a estrutura dos dados enviados.',
    })
  }

  return reply.status(500).send({ message: 'Erro interno do servidor!' })
})