import { useQuery } from "@tanstack/react-query";
import type { Pijama } from "../types/home";
import { productService } from "../services/home-service";

export function useGetPromoProducts() {
    return useQuery({
        queryKey: ["promo-products-home"],
        queryFn: async () => {
            const response = await productService.getPajamas();
            const allPajamas: Pijama[] = response.data.pajamas;
            const Promo = allPajamas.filter((p) => p.onSale === true);
            const escolhidos = Promo.sort(() => Math.random() - 0.5);
            return escolhidos.slice(0, 3);
        },
    });
}