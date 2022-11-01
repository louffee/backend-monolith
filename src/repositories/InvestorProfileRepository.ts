import InvestorProfile from '../models/InvestorProfile'
import InvestorProfileCreateDataTransferObject from '../models/InvestorProfileCreateDataTransferObject'
import InvestorProfileUpdateDataTransferObject from '../models/InvestorProfileUpdateDataTransferObject'

interface InvestorProfileRepository {
  getInvestorProfiles(investorId: string): Promise<InvestorProfile[]>
  saveInvestorProfile(dto: InvestorProfileCreateDataTransferObject): Promise<void>
  updateInvestorProfile(dto: InvestorProfileUpdateDataTransferObject): Promise<void>
}

export default InvestorProfileRepository
