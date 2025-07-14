'use server';

import { z } from 'zod';

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z.string().min(3).max(10),
    memberId: z.string().email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
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
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
