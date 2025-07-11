import { IconGitBranch } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <Button variant="outline" size="sm">
        <IconGitBranch /> New Branch
      </Button>
    </div>
  );
}
