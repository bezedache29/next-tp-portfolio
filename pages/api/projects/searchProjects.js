import prisma from '../../../utils/prisma'

export default async function handle(req, res) {

  const { title } = req.query

  try {
    const projects = await prisma.project.findMany({
      where: {
        title: {
          contains: title
        } 
      },
      include: {
        languages: true,
        comments: true
      }
    })
    return res.status(200).json(projects)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}