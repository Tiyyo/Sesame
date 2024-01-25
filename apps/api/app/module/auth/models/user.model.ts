import { Kysely } from 'kysely'
import { DB } from '../../../../types/database'
import { DatabaseError } from '../../../helpers/exceptions/database.error'


export class UserModel {

  constructor(private db: Kysely<DB>) {
    this.db = db
  }
  async store(email: string, password: string) {
    try {
      const result = await this.db
        .insertInto('user')
        .values({ email, password })
        .execute()
      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error.message, 'Could not store user with UserModel.store')
      }
    }

  }
  async findByEmail(email: string) {

    try {
      const result = await this.db
        .selectFrom('user')
        .select(['id', 'email', 'password'])
        .where('email', '=', email)
        .executeTakeFirst()

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error.message, 'Could not find user by email with UserModel.findByEmail')
      }
    }
  }
}