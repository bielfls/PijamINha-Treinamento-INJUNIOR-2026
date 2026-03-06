import type { FeedbackRequest, FeedbackResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "./auth";
import type { Pijama } from "./home";

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
export type GiveFeedbackState = ApiHookState<FeedbackRequest, FeedbackResponse>
export type FeedbackState = ApiHookState<void, FeedbackResponse>
export type ProfileState = ApiHookState<void, User>
export type PajamasState = ApiHookState<void, Pijama[]>
export type IdPajamaState = ApiHookState<string,Pijama>;
