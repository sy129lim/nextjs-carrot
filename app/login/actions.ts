'use server';

import { z } from 'zod';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';

const formSchema = z.object({
  memberId: z.string().email().toLowerCase(),
  password: z
    .string({ error: '비밀번호를 입력하시오.' })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function submitLogin(prevState: unknown, formData: FormData) {
  const data = {
    memberId: formData.get('memberId'),
    password: formData.get('password'),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
