import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository.js";
import { DeleteFeedbackUseCase } from "@/use-cases/feedbacks/delete-feedback.js";

export function makeDeleteFeedbackUseCase() {
    const feedbackRepository = new PrismaFeedbacksRepository()
    const deleteUseCase = new DeleteFeedbackUseCase(feedbackRepository)

    return deleteUseCase
}