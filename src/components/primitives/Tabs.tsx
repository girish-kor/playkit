import * as React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';

import { cn } from '../../internal/cn';

/** Tab navigation for grouping content (COMPONENTS.md § Component: Tabs). Uses Radix
 * Tabs for accessibility. */
export type TabsVariant = 'default' | 'pills' | 'underline';

export interface TabDef {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  lazy?: boolean;
  closable?: boolean;
}

export interface TabsProps {
  tabs: TabDef[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (id: string) => void;
  onTabChange?: (id: string) => void;
  canClose?: boolean;
  onTabClose?: (id: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  variant?: TabsVariant;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  tabPanelClassName?: string;
  'aria-label'?: string;
  tabListClassName?: string;
  tabClassName?: string;
  panelClassName?: string;
  onTabFocus?: (id: string) => void;
}

const LIST_VARIANT_CLASSES: Record<TabsVariant, string> = {
  default: 'flex border-b border-gray-700 gap-2',
  pills: 'flex gap-2',
  underline: 'flex border-b border-gray-700 gap-4',
};

function triggerClasses(variant: TabsVariant, isActive: boolean): string {
  if (variant === 'pills') {
    return cn(
      'px-3 py-1.5 rounded-full',
      isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800',
    );
  }
  if (variant === 'underline') {
    return cn(
      'px-1 pb-2 border-b-2',
      isActive
        ? 'border-blue-500 text-white'
        : 'border-transparent text-gray-400 hover:text-gray-200',
    );
  }
  return cn(
    'px-3 py-2',
    isActive ? 'bg-blue-600 text-white rounded-t' : 'text-gray-300 hover:bg-gray-800 rounded-t',
  );
}

export function Tabs({
  tabs,
  activeTab,
  defaultTab,
  onChange,
  onTabChange,
  canClose = false,
  onTabClose,
  orientation = 'horizontal',
  className,
  variant = 'default',
  mountOnEnter = true,
  unmountOnExit = true,
  tabPanelClassName,
  'aria-label': ariaLabel,
  tabListClassName,
  tabClassName,
  panelClassName,
  onTabFocus,
}: TabsProps): React.JSX.Element {
  const firstEnabled = tabs.find((t) => !t.disabled)?.id;
  const [uncontrolled, setUncontrolled] = React.useState(defaultTab ?? firstEnabled);
  const isControlled = activeTab !== undefined;
  const current = isControlled ? activeTab : uncontrolled;

  const handleChange = (id: string) => {
    if (!isControlled) setUncontrolled(id);
    onChange?.(id);
    onTabChange?.(id);
  };

  return (
    <RadixTabs.Root
      value={current}
      onValueChange={handleChange}
      orientation={orientation}
      className={cn(orientation === 'vertical' && 'flex gap-4', className)}
    >
      <RadixTabs.List
        aria-label={ariaLabel}
        className={cn(
          LIST_VARIANT_CLASSES[variant],
          orientation === 'vertical' && 'flex-col border-b-0 border-r',
          tabListClassName,
        )}
      >
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.id}
            value={tab.id}
            disabled={tab.disabled}
            onFocus={() => onTabFocus?.(tab.id)}
            className={cn(triggerClasses(variant, tab.id === current), tabClassName)}
          >
            {tab.label}
            {(tab.closable ?? canClose) && (
              <button
                type="button"
                aria-label={`Close ${tab.label}`}
                className="ml-2 text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose?.(tab.id);
                }}
              >
                ×
              </button>
            )}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content
          key={tab.id}
          value={tab.id}
          forceMount={!(tab.lazy ?? !mountOnEnter) && !unmountOnExit ? true : undefined}
          className={cn('p-3', tabPanelClassName, panelClassName)}
        >
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}

Tabs.displayName = 'Tabs';
