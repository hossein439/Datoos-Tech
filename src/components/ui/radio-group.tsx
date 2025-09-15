'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';

import { cn } from '@/util/utils';
import { cva } from 'class-variance-authority';

const radioGroupItemVariant = cva(
  'h-[21px] w-[21px] cursor-pointer data-[state=checked]:text-primary data-[state=unchecked]:text-on-surface-variant !border-[2px] text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 relative after:w-[40px] after:h-[40px] after:inline-block after:absolute after:transition-colors after:bottom-[-11px] after:right-[-11px] hover:after:bg-primary-08 after:rounded-full',
  {
    variants: {
      disabled: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);
function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('grid gap-3', className)} {...props} />;
}

function RadioGroupItem({ className, disabled, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item data-slot="radio-group-item" className={cn(radioGroupItemVariant({ disabled }), className)} {...props}>
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className=" relative flex items-center justify-center">
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
