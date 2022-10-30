import InvestorRepository from '../InvestorRepository'
import PrismaInvestorRepository from '../prisma/PrismaInvestorRepository'

const factoryInvestorRepository = (): InvestorRepository => new PrismaInvestorRepository()

export default factoryInvestorRepository
