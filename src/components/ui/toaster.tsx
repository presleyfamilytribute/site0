import React from 'react';
import { ToastProvider, Toast } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          description={toast.description}
          action={toast.action}
          onClose={() => toast.onClose?.()}
        />
      ))}
    </ToastProvider>
  );
}
