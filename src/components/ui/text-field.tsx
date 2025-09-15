'use client';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import Label from '@/components/ui/label';
import IconLoader from '@/components/ui/icon-loader';
import { cn } from '@/util/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { useMemo } from 'react';

const textFieldVariants = cva(
  'relative flex justify-between items-center w-full mt-10 border-[1.5px] border-outline-variant rounded-md bg-surface-container hover:bg-surface-container-high focus-within:border-primary transition-colors p-[16px]',
  {
    variants: {
      variant: {
        filled: '',
        outlined: '',
        text: '',
        elevated: '',
      },
      disabled: {
        true: 'bg-surface-container-high',
        false: '',
      },
      isError: {
        true: 'border-error focus-within:border-error',
        false: '',
      },
      as: {
        textarea: 'min-h-[96px] py-0',
        input: 'min-h-[56px]',
      },
    },
    defaultVariants: {
      variant: 'outlined',
    },
  },
);

const textFieldLabelVariants = cva('absolute left-0 title-small capitalize', {
  variants: {
    as: {
      textarea: 'bottom-[100px]',
      input: 'bottom-[60px]',
    },
  },
  defaultVariants: {},
});

const textFieldElementVariants = cva(
  'absolute inset-x-[52px] body-medium text-on-surface focus-within:placeholder-primary focus:outline-none focus:ring-0 focus:border-none placeholder:capitalize py-[16px]',
  {
    variants: {
      disabled: {
        true: 'text-on-surface-16 opacity-50 placeholder:text-on-surface-16',
        false: '',
      },
      hasAppendIcon: {
        true: '',
        false: 'inset-x-[16px]',
      },
      as: {
        textarea: 'h-full hide-scrollbar resize-none',
        input: '',
      },
    },
    defaultVariants: {
      disabled: false,
      hasAppendIcon: false,
    },
  },
);

const textFieldIconVariants = cva('text-on-surface-variant', {
  variants: {
    disabled: {
      true: 'text-on-surface-16',
      false: '',
    },
    isClickable: {
      true: 'cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

const textFieldCaptionContent = cva('absolute left-0 label-medium top-[60px]', {
  variants: {
    isError: {
      true: 'text-error',
      false: '',
    },
  },
  defaultVariants: {
    isError: false,
  },
});

type BaseProps = {
  label?: string;
  variant?: 'filled' | 'outlined' | 'text' | 'elevated';
  name: string;
  isDisabled?: boolean;
  hint?: string;
  error?: any;
  appendIcon?: string;
  prependIcon?: string;
  isAppendIconClickable?: boolean;
  isPrependIconClickable?: boolean;
  onAppendIconClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onPrependIconClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  className?: string;
  classNameContainer?: string;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  as?: 'input';
} & BaseProps;

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  as: 'textarea';
} & BaseProps;

type TextFieldProps = InputProps | TextareaProps;
const TextField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  (
    {
      label,
      variant = 'outlined',
      name,
      isDisabled = false,
      hint,
      error,
      appendIcon,
      prependIcon,
      isAppendIconClickable = false,
      isPrependIconClickable = false,
      onAppendIconClick,
      onPrependIconClick,
      className,
      classNameContainer,
      as = 'input',
      ...props
    },
    ref,
  ) => {
    const renderIcon = (
      icon: string | React.ReactNode,
      onClick: React.MouseEventHandler<SVGSVGElement> | undefined,
      isClickable: boolean,
    ) => {
      if (typeof icon === 'string') {
        return (
          <IconLoader
            onClick={onClick}
            className={cn(
              textFieldIconVariants({
                disabled: isDisabled,
                isClickable: isClickable,
              }),
            )}
            name={icon}
          />
        );
      } else {
        return React.cloneElement(icon as React.ReactElement, {
          onClick,
          className: cn(textFieldIconVariants({ disabled: isDisabled, isClickable })),
        });
      }
    };

    const captionContent = useMemo(() => {
      return error?.message ?? hint;
    }, [error, hint]);

    return (
      <div
        className={cn(
          textFieldVariants({
            variant,
            disabled: isDisabled,
            isError: !!error?.message,
            as: as,
          }),
          classNameContainer,
        )}
      >
        <Label htmlFor={name} className={cn(textFieldLabelVariants({ as }))}>
          {label}
        </Label>

        {/* {appendIcon && (
          <IconLoader
            onClick={onAppendIconClick}
            className={cn(
              textFieldIconVariants({
                disabled: isDisabled,
                isClickable: isAppendIconClickable,
              }),
            )}
            name={appendIcon}
          />
        )} */}
        {appendIcon && renderIcon(appendIcon, onAppendIconClick, isAppendIconClickable)}

        {as === 'textarea' ? (
          <Textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            name={name}
            disabled={isDisabled}
            id={name}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={cn(
              textFieldElementVariants({
                disabled: isDisabled,
                as: as,
              }),
              className,
            )}
          />
        ) : (
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            name={name}
            disabled={isDisabled}
            id={name}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            className={cn(
              textFieldElementVariants({
                disabled: isDisabled,
                hasAppendIcon: !!appendIcon,
                as: as,
              }),
              className,
            )}
          />
        )}

        {captionContent && (
          <span
            className={cn(
              textFieldCaptionContent({
                isError: !!error?.message,
              }),
            )}
          >
            {captionContent}
          </span>
        )}

        {/* {prependIcon && (
          <IconLoader
            onClick={onPrependIconClick}
            className={cn(
              textFieldIconVariants({
                disabled: isDisabled,
                isClickable: isPrependIconClickable,
              }),
            )}
            name={prependIcon}
          />
        )} */}

        {prependIcon && renderIcon(prependIcon, onPrependIconClick, isPrependIconClickable)}
      </div>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
