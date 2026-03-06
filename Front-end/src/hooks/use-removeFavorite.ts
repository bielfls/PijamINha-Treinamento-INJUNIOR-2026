    import { productService } from "../services/home-service";
    import { useMutation, useQueryClient } from "@tanstack/react-query";


    export function removePijama(){
        const queryClient = useQueryClient()
        const{mutate, isPending, isError} = useMutation({
            mutationFn: (({id,favorite}:{id: string, favorite: boolean}) => productService.toggleFavorite(id, favorite)),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["fav-pjs"]})
            }
        })

        return{removeFavPajama: mutate, isPending, isError}
    }