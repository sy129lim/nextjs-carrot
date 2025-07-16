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

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z.string(),
    memberId: z.string().email().trim(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 사용중인 이름입니다.',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ memberId }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        memberId,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 사용중인 아이디입니다.',
        path: ['memberId'],
        fatal: true,
      });
    }
  })
  .refine(checkPasswords, {
    message: '비밀번호가 틀립니다.',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: unknown, formData: FormData) {
  const data = {
    username: formData.get('username'),
    memberId: formData.get('memberId'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        memberId: result.data.memberId,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect('/profile');
  }
}
