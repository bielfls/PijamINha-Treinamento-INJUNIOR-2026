import { PrismaFeedbacksRepository } from "@/repositories/prisma/feedbacks-prisma-repository.js";
import { ListFeedbacksUseCase } from "@/use-cases/feedbacks/list-feedbacks.js";

export function makeListFeedbacksUseCase() {
    const feedbacksRepository = new PrismaFeedbacksRepository()
    const listUseCase = new ListFeedbacksUseCase(feedbacksRepository)

    return listUseCase
}