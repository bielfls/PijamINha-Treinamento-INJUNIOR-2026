import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository.js";
import { CreateFeedbackUseCase } from "@/use-cases/feedbacks/create-feedback.js";

export function makeCreateFeedbackUseCase() {
    const feedbacksRepository = new PrismaFeedbacksRepository()
    const createUseCase = new CreateFeedbackUseCase(feedbacksRepository)

    return createUseCase
}