import PropertyRepository from '../PropertyRepository'
import PrismaPropertyRepository from '../prisma/PrismaPropertyRepository'

const factoryPropertyRepository = (): PropertyRepository => new PrismaPropertyRepository()

export default factoryPropertyRepository
