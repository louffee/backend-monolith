import express, { json, urlencoded, raw, text } from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import session from 'express-session'
import * as dotenv from 'dotenv'
import colors from 'colors'
import cookieParser from 'cookie-parser'

import Environment from './Environment'
import createChannel from './logger/createChannel'
import constants from './global/constants'
import Router from './Router'

async function main() {
  dotenv.config()

  const server = express()

  server.use(cors())
  server.use(compression())
  server.use(morgan('dev'))
  server.use(helmet())
  server.use(json({ limit: constants.EXTERNAL_DATA_TRANSFER_LIMIT }))
  server.use(urlencoded({ extended: true, limit: constants.EXTERNAL_DATA_TRANSFER_LIMIT }))
  server.use(raw({ limit: constants.EXTERNAL_DATA_TRANSFER_LIMIT }))
  server.use(text({ limit: constants.EXTERNAL_DATA_TRANSFER_LIMIT }))
  server.use(
    session({
      secret: constants.AUTH_TOKEN_SECRET,
      saveUninitialized: true,
      resave: true,
      cookie: { maxAge: constants.SESSION_MAX_AGE },
    }),
  )
  server.use(cookieParser())
  server.use(Router())

  return new Promise<void>((resolve) => {
    const { port } = new Environment()

    server.listen(port, () => {
      const message = `Server listening on port ${colors.yellow(String(port))}`

      const channel = createChannel()
      channel.log(message)

      resolve()
    })
  })
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
main()

export {}
