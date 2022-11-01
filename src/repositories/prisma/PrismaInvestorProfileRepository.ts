import { PrismaClient } from '@prisma/client'

import InvestorProfile from '../../models/InvestorProfile'
import InvestorProfileCreateDataTransferObject from '../../models/InvestorProfileCreateDataTransferObject'
import InvestorProfileUpdateDataTransferObject from '../../models/InvestorProfileUpdateDataTransferObject'
import InvestorProfileRepository from '../InvestorProfileRepository'

class PrismaInvestorProfileRepository implements InvestorProfileRepository {
  private client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  public async updateInvestorProfile(dto: InvestorProfileUpdateDataTransferObject): Promise<void> {
    await this.client.investorProfile.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
        updatedAt: new Date().toISOString(),
      },
    })
  }

  public async getInvestorProfiles(investorId: string): Promise<InvestorProfile[]> {
    return await this.client.investorProfile.findMany({
      where: { investorId },
    })
  }
  public async saveInvestorProfile(investorProfile: InvestorProfileCreateDataTransferObject): Promise<void> {
    await this.client.investorProfile.create({
      data: {
        ...investorProfile,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    })
  }
}

export default PrismaInvestorProfileRepository
