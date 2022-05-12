import prisma from '../../../utils/prisma'

export default async function handle(req, res) {

  const { id } = req.query

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: +id,
      },
      include: {
        languages: true,
        comments: true
      }
    })
    return res.status(200).json(project)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}