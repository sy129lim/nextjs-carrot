import { notFound, redirect } from 'next/navigation';

import db from '@/lib/db';
import getSession from '@/lib/session';

async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    'use server';
    const session = await getSession();
    await session.destroy();
    redirect('/');
  };

  return (
    <>
      <h1>welcome {user?.username}</h1>
      <form action={logOut}>
        <button>Log Out</button>
      </form>
    </>
  );
}
