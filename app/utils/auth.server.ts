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
