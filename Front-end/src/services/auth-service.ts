import { httpAdapter } from "../lib/adapter";
import { apiRoutes } from "../lib/config";
import type {  FeedbackRequest, FeedbackResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from "../types/auth";
import type { HttpResponse } from "../types/http";
import { baseService } from "./base-service"

class AuthService extends baseService {

    public async login(data:LoginRequest):Promise<HttpResponse<LoginResponse>>{
        return this.execute<LoginRequest, LoginResponse>({
            data,
            method:"POST",
            url: apiRoutes.LOGIN
        })
    }
    public async register(data:RegisterRequest):Promise<HttpResponse<RegisterResponse>>{
        return this.execute<RegisterRequest, RegisterResponse>({
            data,
            method:"POST",
            url: apiRoutes.REGISTER
        })
    }
    public async me():Promise<HttpResponse<User>>{
        return this.execute<void, User>({
            method:"GET",
            url: apiRoutes.ME
        })
    }
    public async feedback(data:FeedbackRequest):Promise<HttpResponse<FeedbackResponse>>{
        return this.execute<FeedbackRequest, FeedbackResponse>({
            data,
            method:"POST",
            url: apiRoutes.FEEDBACK
        })
    }
    public async getFeedbacks():Promise<HttpResponse<FeedbackResponse[]>>{
        return this.execute<void, FeedbackResponse[]>({
            method:"GET",
            url: apiRoutes.FEEDBACK,
            params:{
                min:"4"
            }
        })
    }
}
export const authService = new AuthService(httpAdapter);