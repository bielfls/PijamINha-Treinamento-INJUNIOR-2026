import { useQuery } from "@tanstack/react-query";
import type { IdPajamaState } from "../types/state";
import { productService } from "../services/home-service";


export function useIdPajama(id: string): IdPajamaState {
    const { data,error,isPending,isSuccess,isError,refetch} = useQuery({
        queryKey:["pajama-id", id],
        
        queryFn: async () => {
            const res = await productService.getPajamaById(id);
            return res.data.pajama;
        }
    });
    
    
    return (
        {
            data: data,
            error: error ?? undefined,
            isPending,
            isError,
            isSuccess,
            execute:() => refetch()
        }

    )
}