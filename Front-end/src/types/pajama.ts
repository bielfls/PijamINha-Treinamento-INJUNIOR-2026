export interface Pajama{
    name: string,
    id:string,
    description: string,
    image: string,
    price: number,
    season: string,
    type: string,
    gender: string,
    favorite: boolean,
    onSale: boolean,
    salePercent: number,
}
export interface CartPajama extends Pajama{
    size:string;
    stock: number;
    quantity:number;
    pajamasId: number;
}
export interface PajamaStore {
    cart: CartPajama[];
    addToCart: (item: CartPajama) => void;
    removeFromCart: (id: string) => void; 
}