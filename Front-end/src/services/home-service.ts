import { baseService } from "./base-service";
import type { HttpResponse } from "../types/http";
import type { GetPajamasResponse, Pijama } from "../types/home";
import { httpAdapter } from "../lib/adapter";
import { apiRoutes } from "../lib/config";

class ProductService extends baseService {
    
    // Para o Catálogo
    public async getPajamas(limit: number = 12, gender?: string, type?: string, season?: string, name?: string): Promise<HttpResponse<Pijama[]>> {
        console.log("api: ", import.meta.env.VITE_API_URL);
        return this.execute<void, Pijama[]>({
            method: "GET",
            url: apiRoutes.PRODUCTSHOME,
            params: {   
                limit: String(limit),
                ...(gender && { gender }),
                ...(type && { type }),
                ...(season && { season }),
                ...(name && { name_like: name } )
            }
        });
    }

    // Para a Página Individual
    public async getPajamaById(id: number): Promise<HttpResponse<Pijama[]>> {

        return this.execute<void, Pijama[]>({
            method: "GET",
            url: `${apiRoutes.PRODUCTSHOME}/${id}`
        })
    }

    // Para a Home, com os produtos em promoção (onSale = true)
   
public async getPromoPajamas(limit: number = 30): Promise<HttpResponse<GetPajamasResponse>> {
    return this.execute<void, GetPajamasResponse>({
        method: "GET",
        url: apiRoutes.PRODUCTSHOME,
        params: {
            limit: String(limit),
            onSale: "true"
        }
    });
}

public async toggleFavorite(id: string, favorite: boolean): Promise<HttpResponse<Pijama>>{
    return this.execute<{favorite: boolean}, Pijama>({
        method: "PUT",
        url: `${apiRoutes.PRODUCTSHOME}${id}`,
        data: {favorite}
    })
}


public async getFavPajamas(): Promise<HttpResponse<GetPajamasResponse>> {
        return this.execute<void, GetPajamasResponse>({
            method: "GET",
            url: apiRoutes.PRODUCTSHOME,
            params: {
                favorite: "true",
                limit: "10000"
            }
        });
    }

public async removeFavPajamas(id: string): Promise<HttpResponse<Pijama>>{
    return this.execute<void, Pijama>({
        method: "DELETE",
        url: `${apiRoutes.PRODUCTSHOME}${id}`

    });
}


}

export const productService = new ProductService(httpAdapter);

