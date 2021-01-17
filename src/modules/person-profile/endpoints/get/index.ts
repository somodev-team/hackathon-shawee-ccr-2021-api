import { database } from '../../../../datasources/knex'
import { PersonProfileRepository } from '../../person-profile.repository'
import { PersonProfileGetController } from './person-profile-get.controller'
import { PersonProfileGetService } from './person-profile-get.service'

const personProfileRepository = new PersonProfileRepository(database)

const personProfileGet = new PersonProfileGetService(personProfileRepository)
const personProfileGetController = new PersonProfileGetController(
  personProfileGet
)

export { personProfileGetController }
