import React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, className, ...props }) => {
  return (
    <div
      className={cn('relative h-10 w-10 rounded-full overflow-hidden bg-gray-200', className)}
      {...props}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
};

export { Avatar };
