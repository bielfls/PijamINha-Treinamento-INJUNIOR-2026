import { productService } from "../services/home-service";
import {useQuery} from "@tanstack/react-query"
import type { PajamasState } from "../types/state";


export function useRenderFavorites(): PajamasState {

    const { data, error, isError, isPending, isSuccess, refetch } = useQuery({
        queryKey: ["fav-pjs"],
        queryFn: async () => {
            const res = await productService.getFavPajamas();
            return Array.isArray(res.data?.pajamas) ? res.data.pajamas : [];
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