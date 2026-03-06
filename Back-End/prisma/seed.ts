import { prisma } from "@/libs/prisma.js"
import { pajamasToCreate } from "./pajamas.seed.js"
import { feedbacksToCreate } from "./feedbacks.seed.js"

async function seed() {
    console.log('Iniciando o seed do banco de dados...')

    for (const pajama of pajamasToCreate) {
        const { id, ...pajamaData } = pajama

        await prisma.pajamas.upsert({
            where: {
                id: id
            },
            update: {
                ...pajamaData
            },
            create: {
                id: id,
                ...pajamaData,
                sizes: {
                    create: [
                        { size: 'PP', stockQuantity: 5 },
                        { size: 'P', stockQuantity: 15 },
                        { size: 'M', stockQuantity: 25 },
                        { size: 'G', stockQuantity: 20 },
                        { size: 'GG', stockQuantity: 10 },
                    ]
                }
            }
        })
    }
    for (const feedback of feedbacksToCreate) {
        const { id, ...data } = feedback

        await prisma.feedback.upsert({
            where: { id },
            update: data,
            create: { id, ...data }
        })

        console.log('Seeding completed successfully.')
    }
}

seed()
    .then(() => {
        prisma.$disconnect()
        process.exit(0)
    })
    .catch((error) => {
        console.error('Error during seeding:', error)
        prisma.$disconnect()
        process.exit(1)
    })
