import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/home-service";
import type { PajamasState } from "../types/state";

export function useGetPromoProducts(): PajamasState {

    const { data, error, isError, isPending, isSuccess, refetch } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => productService.getPromoPajamas(3).then((res) => res.data)
    })


    return {
        data,
        error: error ?? undefined,
        isPending,
        isError,
        isSuccess,
        execute: () => refetch()
    }
}