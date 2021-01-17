import { database } from '../../../../datasources/knex'
import { CompanyProfileRepository } from '../../company-profile.repository'
import { CompanyProfileGetController } from './company-profile-get.controller'
import { CompanyProfileGetService } from './company-profile-get.service'

const companyProfileRepository = new CompanyProfileRepository(database)

const companyProfileGet = new CompanyProfileGetService(companyProfileRepository)
const companyProfileGetController = new CompanyProfileGetController(
  companyProfileGet
)

export { companyProfileGetController }
