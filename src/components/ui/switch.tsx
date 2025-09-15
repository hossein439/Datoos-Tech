'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import { cn } from '@/util/utils';
import { cva } from 'class-variance-authority';

const switchVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-surface-container-highest data-[state=unchecked]:ring-outline  focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-[32px] w-[52px] shrink-0 items-center rounded-full border-2 data-[state=unchecked]:border-outline cursor-pointer border-transparent shadow-xs transition-all outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background data-[state=unchecked]:bg-outline data-[state=checked]:bg-on-primary pointer-events-none block data-[state=unchecked]:size-6 size-10 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-2',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export default Switch;
