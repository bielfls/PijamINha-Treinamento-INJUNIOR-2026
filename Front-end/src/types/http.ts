import { boolean } from "zod";

export interface HttpRequest<TData>{
    data?: TData;
    method:"GET" | "POST" | "PATCH" | "DELETE" | "PUT"
    url: string;
    headers?: Record<string,string>;
    params?: Record<string,string | boolean | number | null>;
}

export interface HttpResponse<TData>{
    data:TData;
    status: number;
    headers?: Record<string,string>;
    raw?: unknown;
}

export interface HttpAdapter{
    request<TRequest, TResponse>(
        config: HttpRequest<TRequest>
    ): Promise<HttpResponse<TResponse>>

    getError(error:unknown): Error
}