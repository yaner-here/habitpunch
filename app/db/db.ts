import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from './schema';

interface Env {
  DB: DrizzleD1Database;
};

export function getDb(env: Env) {
  return drizzle(env.DB, { schema });
}

export type DbClient = ReturnType<typeof getDb>;
