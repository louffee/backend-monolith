import { Request, Response } from 'express'

import Investor from '../../models/Investor'
import InvestorRepository from '../../repositories/InvestorRepository'
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
      content: { investors: Investor[] }
    }
  | ReturnType<typeof handleException>

function getInvestorsController(repo: InvestorRepository) {
  return async function getInvestorsControllerClosure(
    request: Request<never, never, never, GetInvestorsControllerRequestParameters>,
    response: Response<GetInvestorsControllerResponseBody>,
  ) {
    if (request.query.all === 'true') {
      const investors = await repo.fetchAllInvestors()

      return response.json({ content: { investors } })
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

      const investors = await repo.fetchAllPaginatedInvestors(limit, offset)

      return response.json({ content: { investors } })
    }

    return response.json({ content: { investors: [] } })
  }
}

export default getInvestorsController
