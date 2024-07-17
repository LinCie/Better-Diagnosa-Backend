import { MongoDriver, defineConfig } from '@mikro-orm/mongodb';

export default defineConfig({
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'database',
  driver: MongoDriver,
  clientUrl: process.env.MONGODB_URI,
});
