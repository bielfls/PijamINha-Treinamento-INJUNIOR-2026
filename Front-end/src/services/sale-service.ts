import { httpAdapter } from "../lib/adapter";
import { apiRoutes } from "../lib/config";
import type { HttpResponse } from "../types/http";
import type { SaleRequest, SaleResponse } from "../types/sale";
import { baseService } from "./base-service"

class SaleService extends baseService {
    public async makeSale(data: SaleRequest):Promise<HttpResponse<SaleResponse>>{
        return this.execute<SaleRequest, SaleResponse>({
            data,
            method:"POST",
            url: apiRoutes.SALES,
        })
    }
}
export const saleService = new SaleService(httpAdapter);