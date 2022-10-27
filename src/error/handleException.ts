import ErrorCode from './ErrorCode'

function handleException(errorCode: ErrorCode, message: string, error?: Error) {
  // @TODO add error tracking here

  return {
    errorCode,
    message,
    stack: error,
  }
}

export default handleException
