import React from 'react';
import { cn } from '@/lib/utils';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio: number;
}

const AspectRatio: React.FC<AspectRatioProps> = ({ ratio, children, className, ...props }) => {
  return (
    <div
      className={cn('relative w-full', className)}
      style={{ paddingBottom: `${100 / ratio}%` }}
      {...props}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

export { AspectRatio };
