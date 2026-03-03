declare module '@fastifyJwt' {
    interface FastifyJWT {
        payload: {sub: string}
        user: {sub: string}
    }
}