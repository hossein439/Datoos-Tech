import React from 'react';
import { Control, FieldErrors, Controller, FieldValues, Path } from 'react-hook-form';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { cva } from 'class-variance-authority';
import { cn } from '@/util/utils';
import { useMemo } from 'react';

type OtpProps<T extends FieldValues> = {
  name: Path<T>;
  control?: Control<T>;
  errors?: FieldErrors<T>;
  hint?: string;
};

const inputOtpCaptionContent = cva('absolute left-0 pt-2 label-medium ', {
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

const Otp = <T extends FieldValues>({ name, control, errors, hint = '' }: OtpProps<T>) => {
  const captionContent = useMemo(() => {
    return errors[name]?.message ?? hint;
  }, [errors, hint]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="mx-auto relative">
          <InputOTP value={field.value || ''} onChange={field.onChange} maxLength={5} containerClassName=" gap-[8px] desktop:gap-[30px]">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTP>

          {captionContent && <span className={cn(inputOtpCaptionContent({ isError: !!errors[name]?.message }))}>{captionContent}</span>}
        </div>
      )}
    />
  );
};

export default Otp;
