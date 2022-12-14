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
import getInvestorsController from './controllers/investors/getInvestorsController'
import constants from './global/constants'
import getInvestorByIdController from './controllers/investors/getInvestorByIdController'
import postInvestorsController from './controllers/investors/postInvestorsController'
import getInvestorProfilesByInvestorIdController from './controllers/investor-profiles/getInvestorProfilesByInvestorIdController'
import factoryInvestorRepository from './repositories/factories/factoryInvestorRepository'
import factoryInvestorProfileRepository from './repositories/factories/factoryInvestorProfileRepository'
import getPingController from './controllers/ping/getPingController'
import factoryPropertyRepository from './repositories/factories/factoryPropertyRepository'
import getPropertiesController from './controllers/properties/getPropertiesController'

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

  server.get('/ping', getPingController())

  const investorRepository = factoryInvestorRepository()
  server.get('/investors', getInvestorsController(investorRepository))
  server.post('/investors', postInvestorsController(investorRepository))
  server.get('/investors/:id', getInvestorByIdController(investorRepository))

  const investorProfileRepository = factoryInvestorProfileRepository()
  server.get('/investor-profiles/:investorId', getInvestorProfilesByInvestorIdController(investorProfileRepository))

  const propertiesRepository = factoryPropertyRepository()
  server.get('/properties', getPropertiesController(propertiesRepository))

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
