import { IPersonProfileRepository } from '../../person-profile.repository'
import { IPersonProfileGetDTO } from './person-profile-get.dto'

export class PersonProfileGetService {
  constructor(private personProfileRepository: IPersonProfileRepository) {}

  async execute(userId: string): Promise<IPersonProfileGetDTO | undefined> {
    return await this.personProfileRepository.findByUserId(userId)
  }
}
