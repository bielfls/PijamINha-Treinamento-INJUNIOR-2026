export class InvalidRatingError extends Error {
  constructor() {
    super('Nota inválida! (Apenas notas entre 0 e 5)')
  }
}