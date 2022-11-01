import Property from './Property'

type PropertyCreateDataTransferObject = Pick<
  Property,
  | 'address'
  | 'city'
  | 'country'
  | 'description'
  | 'latitude'
  | 'longitude'
  | 'name'
  | 'ownerInvestorId'
  | 'region'
  | 'zip'
>

export default PropertyCreateDataTransferObject
