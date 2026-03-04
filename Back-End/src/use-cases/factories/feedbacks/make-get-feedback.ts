import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository.js";
import { GetFeedbackUseCase } from "@/use-cases/feedbacks/get-feedback.js";

export function makeGetFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const getUseCase = new GetFeedbackUseCase(feedbackRepository)

    return getUseCase
}