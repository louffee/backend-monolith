import express, { json, urlencoded } from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import * as dotenv from 'dotenv'

import Environment from './Environment'

async function main() {
  dotenv.config()

  const server = express()

  server.use(cors())
  server.use(compression())
  server.use(morgan('dev'))
  server.use(helmet())
  server.use(json({ limit: '50mb' }))
  server.use(urlencoded({ extended: true, limit: '50mb' }))

  return new Promise<void>((resolve) => {
    const { port } = new Environment()

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`)
      resolve()
    })
  })
}

main()
