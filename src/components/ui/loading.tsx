import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/util/utils';
import React from 'react';

const buttonVariants = cva(
  'relative w-[7px] h-[7px] left-[-10004px] rounded-[5px] bg-inherit text-inherit shadow-dot animate-dot-pulse delay-[250ms] dot-style',
  {
    variants: {
      size: {
        xSmall: '',
        small: '',
        medium: '',
        large: '',
      },
      animationType: {
        dot: '',
        spinner: '',
      },
    },
    defaultVariants: {
      size: 'xSmall',
      animationType: 'dot',
    },
  },
);

const Loading = ({
  animationType = 'dot',
  dotted = false,
  message = '',
  size = 'xSmall',
  ...props
}: VariantProps<typeof buttonVariants> & {
  animationType?: 'dot' | 'spinner';
  dotted?: boolean;
  message?: string;
  size?: 'xSmall' | 'small' | 'medium' | 'large';
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4" {...props}>
      <div
        className={cn(
          buttonVariants({
            size,
          }),
        )}
      ></div>
      {message && <p className="text-on-surface body-large"> {message} </p>}
    </div>
  );
};

export default Loading;
