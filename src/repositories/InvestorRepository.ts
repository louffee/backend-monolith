import type Investor from '../models/Investor'
import type InvestorCreateDataTransferObject from '../models/InvestorCreateDataTransferObject'

interface InvestorRepository {
  createInvestor(investor: InvestorCreateDataTransferObject): Promise<Investor>
  findByIdInvestor(id: string): Promise<Investor | null>
  findByEmailInvestor(email: string): Promise<Investor | null>
  fetchAllInvestors(): Promise<Investor[]>
  fetchAllPaginatedInvestors(limit: number, offset: number): Promise<Investor[]>
  updateInvestor(investor: Investor): Promise<void>
}

export default InvestorRepository
