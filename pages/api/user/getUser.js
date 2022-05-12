import prisma from '../../../utils/prisma'

export default async function handle(req, res) {

  const { id } = req.query

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      }
    })
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}