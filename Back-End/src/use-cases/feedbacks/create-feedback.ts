import type { Feedback } from "@/@types/prisma/client.js"
import type { FeedbacksRepository } from "@/repositories/feedbacks-repository.js"
import { InvalidRatingError } from "../errors/invalid-rating-error.js"

interface CreateFeedbackUseCaseRequest {
    name: string
    description: string
    rating: number
}
type CreateFeedbackUseCaseResponse = {
  feedback: Feedback
}
export class CreateFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}
  async execute({
    name,
    description,
    rating,
  }: CreateFeedbackUseCaseRequest): Promise<CreateFeedbackUseCaseResponse> {
    if (rating < 0 || rating > 5 || rating * 2 !== Math.floor(rating * 2)) {
      throw new InvalidRatingError()
    }

    const feedback = await this.feedbacksRepository.createFeedback({
      name,
      description,
      rating,
    })

    return { feedback }
  }
}