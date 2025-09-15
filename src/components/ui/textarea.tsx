import * as React from 'react';
import { cn } from '@/util/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(({ className, ...props }, ref) => {
  return <textarea ref={ref} data-slot="textarea" className={cn(className)} {...props} />;
});

Textarea.displayName = 'Textarea';

export default Textarea;
