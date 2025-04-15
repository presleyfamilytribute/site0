import React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';

const ToastProvider = ToastPrimitives.Provider;
const ToastRoot = ToastPrimitives.Root;
const ToastTitle = ToastPrimitives.Title;
const ToastDescription = ToastPrimitives.Description;
const ToastAction = ToastPrimitives.Action;
const ToastClose = ToastPrimitives.Close;

interface ToastProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, description, action, onClose }) => {
  return (
    <ToastRoot onOpenChange={(open) => !open && onClose?.()}>
      <ToastTitle>{title}</ToastTitle>
      {description && <ToastDescription>{description}</ToastDescription>}
      {action && <ToastAction>{action}</ToastAction>}
      <ToastClose />
    </ToastRoot>
  );
};

export { ToastProvider, Toast };
