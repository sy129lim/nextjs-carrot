'use client';

import { useFormState } from 'react-dom';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/ui/submit-button';

import { submitLogin } from '@/app/login/actions';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, action] = useFormState(submitLogin, { errors: [] });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="flex w-full flex-col items-center justify-center">
          <CardTitle className="font-gmarket text-center text-2xl">
            <span className="pd-text-gradient">안녕하세요</span>
          </CardTitle>
          <CardDescription>
            <span className="font-semibold">
              Log in with email and password
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="memberId">아이디</Label>
                <Input
                  // id="memberId"
                  name="memberId"
                  type="memberId"
                  placeholder="아이디를 입력하세요."
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                </div>
                <Input
                  // id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <SubmitButton type="submit" className="w-full">
                  로그인
                </SubmitButton>
              </div>
            </div>
          </form>
          <div className="my-6 flex flex-col items-center gap-6">
            <div className="w-full border-t border-gray-200" />
            <Button type="submit" variant="outline" className="w-full">
              Continue with GitHub
            </Button>
            <Button type="submit" variant="outline" className="-m-3 w-full">
              Continue with SNS
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
