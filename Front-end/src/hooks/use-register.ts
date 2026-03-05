import { useMutation } from "@tanstack/react-query";
import type {  RegisterState } from "../types/state";
import type {  RegisterRequest, RegisterResponse } from "../types/auth";
import { authService } from "../services/auth-service";


export function useRegister(callbakcs?: { 
    onSuccess?: (data:RegisterResponse) =>void 
    onError?: (error:Error) => void;

}): RegisterState{

    
    const { data, error, isPending, isError, isSuccess, mutate, reset } = useMutation({
        mutationKey:["register"],
        
        mutationFn: async(data:RegisterRequest)=>
            
            authService.register(data).then((res) => res.data),
            onSuccess: callbakcs?.onSuccess,
            onError:  callbakcs?.onError
    
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