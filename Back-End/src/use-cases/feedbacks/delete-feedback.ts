import type { FeedbacksRepository } from "@/repositories/feedbacks-repository.js"
import { ResourceNotFoundError } from "../errors/resourse-not-found-error.js"

interface DeleteFeedbackUseCaseRequest {
  publicId: string
}

export class DeleteFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute({ publicId }: DeleteFeedbackUseCaseRequest) {

    const feedback = await this.feedbacksRepository.getFeedback({ publicId })

    if (!feedback) {
      throw new ResourceNotFoundError()
    }

    return await this.feedbacksRepository.deleteFeedback(feedback.id)
  }
}