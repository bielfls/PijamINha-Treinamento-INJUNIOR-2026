import {useMutation, useQueryClient} from "@tanstack/react-query"
import { productService } from "../services/home-service"
import { useAuthStore } from "../stores/auth"

export function useFavorite(){
    const queryClient = useQueryClient()
    const{mutate, isPending, isError} = useMutation({
        mutationFn: ({id, favorite}: {id: string, favorite: boolean}) => productService.toggleFavorite(id, favorite),
        onSuccess: () => {
            console.log("token:", useAuthStore.getState().token)
            queryClient.invalidateQueries({queryKey: ["fav-pjs"]})
        }
    })  

    return {
        toggleFavorite: mutate, isPending, isError
    }
}