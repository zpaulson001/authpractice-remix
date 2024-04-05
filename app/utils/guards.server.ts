import { redirect } from '@remix-run/node';
import { getUserIdFromSession } from './session.server';
import { getUserFromId } from 'db/db';

export async function requireUser(request: Request) {
  const userId = await getUserIdFromSession(request);
  if (!userId) {
    throw redirect('/login');
  }

  const user = await getUserFromId(userId);

  if (!user) {
    throw redirect('/login');
  }

  return user;
}

export async function isLoggedIn(request: Request) {
  const userId = await getUserIdFromSession(request);

  if (!userId) {
    return false;
  }

  const user = await getUserFromId(userId);

  if (!user) {
    return false;
  }

  return true;
}
