import * as React from 'react';

import { useAnnounce } from '../../hooks/useAnnounce';
import { cn } from '../../internal/cn';
import { useLatest } from '../../internal/useLatest';
import { Text } from '../primitives/Text';

/** Screen reader announcements with priority (COMPONENTS.md § Component: ScreenReader). */
export type ScreenReaderPriority = 'polite' | 'assertive';

export interface ScreenReaderProps {
  message: string;
  priority?: ScreenReaderPriority;
  pcEntity?: string;
  debounce?: number;
  className?: string;
  onAnnounce?: (data: { message: string; priority: ScreenReaderPriority }) => void;
  onClear?: () => void;
  onPriorityChange?: (priority: string) => void;
  'aria-label'?: string;
}

export const ScreenReader = React.forwardRef<HTMLElement, ScreenReaderProps>(function ScreenReader(
  {
    message,
    priority = 'polite',
    debounce = 100,
    className,
    onAnnounce,
    onClear: _onClear,
    onPriorityChange,
    'aria-label': ariaLabel,
  },
  ref,
) {
  const { announce } = useAnnounce({ debounce });
  const [displayed, setDisplayed] = React.useState('');

  const onAnnounceRef = useLatest(onAnnounce);
  const prevPriorityRef = React.useRef(priority);

  React.useEffect(() => {
    if (prevPriorityRef.current !== priority) {
      prevPriorityRef.current = priority;
      onPriorityChange?.(priority);
    }
  }, [priority, onPriorityChange]);

  React.useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setDisplayed(message);
      announce(message, priority);
      onAnnounceRef.current?.({ message, priority });
    }, debounce);
    return () => clearTimeout(timer);
  }, [message, priority, debounce, announce, onAnnounceRef]);

  return (
    <Text
      ref={ref}
      as="div"
      aria-label={ariaLabel}
      aria-live={priority}
      aria-atomic="true"
      className={cn('sr-only', className)}
    >
      {displayed}
    </Text>
  );
});

ScreenReader.displayName = 'ScreenReader';
