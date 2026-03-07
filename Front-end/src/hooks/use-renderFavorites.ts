import { productService } from "../services/home-service";
import {useQuery} from "@tanstack/react-query"
import type { PajamasState } from "../types/state";


export function useRenderFavorites(): PajamasState {

    const { data, error, isError, isPending, isSuccess, refetch } = useQuery({
        queryKey: ["fav-pjs"],
        staleTime: 0,
        gcTime: 0,
        refetchOnWindowFocus: true,
        queryFn: async () => {
            console.log("buscando favoritos...")
            const res = await productService.getFavPajamas();
            console.log("favoritos response:", res.data)
            const pajamas = Array.isArray(res.data?.pajamas) ? res.data.pajamas : [];
            return pajamas.filter(item => item.favorite === true)

        }
    });

    return {
        data: data,
        error: error ?? undefined,
        isPending,
        isError,
        isSuccess,
        execute: () => refetch()
    }
}