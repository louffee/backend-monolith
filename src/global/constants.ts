import { v4 } from 'uuid'

const AUTH_TOKEN_SECRET = v4().replace(/-/g, '')
const EXTERNAL_DATA_TRANSFER_LIMIT = '50mb'
const SESSION_MAX_AGE = 1000 * 60 * 60 * 24 * 7 // aka 1 week

const constants = {
  AUTH_TOKEN_SECRET,
  EXTERNAL_DATA_TRANSFER_LIMIT,
  SESSION_MAX_AGE,
}

export default constants
