import { memo, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type FlashConclusionProps = {
  isFlashing: boolean;
  className?: string;
  children: ReactNode;
};

function FlashConclusion({ isFlashing, className, children }: FlashConclusionProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isFlashing && <div className={cn('pointer-events-none absolute inset-0 bg-transparent')} />}
    </div>
  );
}

export default memo(FlashConclusion);
