import bcrypt from 'bcrypt'
import { validadeObject } from '../../../../utils/validation-functions'
import { User } from '../../user.model'
import { IUsersRepository } from '../../users.repository'
import { IUserCreateDTO } from './user-create.dto'

export const PASSWORD_SALT_ROUNDS = 10

export class UserCreateService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: IUserCreateDTO): Promise<User> {
    // Unique user
    const existingUser = await this.usersRepository.findByUsername(
      data.username
    )
    if (existingUser) {
      throw new Error('users.register.user-already-registered')
    }

    // Validate Data
    const user = new User(data)
    await validadeObject(user)

    // Hash password
    user.password = await bcrypt.hash(user.password, PASSWORD_SALT_ROUNDS)

    try {
      const createdUser = await this.usersRepository.create(user)
      return createdUser
    } catch (error) {
      throw error
    }
  }
}
