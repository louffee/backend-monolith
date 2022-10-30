import InvestorProfile from '../models/InvestorProfile'
import InvestorProfileCreateDataTransferObject from '../models/InvestorProfileCreateDataTransferObject'

interface InvestorProfileRepository {
  getInvestorProfiles(investorId: string): Promise<InvestorProfile[]>
  saveInvestorProfile(investorProfile: InvestorProfileCreateDataTransferObject): Promise<void>
}

export default InvestorProfileRepository
