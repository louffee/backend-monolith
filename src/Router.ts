import { Router as ExpressRouter } from 'express'

import getInvestorProfilesByInvestorIdController from './controllers/investor-profiles/getInvestorProfilesByInvestorIdController'
import getInvestorByIdController from './controllers/investors/getInvestorByIdController'
import getInvestorsController from './controllers/investors/getInvestorsController'
import postInvestorsController from './controllers/investors/postInvestorsController'
import getPingController from './controllers/ping/getPingController'
import getPropertiesController from './controllers/properties/getPropertiesController'
import factoryInvestorProfileRepository from './repositories/factories/factoryInvestorProfileRepository'
import factoryInvestorRepository from './repositories/factories/factoryInvestorRepository'
import factoryPropertyRepository from './repositories/factories/factoryPropertyRepository'

const Router = (): ExpressRouter => {
  const instance = ExpressRouter()

  instance.get('/ping', getPingController())

  const investorRepository = factoryInvestorRepository()
  instance.get('/investors', getInvestorsController(investorRepository))
  instance.post('/investors', postInvestorsController(investorRepository))
  instance.get('/investors/:id', getInvestorByIdController(investorRepository))

  const investorProfileRepository = factoryInvestorProfileRepository()
  instance.get('/investor-profiles/:investorId', getInvestorProfilesByInvestorIdController(investorProfileRepository))

  const propertiesRepository = factoryPropertyRepository()
  instance.get('/properties', getPropertiesController(propertiesRepository))

  return instance
}

export default Router
