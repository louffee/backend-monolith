import { PrismaClient } from '@prisma/client'

import Investor from '../../models/Investor'
import InvestorCreateDataTransferObject from '../../models/InvestorCreateDataTransferObject'
import InvestorRepository from '../InvestorRepository'

class PrismaInvestorRepository implements InvestorRepository {
  private client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  async createInvestor(investor: InvestorCreateDataTransferObject): Promise<Investor> {
    return await this.client.investor.create({ data: { ...investor, createdAt: new Date(), updatedAt: new Date() } })
  }

  async findByIdInvestor(id: string): Promise<Investor | null> {
    return await this.client.investor.findFirst({ where: { id } })
  }

  async findByEmailInvestor(email: string): Promise<Investor | null> {
    return await this.client.investor.findFirst({ where: { InvestorContact: { some: { email } } } })
  }

  async fetchAllInvestors(): Promise<Investor[]> {
    return await this.client.investor.findMany()
  }

  async fetchAllPaginatedInvestors(limit: number, offset: number): Promise<Investor[]> {
    return await this.client.investor.findMany({ take: limit, skip: offset })
  }

  async updateInvestor({ id, ...investor }: Investor): Promise<void> {
    await this.client.investor.update({
      where: { id },
      data: { ...investor, updatedAt: new Date() },
    })
  }
}

export default PrismaInvestorRepository
