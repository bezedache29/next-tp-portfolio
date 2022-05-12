import Prisma from '@prisma/client'
import languages from './languages.js'
const { PrismaClient } = Prisma

const prisma = new PrismaClient()

async function main() {
    await prisma.language.createMany({
      data: languages
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })