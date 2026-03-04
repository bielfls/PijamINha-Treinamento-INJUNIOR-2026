import type { Address, Prisma } from "@/@types/prisma/client.js"

interface ListAddressQuery {
    page?: number
    limit?: number
}

type ListAddressQueryResponse = {
    data: Address[]
    totalCount: number
    totalPage: number
    currentPage: number

}

export interface AddressRepository{

    //create(data: Prisma.AddressCreateInput): Promise<Address>
    findBy(where: Prisma.AddressWhereInput): Promise<Address | null>
    list(query: ListAddressQuery): Promise<ListAddressQueryResponse>
    //update(id: number, data: Prisma.AddressUpdateInput): Promise<Address>

}