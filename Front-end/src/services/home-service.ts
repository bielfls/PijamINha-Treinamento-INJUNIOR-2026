import { baseService } from "./base-service";
import type { HttpResponse } from "../types/http";
import type { GetPajamasResponse } from "../types/home";
import { httpAdapter } from "../lib/adapter";
import { apiRoutes } from "../lib/config";

console.log("TESTE DE CONEXÃO NO ENV ->", import.meta.env.VITE_API_URL);

class ProductService extends baseService {
    public async getPajamas(): Promise<HttpResponse<GetPajamasResponse>> {
        console.log("CHAMANDO API EM ->", import.meta.env.VITE_API_URL);
        
        return this.execute<void, GetPajamasResponse>({
            method: "GET",
            url: apiRoutes.PRODUCTSHOME,
        });
    }
}

export const productService = new ProductService(httpAdapter);