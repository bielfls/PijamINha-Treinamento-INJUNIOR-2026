import type { Pijama } from "../types/home";


export function formatPrice(valor: number): string {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

export function calculatePixPrice(valor: number): number {
    const pixPrice = valor * 0.85; // Aplicando 15% de desconto
    return pixPrice;
}

export function calculateInstallmentPrice(valor: number, installments: number): number {
    const installmentPrice = valor / installments;
    return Number(installmentPrice.toFixed(2));  
}

export function calculateFinalPrice(pijama: Pijama | undefined): number {
    if (!pijama) return 0;
    if (!pijama.onSale) {
        return pijama.price;
    }
    const sale = pijama.salePercent ? pijama.price * (pijama.salePercent / 100) : 0;
    return pijama.price - sale;
}
