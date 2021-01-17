import { database } from '../../../../datasources/knex'
import { CompanyProfileRepository } from '../../company-profile.repository'
import { DomainsListController } from './company-profile-list.controller'
import { CompanyProfileListService } from './company-profile-list.service'

const companyProfileRepository = new CompanyProfileRepository(database)

const companyProfileList = new CompanyProfileListService(
  companyProfileRepository
)
const companyProfileListController = new DomainsListController(
  companyProfileList
)

export { companyProfileListController }
