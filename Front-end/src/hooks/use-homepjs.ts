import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/home-service";
import type { PajamasState } from "../types/state";

export function useGetPromoProducts(): PajamasState {

    const { data, error, isError, isPending, isSuccess, refetch } = useQuery({
        queryKey: ["promo-pjs"],
        queryFn: async () => {
            const res = await productService.getPromoPajamas(3);
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