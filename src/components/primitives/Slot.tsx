import * as React from 'react';
import { Slot as RadixSlot } from '@radix-ui/react-slot';

import { useEntity } from '../../hooks/useEntity';

/**
 * Composition primitive for the `asChild` pattern, forwarding refs and props onto its
 * single child (COMPONENTS.md § Component: Slot). Renders no DOM element of its own.
 */
export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement;
  pcEntity?: string;
  /** Merge props with the child's existing props (default: `true`). Props from
   * `Slot` take precedence in case of conflict. */
  mergeProps?: boolean;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, pcEntity, mergeProps = true, ...rest },
  ref,
) {
  // Applies the entity binding to whichever child ends up rendered, matching Box's
  // own `pcEntity` no-op contract (docs/ARCHITECTURE.md's binding model).
  useEntity({ entityId: pcEntity ?? '' });

  if (!mergeProps) {
    return React.cloneElement(children, { ref } as Partial<unknown>);
  }

  return (
    <RadixSlot ref={ref} {...rest}>
      {children}
    </RadixSlot>
  );
});

Slot.displayName = 'Slot';
