import prisma from '../../../utils/prisma'

export default async function AddNewCommentForProjectId(req, res) {

  const { content, userName, projectId } = req.body

  try {
    const results = await prisma.comment.create({
      data: {
        content,
        userName,
        projectId
      }
    })
    return res.status(200).json(results)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
