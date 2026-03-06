export interface User {
    name: string;
    username: string;
    email: string;
    password: string;
}
export interface LoginRequest{
    email:string;
    password:string;
}
export interface LoginResponse {
    token:string;
    user:string
}
export interface RegisterRequest{
    name: string;
    username: string;
    email: string;
    password: string;
}
export interface RegisterResponse {
    token:string,
    user:User
}
export interface FeedbackRequest {
    name:string;
    description:string;
    rating:number;
}
export interface FeedbackResponse {
    name:string;
    description:string;
    rating:number;
}
