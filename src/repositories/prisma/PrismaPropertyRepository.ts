import { PrismaClient, Property } from '@prisma/client'

import PropertyCreateDataTransferObject from '../../models/PropertyCreateDataTransferObject'
import PropertyRepository from '../PropertyRepository'

class PrismaPropertyRepository implements PropertyRepository {
  private client: PrismaClient

  constructor() {
    this.client = new PrismaClient()
  }

  public async registerProperty(dto: PropertyCreateDataTransferObject): Promise<void> {
    await this.client.property.create({ data: dto })
  }
  public async getPropertyById(id: string): Promise<Property | null> {
    return await this.client.property.findFirst({
      where: {
        id,
      },
    })
  }
  public async getAllProperties(): Promise<Property[]> {
    return await this.client.property.findMany()
  }
  public async getPropertiesByOwnerInvestorId(ownerInvestorId: string): Promise<Property[]> {
    return await this.client.property.findMany({
      where: {
        ownerInvestorId,
      },
    })
  }
  public async getPaginatedProperties(offset: number, limit: number): Promise<Property[]> {
    return await this.client.property.findMany({
      take: limit,
      skip: offset,
    })
  }
}

export default PrismaPropertyRepository
