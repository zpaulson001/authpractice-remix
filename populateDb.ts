import { db } from 'db/db';
import { users } from 'db/schema';
import * as argon2 from 'argon2';

const passHash = await argon2.hash('tuddybear');

async function main() {
  await db.insert(users).values({
    username: 'tudwerd',
    passwordHash: `${passHash}`,
  });
}

main();
