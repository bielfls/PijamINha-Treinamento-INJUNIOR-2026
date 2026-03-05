export class InvalidCredentialsError extends Error {
  constructor() {
    super('Login ou senha incorretos.')
  }
}