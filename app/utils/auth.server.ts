import { db } from 'db/db';
import { users } from 'db/schema';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';
import { createUserSession } from './session.server';

export async function loginUser(username: string, password: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!user) {
    console.log('user not found');
    return null;
  }

  const validPassword = await argon2.verify(user.passwordHash, password);

  if (validPassword) {
    return await createUserSession(user.id, '/success');
  } else {
    return null;
  }
}

export async function createUser(username: string, password: string) {
  const passwordHash = await argon2.hash(password);

  const query = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (query) {
    return null;
  }

  try {
    const userReturn = await db
      .insert(users)
      .values({ username, passwordHash })
      .onConflictDoNothing()
      .returning({ id: users.id });
    const user = userReturn[0];
    return await createUserSession(user.id, '/success');
  } catch (err) {
    console.error(err);
    return null;
  }
}
