import * as React from 'react';

import { useTransition } from '../../hooks/useTransition';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Text } from '../primitives/Text';
import type { NavItem } from '../../types';

/**
 * Primary navigation between game screens/rooms with keyboard support
 * (COMPONENTS.md § Component: NavMenu). `path` is opaque -- wiring it into
 * `react-router-dom` (or an equivalent) is the consumer's responsibility via
 * `onNavigate`. react-aria's `useMenu` (named in COMPONENTS.md's Dependencies) expects
 * a react-stately collection (`useTreeState` + `Item`/`Section`), which isn't itself a
 * declared dependency anywhere in docs/DEPENDENCIES.md -- implements the documented
 * ARIA structure (role="menuitem", arrow-key navigation) directly instead.
 */
export type NavMenuVariant = 'horizontal' | 'vertical' | 'dropdown' | 'sidebar';

export interface NavMenuProps {
  items: NavItem[];
  pcEntity?: string;
  className?: string;
  activePath?: string;
  variant?: NavMenuVariant;
  onNavigate?: (path: string) => void;
  onItemClick?: (item: NavItem) => void;
  onHover?: (path: string | null) => void;
  onItemHover?: (item: NavItem | null) => void;
  onItemFocus?: (item: NavItem) => void;
  onOpenChange?: (open: boolean) => void;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  'aria-label'?: string;
  activeClassName?: string;
  closeOnClick?: boolean;
  keyboardShortcut?: string;
}

export function NavMenu({
  items,
  pcEntity,
  className,
  activePath,
  variant = 'horizontal',
  onNavigate,
  onItemClick,
  onHover,
  onItemHover,
  onItemFocus,
  onOpenChange,
  onMenuOpen,
  onMenuClose,
  'aria-label': ariaLabel = 'Main navigation',
  activeClassName = 'bg-primary',
  closeOnClick = true,
  keyboardShortcut,
}: NavMenuProps): React.JSX.Element {
  const { start } = useTransition({ target: '' });
  void pcEntity;
  const [isOpen, setIsOpen] = React.useState(variant !== 'dropdown');

  const setOpen = (next: boolean) => {
    setIsOpen(next);
    onOpenChange?.(next);
    if (next) onMenuOpen?.();
    else onMenuClose?.();
  };

  React.useEffect(() => {
    if (!keyboardShortcut || typeof window === 'undefined') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === keyboardShortcut.toLowerCase()) setOpen(!isOpen);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardShortcut, isOpen]);

  const navigate = (item: NavItem) => {
    if (item.disabled) return;
    if (item.path) {
      onNavigate?.(item.path);
      onItemClick?.(item);
      void start();
    }
    if (closeOnClick && variant === 'dropdown') setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const isHorizontal = variant === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    if (e.key === nextKey || e.key === prevKey) {
      e.preventDefault();
      const delta = e.key === nextKey ? 1 : -1;
      const next = (index + delta + items.length) % items.length;
      (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
    }
  };

  return (
    <Box
      role="navigation"
      aria-label={ariaLabel}
      className={cn(
        'flex gap-2 p-2',
        variant === 'vertical' || variant === 'sidebar' ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {isOpen &&
        items.map((item, index) => (
          <Button
            key={item.id}
            role="menuitem"
            variant="ghost"
            disabled={item.disabled}
            aria-current={item.path && activePath === item.path ? 'page' : undefined}
            className={cn(item.path && activePath === item.path && activeClassName)}
            onPress={() => navigate(item)}
            onHoverStart={() => {
              onHover?.(item.path ?? null);
              onItemHover?.(item);
            }}
            onFocus={() => onItemFocus?.(item)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            startIcon={item.icon}
          >
            <Text as="span">{item.label}</Text>
          </Button>
        ))}
    </Box>
  );
}

NavMenu.displayName = 'NavMenu';
