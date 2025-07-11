import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="flex w-full items-center justify-center">
          <CardTitle className="text-center text-2xl">
            플랜닥스 로그인
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="memberId">아이디</Label>
                <Input
                  id="memberId"
                  type="string"
                  placeholder="아이디를 입력하세요."
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  로그인
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
