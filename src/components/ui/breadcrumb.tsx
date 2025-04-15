import React from 'react';
import { cn } from '@/lib/utils';

export interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <a href={item.href} className="text-primary hover:underline">
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span className="text-muted">/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export { Breadcrumb };
