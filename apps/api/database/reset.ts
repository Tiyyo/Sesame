import { FileMigrationProvider, Kysely, Migrator, SqliteDialect } from "kysely";
import path from "path";
import { promises as fs } from "fs";
import Database from "better-sqlite3";
import { DB } from "../types/database";


const migrateDown = async () => {

  const db = new Kysely<DB>({
    dialect: new SqliteDialect({
      database: async () => new Database('./database/sqlite.db')
    }),
  })

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, 'migrations'),
    }),
  })
  const { error, results } = await migrator.migrateDown()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })
}

migrateDown()


