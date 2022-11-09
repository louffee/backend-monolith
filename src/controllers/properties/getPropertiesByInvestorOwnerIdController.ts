import { Request, Response } from 'express'

import Property from '../../models/Property'
import InvestorRepository from '../../repositories/InvestorRepository'
import PropertyRepository from '../../repositories/PropertyRepository'
import handleException from '../../error/handleException'
import httpStatusCodes from '../../httpStatusCodes'

interface GetPropertiesByInvestorOwnerIdControllerRequestParameters {
  investorOwnerId: string
}

type GetPropertiesByInvestorOwnerIdControllerResponseBody =
  | {
      content: {
        properties: Property[]
      }
    }
  | ReturnType<typeof handleException>

function getPropertiesByOwnerInvestorIdController(
  propertyRepository: PropertyRepository,
  investorRepository: InvestorRepository,
) {
  return async function getPropertiesByOwnerInvestorIdControllerClosure(
    request: Request<GetPropertiesByInvestorOwnerIdControllerRequestParameters, never, never, never, never>,
    response: Response<GetPropertiesByInvestorOwnerIdControllerResponseBody>,
  ) {
    if (typeof request.params.investorOwnerId !== 'string' || request.params.investorOwnerId.length === 0) {
      const errorCode = 'GPBOIC-1'
      const errorMessage = 'We could not identify the investor.'

      response.status(httpStatusCodes.BAD_REQUEST).json(handleException(errorCode, errorMessage))

      return
    }

    const { investorOwnerId } = request.params

    if (!(await investorRepository.findByIdInvestor(investorOwnerId))) {
      const errorCode = 'GPBOIC-2'
      const errorMessage = 'The investor does not exist. Are they a ghost?'

      response.status(httpStatusCodes.NOT_FOUND).json(handleException(errorCode, errorMessage))

      return
    }

    try {
      const properties = await propertyRepository.getPropertiesByOwnerInvestorId(investorOwnerId)

      return response.json({
        content: {
          properties,
        },
      })
    } catch (error_) {
      const errorCode = 'GPBOIC-3'
      const errorMessage = 'We could not get the properties.'
      const errorDetails = error_ instanceof Error ? error_ : undefined

      return response
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json(handleException(errorCode, errorMessage, errorDetails))
    }
  }
}

export default getPropertiesByOwnerInvestorIdController
