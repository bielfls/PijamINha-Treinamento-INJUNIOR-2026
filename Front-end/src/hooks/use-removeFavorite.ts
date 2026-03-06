import { productService } from "../services/home-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function removePijama(){
    const queryClient = useQueryClient()
    const{mutate, isPending, isError} = useMutation({
        mutationFn: ((id: string) => productService.removeFavPajamas(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["fav-pjs"]})
        }
    })

    return{removeFavPajama: mutate, isPending, isError}
}