import { database } from '../../../../datasources/knex'
import { CompanyProfileRepository } from '../../../company-profile/company-profile.repository'
import { PersonProfileRepository } from '../../../person-profile/person-profile.repository'
import { UsersRepository } from '../../users.repository'
import { UserLoginController } from './user-login.controller'
import { UserLoginService } from './user-login.service'

const usersRepository = new UsersRepository(database)
const personProfileRepository = new PersonProfileRepository(database)
const companyProfileRepository = new CompanyProfileRepository(database)

const userLogin = new UserLoginService(
  usersRepository,
  personProfileRepository,
  companyProfileRepository
)
const userLoginController = new UserLoginController(userLogin)

export { userLoginController }
