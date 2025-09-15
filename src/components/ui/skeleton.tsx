import { cn } from '@/util/utils';
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="skeleton" className={cn('relative overflow-hidden bg-[#e0e0e0] ', className)} {...props}>
      <span className="absolute w-full h-full animate-shimmer bg-[linear-gradient(90deg,#e0e0e0_25%,#f0f0f0_50%,#e0e0e0_75%)] bg-[length:200%_100%]"></span>
    </div>
  );
}

export default Skeleton;
