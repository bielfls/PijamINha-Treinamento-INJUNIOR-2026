import type { FeedbacksRepository } from "@/repositories/feedbacks-repository.js"
import type { Feedback } from "@/@types/prisma/client.js"
import { ResourceNotFoundError } from "../errors/resourse-not-found-error.js"

interface GetFeedbackUseCaseRequest {
    publicId: string
}

type GetFeedbackUseCaseResponse = {
    feedback: Feedback
}

export class GetFeedbackUseCase {
    constructor(private feedbacksRepository: FeedbacksRepository) {}
    async execute({
        publicId,
    }: GetFeedbackUseCaseRequest): Promise<GetFeedbackUseCaseResponse> {
        const feedback = await this.feedbacksRepository.getFeedback({ publicId })

        if (!feedback) {
            throw new ResourceNotFoundError()
        }

        return { feedback }
    }
}