import { db } from 'db/db';
import { users } from 'db/schema';
import { eq } from 'drizzle-orm';
import * as argon2 from 'argon2';

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
    return { id: user.id, username };
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
    const user = await db
      .insert(users)
      .values({ username, passwordHash })
      .onConflictDoNothing()
      .returning({ id: users.id, username: users.username });
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
}
