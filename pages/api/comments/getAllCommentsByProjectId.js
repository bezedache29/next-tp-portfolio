import prisma from '../../../utils/prisma'

export default async function handle(req, res) {

  const { id } = req.query

  try {
    const results = await prisma.comment.findMany({
      where: {
        projectId: +id
      },
    })
    return res.status(200).json(results)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}