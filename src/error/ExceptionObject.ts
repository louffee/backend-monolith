import ErrorCode from './ErrorCode'

interface ExceptionObject {
  errorCode: ErrorCode
  message: string
  error?: Error
}

export default ExceptionObject
