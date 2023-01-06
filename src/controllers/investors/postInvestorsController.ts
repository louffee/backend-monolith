import { Request, Response } from 'express'

import handleException from '../../error/handleException'
import InvestorCreateDataTransferObject from '../../models/InvestorCreateDataTransferObject'
import InvestorRepository from '../../repositories/InvestorRepository'
import httpStatusCodes from '../../httpStatusCodes'

type PostInvestorsControllerRequestBody = InvestorCreateDataTransferObject

type PostInvestorsControllerResponseBody =
  | {
      id: string
      message: string
    }
  | ReturnType<typeof handleException>

function postInvestorsController(repo: InvestorRepository) {
  return async function postInvestorsControllerClosure(
    request: Request<never, never, PostInvestorsControllerRequestBody>,
    response: Response<PostInvestorsControllerResponseBody>,
  ) {
    if (typeof request.body.name !== 'string') {
      return response.status(400).json(handleException('PIC-1', 'name is required'))
    }

    try {
      const { id, name } = await repo.createInvestor(request.body)

      return response.status(httpStatusCodes.CREATED).json({
        id,
        message: `${name} has been successfully created`,
      })
    } catch (error) {
      return response
        .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          handleException(
            'PIC-2',
            'An error has occurred while creating investor',
            error instanceof Error ? error : undefined,
          ),
        )
    }
  }
}

export default postInvestorsController
