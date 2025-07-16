'use server';

import { redirect } from 'next/navigation';

import bcrypt from 'bcrypt';
import { z } from 'zod';

import {
  PASSWORD_MIN_LENGTH,
  // PASSWORD_REGEX,
  // PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';

const checkMemberidExist = async (memberId: string) => {
  const user = await db.user.findUnique({
    where: {
      memberId,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  memberId: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkMemberidExist, '아이디가 존재하지 않습니다.'),
  password: z
    .string({ error: '비밀번호를 입력하시오.' })
    .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function submitLogin(prevState: unknown, formData: FormData) {
  const data = {
    memberId: formData.get('memberId'),
    password: formData.get('password'),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        memberId: result.data.memberId,
      },
      select: {
        password: true,
        id: true,
      },
    });

    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xx',
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          password: ['비밀번호가 틀립니다.'],
        },
      };
    }
  }
}
