import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';

import { useAccordionSync } from '../../hooks/useAccordionSync';
import { cn } from '../../internal/cn';

/**
 * Collapsible sections with a header and expandable content, generalizing the
 * collapsible behavior already used ad hoc by `Objectives` (COMPONENTS.md §
 * Component: Accordion). Uses Radix Accordion.
 */
export type AccordionVariant = 'default' | 'bordered' | 'ghost';

export interface AccordionItemDef {
  id: string;
  header: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemDef[];
  type?: 'single' | 'multiple';
  expanded?: string[];
  defaultExpanded?: string[];
  /** In `type="single"` mode, allow closing the last open section entirely
   * (default: `true`). */
  collapsible?: boolean;
  onToggle?: (id: string) => void;
  onChange?: (expanded: string[]) => void;
  pcEntity?: string;
  variant?: AccordionVariant;
  className?: string;
  'aria-label'?: string;
  mountOnExpand?: boolean;
}

const VARIANT_CLASSES: Record<AccordionVariant, string> = {
  default: 'divide-y divide-gray-700',
  bordered: 'divide-y divide-gray-700 border border-gray-700 rounded-lg',
  ghost: '',
};

export function Accordion({
  items,
  type = 'single',
  expanded: controlledExpanded,
  defaultExpanded = [],
  collapsible = true,
  onToggle,
  onChange,
  pcEntity,
  variant = 'default',
  className,
  'aria-label': ariaLabel,
  mountOnExpand = false,
}: AccordionProps): React.JSX.Element {
  const [uncontrolled, setUncontrolled] = React.useState<string[]>(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : uncontrolled;

  const { setExpanded: syncExpanded } = useAccordionSync({ pcEntity });

  const commit = (next: string[]) => {
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
    if (pcEntity) syncExpanded(next);
  };

  const handleValueChange = (value: string | string[]) => {
    const next: string[] = Array.isArray(value) ? value : value ? [value] : [];
    const toggledId = findToggled(expanded, next);
    if (toggledId) onToggle?.(toggledId);
    commit(next);
  };

  const itemNodes = items.map((item) => {
    const isExpanded = expanded.includes(item.id);
    return (
      <RadixAccordion.Item key={item.id} value={item.id} disabled={item.disabled}>
        <RadixAccordion.Header>
          <RadixAccordion.Trigger className="w-full flex items-center justify-between p-3 hover:bg-gray-800 text-left">
            {item.header}
            <span
              aria-hidden="true"
              className={cn('transition-transform', isExpanded && 'rotate-180')}
            >
              ▾
            </span>
          </RadixAccordion.Trigger>
        </RadixAccordion.Header>
        <RadixAccordion.Content className="p-3">
          {(!mountOnExpand || isExpanded) && item.content}
        </RadixAccordion.Content>
      </RadixAccordion.Item>
    );
  });

  const rootClassName = cn(VARIANT_CLASSES[variant], className);

  if (type === 'single') {
    return (
      <RadixAccordion.Root
        type="single"
        value={expanded[0] ?? ''}
        onValueChange={handleValueChange}
        collapsible={collapsible}
        aria-label={ariaLabel}
        className={rootClassName}
      >
        {itemNodes}
      </RadixAccordion.Root>
    );
  }

  return (
    <RadixAccordion.Root
      type="multiple"
      value={expanded}
      onValueChange={handleValueChange}
      aria-label={ariaLabel}
      className={rootClassName}
    >
      {itemNodes}
    </RadixAccordion.Root>
  );
}

Accordion.displayName = 'Accordion';

function findToggled(prev: string[], next: string[]): string | undefined {
  const added = next.find((id) => !prev.includes(id));
  if (added) return added;
  return prev.find((id) => !next.includes(id));
}
