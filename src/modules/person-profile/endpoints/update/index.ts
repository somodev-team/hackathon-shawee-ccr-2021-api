import { database } from '../../../../datasources/knex';
import { PersonProfileRepository } from '../../person-profile.repository';
import { PersonProfileUpdateService } from './person-profile-update.service';
import { PersonProfileUpdateController } from './person-profile-update.controller';

const personProfileRepository = new PersonProfileRepository(database);

const personProfileUpdate = new PersonProfileUpdateService(
  personProfileRepository
);

const personProfileUpdateController = new PersonProfileUpdateController(
  personProfileUpdate
);

export { personProfileUpdateController };
