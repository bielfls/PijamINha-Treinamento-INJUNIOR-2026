import {useQuery} from "@tanstack/react-query"
import { productService} from "../services/home-service"
import type { PajamasState } from "../types/state"



export function useCatalog(gender?: string, type?: string, season?: string, name?: string): PajamasState{

        const {data, error, isError, isPending, isSuccess,refetch} = useQuery({
            queryKey: ["catalog", gender, type, season, name],
            queryFn: async () => 
                productService
                    .getPajamas(12,gender,type,season,name)
                    .then( (res) => {
                        const pajamas = ((res.data as any).pajamas)
                        console.log("pajamas: ", pajamas)
                        return pajamas
                        })

        })

        return{
            data: data,
            error: error ?? undefined,
            isPending: isPending,
            isError: isError,
            isSuccess: isSuccess,
            execute: () => refetch()
        }
}