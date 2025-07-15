'use client';

import { useFormState } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { smsLogin } from './actions';

const initialState = {
  token: false,
  error: undefined,
};

export default function SMS() {
  const [state, formAction] = useFormState(smsLogin, initialState);
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-9 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS로 로그인</h1>
        <h2 className="text-xl">휴대폰 인증</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="인증 번호"
            required
            min={100000}
            max={999999}
            error={state.error?.formErrors}
          />
        ) : (
          <Input
            name="phone"
            type="text"
            placeholder="휴대전화번호"
            required
            error={state.error?.formErrors}
          />
        )}

        <Button className="mt-3 w-full">
          {state.token ? '인증하기' : '인증번호 발송'}
        </Button>
      </form>
    </div>
  );
}
