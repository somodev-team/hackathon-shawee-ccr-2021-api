import { database } from '../../../../datasources/knex'
import { CompanyProfileRepository } from '../../company-profile.repository'
import { CompanyProfileUpdateService } from './company-profile-update.service'
import { CompanyProfileUpdateController } from './company-profile-update.controller'

const companyProfileRepository = new CompanyProfileRepository(database)

const companyProfileUpdate = new CompanyProfileUpdateService(
  companyProfileRepository
)

const companyProfileUpdateController = new CompanyProfileUpdateController(
  companyProfileUpdate
)

export { companyProfileUpdateController }
