import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '../env';
import * as schema from './schema';

export const client = postgres({
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
});

console.log({ client });

export const db = drizzle(client, { schema, logger: true });
