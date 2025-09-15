import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import Loading from '@/components/ui/loading';
import { cn } from '@/util/utils';
import IconLoader from './icon-loader';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-[4px] whitespace-nowrap cursor-pointer transition-colors duration-300 ease-in',
  {
    variants: {
      color: {
        default: '',
        secondary: '',
        error: '',
        warning: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      variant: {
        filled: 'bg-primary text-on-primary hover:bg-secondary-container hover:text-on-primary',
        outlined: 'text-primary bg-transparent border border-primary hover:bg-primary-08',
        text: 'text-primary bg-transparent hover:bg-surface-container',
        elevated: 'text-on-surface bg-surface-container-lowest border border-primary-08 hover:bg-surface-container',
      },
      disabled: {
        true: '',
        false: '',
      },
      size: {
        medium: 'h-[3.2rem] min-w-[4rem] label-medium rounded-xxx-big',
        large: 'h-[5.6rem] min-w-[16.3rem] rounded-md label-large',
        xLarge: 'h-[4.8rem] min-w-[5.6rem] label-large rounded-[72px]',
        '2xLarge': 'h-[5.6rem] min-w-[6.4rem] label-large rounded-x-lg',
      },
    },
    compoundVariants: [
      {
        variant: 'filled',
        disabled: true,
        class: 'bg-primary-16 text-primary-16 cursor-not-allowed hover:bg-primary-16 hover:text-primary-16',
      },
      {
        variant: 'outlined',
        disabled: true,
        class: 'bg-state-colors-disabled-soft text-on-surface border-state-colors-disabled-soft opacity-40 cursor-not-allowed',
      },
      {
        variant: 'text',
        disabled: true,
        class: 'bg-state-colors-disabled-soft text-on-surface border-state-colors-disabled-soft opacity-40 cursor-not-allowed',
      },
      {
        variant: 'elevated',
        disabled: true,
        class: 'bg-surface-08 hover:bg-surface-08 text-on-surface border-transparent opacity-40 cursor-not-allowed',
      },
    ],
    defaultVariants: {
      color: 'default',
      variant: 'filled',
      size: 'large',
      disabled: false,
    },
  },
);

function Button({
  isLoading = false,
  appendIcon,
  prependIcon,
  isDisabled = false,
  fullWidth = false,
  variant,
  color,
  size,
  iconSize,
  asChild = false,
  className,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    prependIcon?: string;
    appendIcon?: string;
    circularIcon?: string;
    fullWidth?: boolean;
    color?: 'primary' | 'secondary' | 'error' | 'warning';
    size?: 'large' | 'xLarge' | '2xLarge' | '3xLarge';
    variant?: 'filled' | 'outlined' | 'text' | 'elevated';
    iconSize?: string;
    ['data-class-prepend-icon']?: string;
    ['data-class-append-icon']?: string;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      disabled={isDisabled || isLoading}
      className={cn(
        buttonVariants({
          variant,
          color,
          disabled: isDisabled,
          fullWidth: fullWidth,
        }),
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {prependIcon && <IconLoader name={prependIcon} size={iconSize} />}
          {props.children}
          {appendIcon && <IconLoader name={appendIcon} size={iconSize} />}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
