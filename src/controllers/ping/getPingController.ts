import { Request, Response } from 'express'

import handleException from '../../error/handleException'
import httpStatusCodes from '../../httpStatusCodes'

type GetPingControllerResponseBody =
  | {
      content: 'pong'
    }
  | ReturnType<typeof handleException>

function getPingController() {
  return function getPingControllerClosure(
    _: Request<never, never, never, never>,
    response: Response<GetPingControllerResponseBody>,
  ) {
    const errorPossibility = Math.floor(Math.random() * 100) <= 15

    if (errorPossibility) {
      const error = handleException('GPC-1', 'Something went wrong')

      return response.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }

    return response.status(httpStatusCodes.OK).json({
      content: 'pong',
    })
  }
}

export default getPingController
