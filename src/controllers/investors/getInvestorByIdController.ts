import { Request, Response } from 'express'

import handleException from '../../error/handleException'
import Investor from '../../models/Investor'
import InvestorRepository from '../../repositories/InvestorRepository'

interface GetInvestorByIdControllerResponseParameter {
  id: string
}

type GetInvestorByIdControllerResponseBody =
  | {
      content: { investor: Investor }
    }
  | ReturnType<typeof handleException>

function getInvestorByIdController(repo: InvestorRepository) {
  return async function getInvestorByIdControllerClosure(
    request: Request<GetInvestorByIdControllerResponseParameter, never, never, never, never>,
    response: Response<GetInvestorByIdControllerResponseBody>,
  ) {
    if (typeof request.params.id === 'undefined') {
      const errorCode = 'GIBIC-1'
      const message = 'This investor could have not been identified. Sorry about that :/'

      return response.json(handleException(errorCode, message))
    }

    const { id: investorId } = request.params

    try {
      const investor = await repo.findByIdInvestor(investorId)

      if (!investor) {
        const errorCode = 'GIBIC-2'
        const message = 'This investor could have not been found. Perhaps he is a ghost?'
        const err = new Error(`No record related to the investor with id "${investorId}" could be found`)

        return response.json(handleException(errorCode, message, err))
      }
    } catch (error) {
      const errorCode = 'GIBIC-3'
      const message = 'An unexpected error occurred while trying to get this investor. Sorry about that :/'
      const err = error instanceof Error ? error : undefined

      return response.json(handleException(errorCode, message, err))
    }
  }
}

export default getInvestorByIdController
