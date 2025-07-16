import Image from 'next/image';
import Link from 'next/link';

import { IconLogin } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <h1 className="text-4xl font-bold text-purple-950">플닥</h1>
        <Image src="/Logo.png" alt="로고 이미지" width={250} height={50} />
        <span>플랜닥스에 어서오세요!</span>
      </div>
      <div className="mb-9">
        <Button variant="outline" size="sm" className="w-full">
          <Link
            href="/create-account"
            className="flex items-center justify-center gap-2"
          >
            <IconLogin className="" /> 시작하기{' '}
          </Link>
        </Button>
        <div className="mt-2 text-center">
          <span className="mr-1">이미 계정이 있나요?</span>
          <Link
            href="/login"
            className="text-purple-950 underline underline-offset-2"
          >
            로그인{' '}
          </Link>
        </div>
      </div>
    </div>
  );
}
