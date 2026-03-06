import { useQuery } from '@tanstack/react-query';
import { authService } from '../services/auth-service';
import type { FeedbackResponse } from '../types/auth';

export interface FeedbackState {
    data: FeedbackResponse[];
    error: any;
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    execute: () => void;
}

export function useGetFeedbacks(): FeedbackState {
    const { data, error, isError, isPending, isSuccess, refetch } = useQuery({
        queryKey: ["feedbacks-home"],
        queryFn: async () => {
            const res = await authService.getFeedbacks();
            return Array.isArray(res.data) ? res.data : [];
        }
    });

    return {
        data: data ?? [],
        error: error ?? undefined,
        isPending,
        isError,
        isSuccess,
        execute: () => { refetch() }
    };
}