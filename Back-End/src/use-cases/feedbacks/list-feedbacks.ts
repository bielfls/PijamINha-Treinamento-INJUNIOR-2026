import type { Feedback } from "@/@types/prisma/client.js"
import type { FeedbacksRepository } from "@/repositories/feedbacks-repository.js"
import { InvalidRatingError } from "../errors/invalid-rating-error.js"

interface ListFeedbacksUseCaseRequest {
  min?: number
}

interface ListFeedbacksUseCaseResponse {
  feedbacks: Feedback[]
}

export class ListFeedbacksUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute({
    min
  }: ListFeedbacksUseCaseRequest): Promise<ListFeedbacksUseCaseResponse> {

    if (min !== undefined) {
      if (min < 0 || min > 5 || min * 2 !== Math.floor(min * 2)) {
        throw new InvalidRatingError()
      }
    }

    const feedbacks = await this.feedbacksRepository.listFeedbacks(min)

    return { feedbacks }
  }
}