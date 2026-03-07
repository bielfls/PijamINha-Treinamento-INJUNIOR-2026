
export type PaymentMethod = "BOLETO" | "PIX" | "CARD";

export interface AddressRequest {
    zipCode: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
    number: string;
}

export interface PajamasBuy {
    pajamasId: string;
    size: string;
    quantity: number;
}


export interface SaleRequest {
    buyerName: string;
    cpf: string;
    paymentMethod: PaymentMethod;
    installments?: number; 
    address: AddressRequest;
    pajamasBuy: PajamasBuy[];
}


export interface SaleResponse {
    id: string;
    buyerName: string;
    cpf: string;
    price: number;
    paymentMethod: PaymentMethod;
    installments: number;
    quantityTotal: number;
    address: AddressRequest; 
}