import { InvestorProfile } from '@prisma/client'

type InvestorProfileUpdateDataTransferObject = Required<Pick<InvestorProfile, 'id'>> &
  Partial<Pick<InvestorProfile, 'name'>>

export default InvestorProfileUpdateDataTransferObject
