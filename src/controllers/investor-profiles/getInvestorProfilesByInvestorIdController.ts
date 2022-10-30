import { Request, Response } from 'express'

import InvestorProfile from '../../models/InvestorProfile'
import InvestorProfileRepository from '../../repositories/InvestorProfileRepository'
import handleException from '../../error/handleException'

interface GetInvestorProfilesByInvestorIdControllerRequestParameters {
  investorId: string
}

type GetInvestorProfilesByInvestorIdControllerResponseBody =
  | {
      content: InvestorProfile[]
    }
  | ReturnType<typeof handleException>

function getInvestorProfilesByInvestorIdController(repo: InvestorProfileRepository) {
  return async function getInvestorProfilesByInvestorIdControllerClosure(
    request: Request<GetInvestorProfilesByInvestorIdControllerRequestParameters>,
    response: Response<GetInvestorProfilesByInvestorIdControllerResponseBody>,
  ) {
    if (typeof request.params.investorId === 'string') {
      return response
        .status(403)
        .json(
          handleException('GIPBIIC-1', 'It has not been possible to identify the investor. You sure you know them?'),
        )
    }

    try {
      const investorProfiles = await repo.getInvestorProfiles(request.params.investorId)

      return response.status(200).json({ content: investorProfiles })
    } catch (error_) {
      const errorCode = 'GIPBIIC-2'
      const message =
        'It has not been possible to get the investor profiles due to an error while accessing the database.'
      const error = error_ instanceof Error ? error_ : undefined

      return response.status(400).json(handleException(errorCode, message, error))
    }
  }
}

export default getInvestorProfilesByInvestorIdController
