import * as React from 'react';

import type { ToastData, ToastInput } from '../types';

let toastIdCounter = 0;

/** Toast queue management (docs/API.md § useToast). */
export function useToast(options: { defaultDuration?: number; maxToasts?: number } = {}): {
  toasts: ToastData[];
  addToast: (toast: ToastInput) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
} {
  const { defaultDuration = 4000, maxToasts = 5 } = options;
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback(
    (toast: ToastInput) => {
      const id = `toast-${++toastIdCounter}`;
      const duration = (toast.duration as number | undefined) ?? defaultDuration;
      setToasts((prev) => {
        const next = [...prev, { id, duration, ...toast }];
        return next.length > maxToasts ? next.slice(next.length - maxToasts) : next;
      });
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
      return id;
    },
    [defaultDuration, maxToasts, removeToast],
  );

  const clearAll = React.useCallback(() => setToasts([]), []);

  return { toasts, addToast, removeToast, clearAll };
}
