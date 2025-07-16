import { cookies } from 'next/headers';

import { getIronSession } from 'iron-session';

interface SessionContent {
  id?: number;
}

export default async function getSession() {
  return getIronSession<SessionContent>(await cookies(), {
    cookieName: 'plandocs',
    password: process.env.COOKIE_PASSWORD!,
  });
}
