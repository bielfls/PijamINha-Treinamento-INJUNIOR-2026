import { useMutation } from "@tanstack/react-query";
import type { LoginState } from "../types/state";
import type { LoginRequest, LoginResponse } from "../types/auth";
import { authService } from "../services/auth-service";
import { useAuthStore } from "../stores/auth";


export function useLogin(callbakcs?: { 
    onSuccess?: (data:LoginResponse) =>void 
    onError?: (error:Error) => void;

}): LoginState{
    const setToken = useAuthStore((state)=> state.setToken);
    
    const { data, error, isPending, isError, isSuccess, mutate, reset } = useMutation({
        mutationKey:["login"],
        
        mutationFn: async(data:LoginRequest)=>
            authService.login(data).then((res) => res.data),
        onSuccess: (data:LoginResponse) => {
            setToken(data.token);
            callbakcs?.onSuccess?.(data)
        },
        onError: (error: Error) => {
            callbakcs?.onError?.(error)
        }
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