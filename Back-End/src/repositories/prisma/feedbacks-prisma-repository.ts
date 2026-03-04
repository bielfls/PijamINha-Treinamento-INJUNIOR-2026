import type { Prisma } from '@/@types/prisma/client.js'
import type { FeedbacksRepository } from '../feedbacks-repository.js'
import { prisma } from '@/libs/prisma.js'

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async createFeedback(data: Prisma.FeedbackCreateInput) {
        return await prisma.feedback.create({ data })
    }
    async listFeedbacks(min?: number) {
        return await prisma.feedback.findMany({
            where: min !== undefined ? {rating: {gte: min}}: undefined,
            orderBy: { id: "asc"}
        })
    }
    async getFeedback(where: Prisma.FeedbackWhereUniqueInput) {
        return await prisma.feedback.findUnique({ where })
    }
    async deleteFeedback(id: number) {
        await prisma.feedback.delete({
            where: { id }
        })
    }
}