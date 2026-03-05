import type { Address, Prisma, Sale, SalePajamas } from "@/@types/prisma/client.js";

interface ListSaleQuery {
    page?: number
    limit?: number
    userId?: string
}

export type SaleWithRelation = Sale & { address: Address } & {pajamas: SalePajamas[]}

type ListSaleQueryResponse = {
    data: (SaleWithRelation)[]
    totalCount: number
    totalPage: number
    currentPage: number

}

export interface SalesRepository{

    create(data: Prisma.SaleCreateInput): Promise<SaleWithRelation>
    findBy(where: Prisma.SaleWhereInput): Promise<SaleWithRelation | null>
    list(query: ListSaleQuery): Promise<ListSaleQueryResponse>
    update(id: number, data: Prisma.SaleUpdateInput): Promise<SaleWithRelation>
    delete(id: number): Promise<void>
}