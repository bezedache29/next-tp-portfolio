import prisma from '../../../utils/prisma'

export default async function handle(req, res) {
  try {
    const results = await prisma.project.findMany({
      include: {
        languages: true,
        comments: true
      }
    })
    return res.status(200).json(results)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}