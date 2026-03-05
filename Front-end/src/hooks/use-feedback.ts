import { useMutation } from "@tanstack/react-query";
import type { FeedbackRequest, FeedbackResponse } from "../types/auth";
import type { FeedbackState } from "../types/state";
import { authService } from "../services/auth-service";

export function useGiveFeedback(callbakcs?: { 
    onSuccess?: (data:FeedbackResponse) =>void 
    onError?: (error:Error) => void;

}): FeedbackState{

    
    const { data, error, isPending, isError, isSuccess, mutate, reset } = useMutation({
        mutationKey:["feedback"],
        
        mutationFn: async(data:FeedbackRequest)=>
            
            authService.feedback(data).then((res) => res.data),
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