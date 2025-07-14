'use client';

import { useFormState } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { createAccount } from './actions';

export default function CreateAccount() {
  const [state, formAction] = useFormState(createAccount, null);
  return (
    <div className="flex min-h-screen w-full max-w-md flex-col justify-center gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="이름"
          required
          error={state?.fieldErrors.username}
        />
        <Input
          name="memberId"
          type="memberId"
          placeholder="아이디"
          required
          error={state?.fieldErrors.memberId}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          error={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="비밀번호 확인"
          required
          error={state?.fieldErrors.confirm_password}
        />
        <Button type="submit" className="mt-3 w-full">
          회원가입
        </Button>
      </form>
    </div>
  );
}
