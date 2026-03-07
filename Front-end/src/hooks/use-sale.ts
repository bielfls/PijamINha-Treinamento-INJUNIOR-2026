import { useMutation } from "@tanstack/react-query";
import type { SaleState } from "../types/state";
import type { SaleRequest, SaleResponse } from "../types/sale";
import { saleService } from "../services/sale-service";


export function useSale(callbacks?: { 
    onSuccess?: (data:SaleResponse) =>void 
    onError?: (error:Error) => void;

}): SaleState{

    
    const { data, error, isPending, isError, isSuccess, mutate, reset } = useMutation({
        mutationKey:["sale"],
        mutationFn: async(data:SaleRequest)=>
            saleService.makeSale(data).then((res) => res.data),
            onSuccess: callbacks?.onSuccess,
            onError: callbacks?.onError
    })

    return {
        data,
        error: error ?? undefined,
        isPending,
        isError,
        isSuccess,
        execute:mutate,
        reset,
    }
} 