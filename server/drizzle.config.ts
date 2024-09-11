import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
  },
});
