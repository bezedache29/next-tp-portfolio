
import prisma from '../../../utils/prisma'

export default async function AddNewLanguage(req, res) {

  const { name } = req.body

  try {
    const results = await prisma.language.create({
      data: {
        name
      }
    })
    return res.status(200).json(results)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
