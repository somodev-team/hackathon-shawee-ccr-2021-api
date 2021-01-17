import { database } from '../../../../datasources/knex'
import { CompanyProfileRepository } from '../../../company-profile/company-profile.repository'
import { PersonProfileRepository } from '../../../person-profile/person-profile.repository'
import { UsersRepository } from '../../users.repository'
import { UserLoginService } from '../login/user-login.service'
import { UserCreateController } from './user-create.controller'
import { UserCreateService } from './user-create.service'

const usersRepository = new UsersRepository(database)
const personProfileRepository = new PersonProfileRepository(database)
const companyProfileRepository = new CompanyProfileRepository(database)

const userCreate = new UserCreateService(usersRepository)
const userLogin = new UserLoginService(
  usersRepository,
  personProfileRepository,
  companyProfileRepository
)
const userCreateController = new UserCreateController(userCreate, userLogin)

export { userCreateController }
