import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const SIDEBAR_COOKIE_NAME = 'sidebar:state';

export interface SidebarProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ children, isOpen = false }) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg transition-transform',
        open ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <button
        className="absolute top-4 right-4"
        onClick={() => setOpen(!open)}
      >
        Toggle
      </button>
      <div className="p-4">{children}</div>
    </div>
  );
};

export { Sidebar, SIDEBAR_COOKIE_NAME };
