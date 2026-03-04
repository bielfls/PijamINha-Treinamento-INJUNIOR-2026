import type { Prisma, Feedback } from "@/@types/prisma/client.js"

export interface FeedbacksRepository {
    createFeedback(data: Prisma.FeedbackCreateInput) : Promise<Feedback>
    getFeedback(where: Prisma.FeedbackWhereUniqueInput): Promise<Feedback | null>
    listFeedbacks(min?: number): Promise<Feedback[]>
    deleteFeedback(id: number): Promise<void>
}