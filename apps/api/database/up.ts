import { FileMigrationProvider, Kysely, Migrator, SqliteDialect } from "kysely";
import path from "path";
import { promises as fs } from "fs";
import Database from "better-sqlite3";
import { DB } from "../types/database";


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

migrator.migrateUp().then(() => {
  console.log('Migrated up');
}
).catch((error) => {
  console.log('Error migrating down', error)
})  