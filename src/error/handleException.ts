import Environment from '../Environment'

import ErrorCode from './ErrorCode'
import ExceptionObject from './ExceptionObject'

function handleException(errorCode: ErrorCode, message: string, error?: Error): ExceptionObject {
  const { isProduction } = new Environment()

  // @TODO add error tracking here

  const exceptionObject: ExceptionObject = {
    errorCode,
    message: `${message} (${errorCode})`,

    ...(!isProduction() && {
      stack: error,
    }),
  }

  return exceptionObject
}

export default handleException
