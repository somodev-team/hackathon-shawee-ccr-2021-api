import { database } from '../../../../datasources/knex'
import { RequestsRepository } from '../../requests.repository'
import { RequestCreateController } from './request-create.controller'
import { RequestCreateService } from './request-create.service'

const requestsRepository = new RequestsRepository(database)

const requestCreate = new RequestCreateService(requestsRepository)
const requestCreateController = new RequestCreateController(requestCreate)

export { requestCreateController }
