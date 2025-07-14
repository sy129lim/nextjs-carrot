import Link from 'next/link';

import { IconLogin } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold">플닥</h1>
        <span>플랜닥스에 어서오세요!</span>
      </div>
      <div className="mb-9">
        <Button variant="outline" size="sm">
          <Link href="/create-account" className="flex h-64 items-center gap-2">
            <IconLogin className="" /> 시작하기{' '}
          </Link>
        </Button>
        <div>
          <span className="m-1">이미 계정이 있나요?</span>
          <Link href="/login"> 로그인 </Link>
        </div>
      </div>
    </div>
  );
}
