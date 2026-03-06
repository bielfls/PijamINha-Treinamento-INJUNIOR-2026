export interface Pijama {
    id: string;
    name: string;
    image: string;
    price: number;
    onSale: boolean;
    salePercent: number | null;
    favorite: boolean
}

export interface GetPajamasResponse {
    pajamas: Pijama[];
    totalCount: number;
    totalPages: number;
}