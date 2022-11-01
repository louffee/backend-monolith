import { Request, Response } from 'express'

import Property from '../../models/Property'
import PropertyRepository from '../../repositories/PropertyRepository'
import handleException from '../../error/handleException'
import httpStatusCodes from '../../httpStatusCodes'

type InterpolatedNumber = `${number}`
type InterpolatedBoolean = 'true' | 'false'

interface GetInvestorsControllerRequestParameters {
  all?: InterpolatedBoolean

  limit?: InterpolatedNumber
  offset?: InterpolatedNumber
}

type GetInvestorsControllerResponseBody =
  | {
      content: { properties: Property[] }
    }
  | ReturnType<typeof handleException>

function getPropertiesController(repo: PropertyRepository) {
  return async function getPropertiesControllerClosure(
    request: Request<never, never, never, GetInvestorsControllerRequestParameters>,
    response: Response<GetInvestorsControllerResponseBody>,
  ) {
    if (request.query.all === 'true') {
      const properties = await repo.getAllProperties()

      return response.json({ content: { properties } })
    }

    if (typeof request.query.limit === 'string' && typeof request.query.offset === 'string') {
      let limit: number
      let offset: number

      try {
        limit = Number.parseInt(request.query.limit)
      } catch (error) {
        const errorCode = 'GIC-1'
        const message = 'Limit is not valid'
        const err = error instanceof Error ? error : undefined

        return response.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(handleException(errorCode, message, err))
      }

      try {
        offset = Number.parseInt(request.query.offset)
      } catch (error) {
        const errorCode = 'GIC-2'
        const message = 'Offset is not valid'
        const err = error instanceof Error ? error : undefined

        return response.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(handleException(errorCode, message, err))
      }

      const properties = await repo.getPaginatedProperties(limit, offset)

      return response.json({ content: { properties } })
    }

    const errorCode = 'GIC-3'
    const message = 'Invalid query parameters'
    const err = undefined

    return response.status(httpStatusCodes.BAD_REQUEST).json(handleException(errorCode, message, err))
  }
}

export default getPropertiesController
