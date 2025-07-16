'use server';

import bcrypt from 'bcrypt';
import { z } from 'zod';

import {
  PASSWORD_MIN_LENGTH,
  // PASSWORD_REGEX,
  // PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueMemberid = async (memberId: string) => {
  const user = await db.user.findUnique({
    where: {
      memberId,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string()
      .refine(checkUniqueUsername, '이미 사용중인 이름입니다.'),
    memberId: z
      .string()
      .email()
      .trim()
      .refine(checkUniqueMemberid, '이미 등록된 이메일 입니다.'),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
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
    // db에 저장
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
    // 로그인 후 /home에 redirect
  }
}
