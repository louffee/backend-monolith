import { v4 } from 'uuid'

const AUTH_TOKEN_SECRET = v4().replace(/-/g, '')
const EXTERNAL_DATA_TRANSFER_LIMIT = '50mb'

const constants = {
  AUTH_TOKEN_SECRET,
  EXTERNAL_DATA_TRANSFER_LIMIT,
}

export default constants
