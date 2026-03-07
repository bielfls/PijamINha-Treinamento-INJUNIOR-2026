interface sizeStock {
    size: string;
    stockQuantity: number;
}

export interface Pijama {
    id: string;
    name: string;
    image: string;
    description: string
    price: number;
    onSale: boolean;
    favorite: boolean;
    gender: string;
    type: string;
    season: string;
    salePercent: number | null;
    sizes: sizeStock[];
}

export interface Pajama {
    pajama: Pijama;
}

export interface GetPajamasResponse {
    pajamas: Pijama[];
    totalCount: number;
    totalPages: number;
}
