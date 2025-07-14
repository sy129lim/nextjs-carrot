'use client';

import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  loadingText?: string;
};

export function SubmitButton({
  children,
  loadingText = '로딩 중...',
  className,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn(className)}
      {...props}
    >
      {pending ? loadingText : children}
    </Button>
  );
}
