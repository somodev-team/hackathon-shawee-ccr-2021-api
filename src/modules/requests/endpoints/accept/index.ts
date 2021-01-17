import { database } from '../../../../datasources/knex'
import { RequestsRepository } from '../../requests.repository'
import { RequestAcceptController } from './request-accept.controller'
import { RequestAcceptService } from './request-accept.service'
import { CompaniesAffiliatesRepository } from '../../../companies-affiliates/companies-affiliates.repository'
import { UsersRepository } from '../../../users/users.repository'

const requestsRepository = new RequestsRepository(database)
const companiesAffiliatesRepository = new CompaniesAffiliatesRepository(
  database
)
const usersRepository = new UsersRepository(database)

const requestAccept = new RequestAcceptService(
  requestsRepository,
  companiesAffiliatesRepository,
  usersRepository
)
const requestAcceptController = new RequestAcceptController(requestAccept)

export { requestAcceptController }
