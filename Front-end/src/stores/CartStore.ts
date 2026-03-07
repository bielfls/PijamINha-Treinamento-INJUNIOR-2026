import { create } from "zustand"
import type { PajamaStore } from "../types/pajama";

const usePajamaStore = create<PajamaStore>((set) => ( 
    {
        cart: [],
        addToCart:(item) => set((state)=> ({ cart:[...state.cart,item]})),
        removeFromCart:(id) => set((state) => {
            const itemIndex = state.cart.findIndex((item) => item.pajama.id === id);
            return{
                cart: state.cart.filter((item,index)=> index !== itemIndex)
            };
        })
    }
))


export default usePajamaStore;