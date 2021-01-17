import { IUser, User } from './user.model'
import Knex from 'knex'

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByUsername(username: string): Promise<User | undefined>
  create(user: IUser): Promise<User>
}

export class UsersRepository implements IUsersRepository {
  constructor(private database: Knex) {}

  async findById(id: string): Promise<User | undefined> {
    const result = await this.database
      .select('*')
      .from<User>('users')
      .where('id', id)
      .first()
    return result
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const result = await this.database
      .select('*')
      .from<User>('users')
      .where('username', username)
      .first()
    return result
  }

  async create(userData: IUser): Promise<User> {
    const user = new User(userData)
    await this.database
      .insert({
        id: user.id,
        type: user.type,
        username: user.username,
        password: user.password,
      })
      .into('users')
    return user
  }
}
