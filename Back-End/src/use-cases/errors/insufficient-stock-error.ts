
export class InsufficientStock extends Error{
    constructor(){
        super('estoque insuficiente')
    }
}