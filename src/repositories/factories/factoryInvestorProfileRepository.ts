import InvestorProfileRepository from '../InvestorProfileRepository'
import PrismaInvestorProfileRepository from '../prisma/PrismaInvestorProfileRepository'

const factoryInvestorProfileRepository = (): InvestorProfileRepository => new PrismaInvestorProfileRepository()

export default factoryInvestorProfileRepository
