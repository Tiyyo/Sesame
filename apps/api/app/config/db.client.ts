import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import { DB } from '../../types/database'

const dialect = new SqliteDialect({
  database: new SQLite('./database/sqlite.db'),
})

export const db = new Kysely<DB>({ dialect })