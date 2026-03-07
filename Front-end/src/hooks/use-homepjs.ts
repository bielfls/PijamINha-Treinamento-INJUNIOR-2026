import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/home-service";
import type { PajamasState } from "../types/state";
import { useMemo } from "react";

export function useGetPromoProducts(): PajamasState {
    const { data, error, isError, isPending, isSuccess, refetch } = useQuery({
        queryKey: ["promo-pjs"],
        queryFn: async () => {
            const res = await productService.getPromoPajamas(20);
            const allPjs = Array.isArray(res.data?.pajamas) ? res.data.pajamas : [];
            return allPjs
                .filter((p: any) => Number(p.salePercent) > 0)
                .slice(0, 3); 
        } 
    }); 

    return useMemo(() => ({
        data: data ?? [],
        error: error ?? undefined,
        isPending,
        isError,
        isSuccess,
        execute: () => refetch()
    }), [data, error, isError, isPending, isSuccess, refetch]);
}