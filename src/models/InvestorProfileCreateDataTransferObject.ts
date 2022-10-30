import { InvestorProfile } from '@prisma/client'

type InvestorProfileCreateDataTransferObject = Pick<InvestorProfile, 'investorId' | 'name'>

export default InvestorProfileCreateDataTransferObject
