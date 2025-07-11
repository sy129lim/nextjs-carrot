import Link from 'next/link';

import { IconLogin } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">안녕하세요</h1>
      <Button variant="outline" size="sm">
        <Link href="/login" className="flex items-center gap-2">
          <IconLogin /> 시작하기{' '}
        </Link>
      </Button>
    </div>
  );
}
