import Property from '../models/Property'
import PropertyCreateDataTransferObject from '../models/PropertyCreateDataTransferObject'

interface PropertyRepository {
  registerProperty(dto: PropertyCreateDataTransferObject): Promise<void>
  getPropertyById(id: string): Promise<Property | null>
  getAllProperties(): Promise<Property[]>
  getPropertiesByOwnerInvestorId(ownerInvestorId: string): Promise<Property[]>
  getPaginatedProperties(offset: number, limit: number): Promise<Property[]>
}

export default PropertyRepository
