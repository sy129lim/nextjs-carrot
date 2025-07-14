import * as React from 'react';

import { cn } from '@/lib/utils';

// interface 추가
interface InputProps extends React.ComponentProps<'input'> {
  error?: string[];
}

function Input({ className, type, error = [], ...props }: InputProps) {
  return (
    <div>
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          className,
        )}
        {...props}
      />
      {error.map((err, index) => (
        <span key={index} className="text-sm font-medium text-red-500">
          {err}
        </span>
      ))}
    </div>
  );
}

export { Input };
