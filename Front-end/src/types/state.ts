import type { FeedbackRequest, FeedbackResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "./auth";

export interface ApiHookState<TPayload, TData>{
    data?:TData;
    error?: Error;
    isPending:boolean;
    isSuccess:boolean;
    isError:boolean;
    execute: (payload: TPayload) => void;
    reset?: ()=> void;
}
export type LoginState = ApiHookState<LoginRequest,LoginResponse>
export type RegisterState = ApiHookState<RegisterRequest, RegisterResponse>
export type FeedbackState = ApiHookState<FeedbackRequest, FeedbackResponse>
export type ProfileState = ApiHookState<void, User>

