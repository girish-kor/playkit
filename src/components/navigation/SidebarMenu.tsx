import * as React from 'react';

import { useTransition } from '../../hooks/useTransition';
import { cn } from '../../internal/cn';
import { Button } from '../primitives/Button';
import { Flex } from '../primitives/Flex';
import { Text } from '../primitives/Text';
import type { NavItem } from '../../types';

/**
 * Vertical, collapsible navigation panel, distinct from `NavMenu`'s
 * horizontal/dropdown orientation (COMPONENTS.md § Component: SidebarMenu). Shares
 * `NavItem` typing and the `useTransition` integration with `NavMenu`.
 */
export type SidebarMenuVariant = 'push' | 'overlay';

export interface SidebarMenuProps {
  items: NavItem[];
  pcEntity?: string;
  activePath?: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsible?: boolean;
  width?: number;
  collapsedWidth?: number;
  className?: string;
  onNavigate?: (path: string) => void;
  onItemClick?: (item: NavItem) => void;
  variant?: SidebarMenuVariant;
  'aria-label'?: string;
  pinnable?: boolean;
}

export function SidebarMenu({
  items,
  pcEntity,
  activePath,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  collapsible = true,
  width = 240,
  collapsedWidth = 64,
  className,
  onNavigate,
  onItemClick,
  variant = 'push',
  'aria-label': ariaLabel = 'Sidebar navigation',
  pinnable = false,
}: SidebarMenuProps): React.JSX.Element {
  const { start } = useTransition({ target: '' });
  void pcEntity;
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed);
  const [isPinned, setIsPinned] = React.useState(false);
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : uncontrolledCollapsed;

  const setCollapsed = (next: boolean) => {
    if (!collapsible) return;
    if (!isControlled) setUncontrolledCollapsed(next);
    onCollapsedChange?.(next);
  };

  const navigate = (item: NavItem) => {
    if (item.disabled) return;
    if (item.path) {
      onNavigate?.(item.path);
      onItemClick?.(item);
      void start();
    }
  };

  return (
    <nav
      role="navigation"
      aria-label={ariaLabel}
      className={cn(
        'h-full flex flex-col transition-[width]',
        variant === 'overlay' && 'fixed left-0 top-0 z-40',
        className,
      )}
      style={{ width: collapsed && !isPinned ? collapsedWidth : width }}
    >
      <Flex direction="col" gap={1} className="flex-1">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            aria-label={item.label}
            aria-current={item.path && activePath === item.path ? 'page' : undefined}
            disabled={item.disabled}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 justify-start"
            onPress={() => navigate(item)}
            startIcon={item.icon}
          >
            {(!collapsed || isPinned) && <Text as="span">{item.label}</Text>}
          </Button>
        ))}
      </Flex>
      {collapsible && (
        <Button
          variant="ghost"
          size="sm"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onPress={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '»' : '«'}
        </Button>
      )}
      {pinnable && variant === 'overlay' && (
        <Button
          variant="ghost"
          size="sm"
          aria-pressed={isPinned}
          onPress={() => setIsPinned((v) => !v)}
        >
          Pin
        </Button>
      )}
    </nav>
  );
}

SidebarMenu.displayName = 'SidebarMenu';
