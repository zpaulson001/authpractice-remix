import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import Database from 'better-sqlite3';
import { eq } from 'drizzle-orm';

const sqlite = new Database('./db/sqlite.db');
export const db = drizzle(sqlite, { schema, logger: true });

export async function getUserFromId(userId: number) {
  return await db.query.users.findFirst({
    where: eq(schema.users.id, userId),
  });
}
