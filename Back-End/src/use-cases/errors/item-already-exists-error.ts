export class ItemAlreadyExistsError extends Error {
  constructor() {
    super('O item já existe no sistema!')
  }
}