import { create } from "zustand";



interface RatingStore{
    rating: number;
    setRating: (rating:number) =>void;
    backRating: () => void;
}

export const useRatingStore = create<RatingStore>((set)=>({
    rating: 0,
    setRating: (rating) => set({ rating }),
    backRating:() => set({rating:0})
}))
