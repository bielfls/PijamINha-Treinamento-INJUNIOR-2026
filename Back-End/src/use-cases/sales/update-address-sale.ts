import type { SalesRepository, SaleWithRelation } from "@/repositories/sales-repository.js"
import type { UsersRepository } from "@/repositories/users-repository.js"
import { ResourceNotFoundError } from "../errors/resourse-not-found-error.js"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error.js"


interface UpdateAddressUseCaseRequest{
    userId: string
    publicId: string
    address: {
    zipCode?: string
    state?: string
    city?: string
    neighborhood?: string
    address?: string
    number?: string
  }

}

type UpdateAddressUseCaseResponse = {
    sale: SaleWithRelation
}

export class UpdateAddressUseCase{

    constructor(private usersRepository: UsersRepository,
        private salesRepository: SalesRepository
     ){}

    async execute({
        userId,
        publicId,
        address: { zipCode, state, city, neighborhood, address, number }
    }: UpdateAddressUseCaseRequest): Promise <UpdateAddressUseCaseResponse>{
        
        const user = await this.usersRepository.getUser({publicId: userId})

        if(!user){
            throw new ResourceNotFoundError
        }

        const saleToUpdate = await this.salesRepository.findBy({publicId})

        if(!saleToUpdate){
            throw new ResourceNotFoundError
        }

        if(user.id != saleToUpdate.userId){
            throw new InvalidCredentialsError
        }

        const sale  = await this.salesRepository.update(saleToUpdate.id, {
            address: {
                update:{
                    zipCode, state, city, neighborhood, address, number
                }
            }
        })

        return {sale}
    }
}