import Knex from 'knex'
import { validadeObject } from '../../utils/validation-functions'
import { IPersonProfile, PersonProfile } from './person-profile.model'

export interface IPersonProfileRepository {
  findByUserId(userId: string): Promise<PersonProfile | undefined>
  insert(personProfileData: IPersonProfile): Promise<PersonProfile>
  update(personProfileData: IPersonProfile): Promise<PersonProfile>
}

export class PersonProfileRepository implements IPersonProfileRepository {
  constructor(private database: Knex) {}

  personProfileToTableObject(personProfile: PersonProfile) {
    return {
      user_id: personProfile.userId,
      name: personProfile.name,
      born_date: personProfile.bornDate,
      phone: personProfile.phone,
      address_state: personProfile.addressState,
      address_city: personProfile.addressCity,
      pwd: personProfile.pwd,
      areas_of_interest: JSON.stringify(personProfile.areasOfInterest),
    }
  }

  async findByUserId(userId: string): Promise<PersonProfile | undefined> {
    const result = await this.database
      .select('*')
      .from<PersonProfile>('person_profile')
      .where('user_id', userId)
      .first()
    return result
  }

  async insert(personProfileData: IPersonProfile): Promise<PersonProfile> {
    const personProfile = new PersonProfile(personProfileData)

    await validadeObject(personProfile)

    await this.database
      .insert(this.personProfileToTableObject(personProfile))
      .into('person_profile')

    return personProfile
  }

  async update(personProfileData: IPersonProfile): Promise<PersonProfile> {
    const personProfile = new PersonProfile(personProfileData)

    await validadeObject(personProfile)

    await this.database('person_profile')
      .update(this.personProfileToTableObject(personProfile))
      .where({
        user_id: personProfile.userId,
      })

    return personProfile
  }
}
