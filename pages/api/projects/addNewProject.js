import prisma from '../../../utils/prisma'

export default async function AddNewProject(req, res) {

  // await prisma.$connect()

  console.log(req.body)

  const { title, description, languages } = req.body

  try {
    const results = await prisma.project.create({
      data: {
        title,
        description,
        languages: {
          create: languages.map(lang => ({
            assignedAt: new Date(),
            language: {
              connect: {
                name: lang
              }
            }
          }))
        }
      }
    })
    return res.status(200).json(results)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// AddNewProject()
//   .catch((e) => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
