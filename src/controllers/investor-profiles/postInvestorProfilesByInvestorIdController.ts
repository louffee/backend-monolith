import { Request, Response } from 'express'

import handleException from '../../error/handleException'
import InvestorProfileCreateDataTransferObject from '../../models/InvestorProfileCreateDataTransferObject'
import InvestorProfileRepository from '../../repositories/InvestorProfileRepository'
import httpStatusCodes from '../../httpStatusCodes'

interface PostInvestorProfilesByInvestorIdControllerRequestParameters {
  investorId: string
}

type PostInvestorProfilesByInvestorIdControllerRequestBody = Pick<InvestorProfileCreateDataTransferObject, 'name'>

type PostInvestorProfilesByInvestorIdControllerResponseBody =
  | {
      message: string
    }
  | ReturnType<typeof handleException>

function postInvestorProfilesByInvestorIdController(repo: InvestorProfileRepository) {
  return async function postInvestorProfilesByInvestorIdControllerClosure(
    request: Request<
      PostInvestorProfilesByInvestorIdControllerRequestParameters,
      never,
      PostInvestorProfilesByInvestorIdControllerRequestBody
    >,
    response: Response<PostInvestorProfilesByInvestorIdControllerResponseBody>,
  ) {
    if (typeof request.params.investorId === 'string') {
      return response
        .status(httpStatusCodes.BAD_REQUEST)
        .json(handleException('PIPBIC-1', 'It has not been possible to identify the investor. You sure you know them?'))
    }

    try {
      const { investorId } = request.params
      const { name } = request.body

      await repo.saveInvestorProfile({
        investorId,
        name,
      })

      return response.status(httpStatusCodes.CREATED).json({
        message: 'Investor profile created successfully.',
      })
    } catch (error_) {
      const errorCode = 'PIPBIC-2'
      const message =
        'It has not been possible to create the investor profile due to an error while accessing the database.'
      const error = error_ instanceof Error ? error_ : undefined

      return response.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(handleException(errorCode, message, error))
    }
  }
}

export default postInvestorProfilesByInvestorIdController
