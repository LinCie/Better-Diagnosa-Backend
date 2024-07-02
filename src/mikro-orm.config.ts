import { SqliteDriver, defineConfig } from '@mikro-orm/sqlite';

export default defineConfig({
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'db.sqlite3',
  driver: SqliteDriver,
});
