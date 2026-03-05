import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth-service";
import type { ProfileState } from "../types/state";

export function useProfile():ProfileState{
   
    const { data, error, isError, isPending, isSuccess, refetch } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => authService.me().then((res) => res.data)
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