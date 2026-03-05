import { useQuery } from "@tanstack/react-query";
import type { Pijama } from "../types/home";
import { productService } from "../services/home-service";

export function useGetPromoProducts() {
    return useQuery({
        queryKey: ["promo-products-home"],
        queryFn: async () => {
            const response = await productService.getPajamas();
            // 1. Acessamos a lista completa
            const allPajamas: Pijama[] = response.data.pajamas;
            // 2. Filtramos apenas os que estão em promoção
            const Promo = allPajamas.filter((p) => p.onSale === true);

            // 3. Randomizamos a lista (Embaralhar)
            // O sort com Math.random() - 0.5 reorganiza os itens aleatoriamente
            const escolhidos = Promo.sort(() => Math.random() - 0.5);

            // 4. Retornamos apenas os 3 primeiros da lista embaralhada
            return escolhidos.slice(0, 3);
        },
        // Dica: se quiser que mude toda vez que o usuário trocar de aba, 
        // o React Query já faz isso por padrão.
    });
}