import { Kysely } from 'kysely'
import { DB } from '../../../../types/database'
import { DatabaseError } from '../../../helpers/exceptions/database.error'

export class TokenModel {
  declare db

  constructor(db: Kysely<DB>) {
    this.db = db
  }
  async store({ id, expiresAt, userId }: { id: string, expiresAt: string, userId: number }) {
    try {
      const result = await this.db
        .insertInto('token')
        .values({ id, expires_at: expiresAt, user_id: userId })
        .execute()
      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error.message, 'Could not store token with TokenModel.store')
      }
    }

  }
  async find(token: string) {

    try {
      const result = await this.db
        .selectFrom('token')
        .select(['user_id', 'expires_at'])
        .where('id', '=', token)
        .executeTakeFirst()

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error.message, 'Could not find any Token with TokenModel.find')
      }
    }
  }
  async destroy(token: string) {
    try {
      const result = await this.db
        .deleteFrom('token')
        .where('id', '=', token)
        .execute()
      return result
    } catch (error) {
      if (error instanceof Error) {
        throw new DatabaseError(error.message, 'Could not delete token with TokenModel.destroy')
      }
    }
  }
}