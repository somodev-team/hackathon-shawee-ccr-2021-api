import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { IUserLoginDTO } from './user-login.dto'
import { IUsersRepository } from '../../users.repository'
import {
  IJwtObject,
  JWT_SECRET,
} from '../../../../core/middlewares/authentication.middleware'
import { IPersonProfileRepository } from '../../../person-profile/person-profile.repository'
import { ICompanyProfileRepository } from '../../../company-profile/company-profile.repository'

export class UserLoginService {
  constructor(
    private usersRepository: IUsersRepository,
    private personProfileRepository: IPersonProfileRepository,
    private companyProfileRepository: ICompanyProfileRepository
  ) {}

  async execute(data: IUserLoginDTO): Promise<string> {
    const user = await this.usersRepository.findByUsername(data.username)
    if (!user) {
      throw Error('users.login.wrong-credentials')
    } else {
      const passwordHashMatch = await bcrypt.compare(
        data.password,
        user.password
      )
      if (!passwordHashMatch) {
        throw Error('users.login.wrong-credentials')
      }

      let profile
      if (user.type === 'person') {
        profile = await this.personProfileRepository.findByUserId(user.id)
      } else if (user.type === 'company') {
        profile = await this.companyProfileRepository.findByUserId(user.id)
      }

      const jwtObject: IJwtObject = {
        user: {
          id: user.id,
          username: user.username,
          type: user.type,
          profileDone: profile !== undefined,
        },
      }
      const token = jwt.sign(jwtObject, JWT_SECRET)
      return token
    }
  }
}
