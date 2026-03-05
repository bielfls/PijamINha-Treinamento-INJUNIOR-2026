import type { AxiosInstance } from "axios";
import { useAuthStore } from "../stores/auth";

export function setupInterceptors(instance: AxiosInstance){

    instance.interceptors.request.use((config)=>{
        const token = useAuthStore.getState().token;

        if(token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    })

    instance.interceptors.response.use(
        (response)=> response,
        (error)=>{
        if(error.status === 401){
            useAuthStore.getState().setToken(undefined);
        }

        return Promise.reject((error));
    })
}