import * as React from 'react';

import { Text } from './Text';

/**
 * Accessible label for form elements with optional `htmlFor` (COMPONENTS.md §
 * Component: Label). `variant` is derived automatically from `required`/`optional` —
 * set those, not `variant` (docs/RULES.md's ACID-consistency rule).
 */
export type LabelVariant = 'default' | 'required' | 'optional';

export interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  optional?: boolean;
  /** Visually hide the label but keep it accessible. */
  hidden?: boolean;
  requiredIndicator?: React.ReactNode;
}

export function Label({
  htmlFor,
  children,
  className,
  required = false,
  optional = false,
  hidden = false,
  requiredIndicator = '*',
}: LabelProps): React.JSX.Element {
  const variant: LabelVariant = required ? 'required' : optional ? 'optional' : 'default';

  return (
    <Text
      as="label"
      htmlFor={htmlFor}
      size="sm"
      weight="medium"
      className={
        hidden ? `sr-only ${className ?? ''}`.trim() : `block mb-1 ${className ?? ''}`.trim()
      }
      data-variant={variant}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="text-red-500 ml-0.5">
          {requiredIndicator}
        </span>
      )}
      {optional && <span className="text-gray-500 ml-1 text-xs font-normal">(optional)</span>}
    </Text>
  );
}

Label.displayName = 'Label';
