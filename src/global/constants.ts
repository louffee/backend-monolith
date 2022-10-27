import { v4 } from 'uuid'

const AUTH_TOKEN_SECRET = v4().replace(/-/g, '')

const constants = {
  AUTH_TOKEN_SECRET,
}

export default constants
