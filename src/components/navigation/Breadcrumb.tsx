import * as React from 'react';

import { useTransition } from '../../hooks/useTransition';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';

/** Trail of navigation path segments for deep menu structures (COMPONENTS.md § Component: Breadcrumb). */
export interface BreadcrumbItem {
  id: string;
  label: string;
  path?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  pcEntity?: string;
  separator?: React.ReactNode;
  className?: string;
  onNavigate?: (path: string) => void;
  maxVisible?: number;
  onEllipsisClick?: () => void;
  'aria-label'?: string;
}

export function Breadcrumb({
  items,
  pcEntity,
  separator,
  className,
  onNavigate,
  maxVisible,
  onEllipsisClick,
  'aria-label': ariaLabel = 'Breadcrumb',
}: BreadcrumbProps): React.JSX.Element {
  const { start } = useTransition({ target: '' });
  void pcEntity;

  const visibleItems =
    maxVisible && items.length > maxVisible
      ? [
          items[0]!,
          { id: '__ellipsis__', label: '…' },
          ...items.slice(-Math.max(1, maxVisible - 1)),
        ]
      : items;

  const navigate = (item: BreadcrumbItem) => {
    if (item.path) {
      onNavigate?.(item.path);
      void start();
    }
  };

  return (
    <Box
      role="navigation"
      aria-label={ariaLabel}
      className={cn('flex items-center gap-1 text-sm', className)}
    >
      <ol className="flex items-center gap-1">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = item.id === '__ellipsis__';
          return (
            <li key={item.id} className="flex items-center gap-1">
              {index > 0 &&
                (separator ?? <Icon name="chevron-right" size={4} className="text-gray-500" />)}
              {isEllipsis ? (
                <button
                  type="button"
                  onClick={onEllipsisClick}
                  className="text-gray-400 hover:text-white"
                >
                  {item.label}
                </button>
              ) : isLast ? (
                <span aria-current="page" className="text-white font-medium">
                  {item.label}
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  as="a"
                  className="text-gray-400 hover:text-white"
                  onPress={() => navigate(item)}
                >
                  {item.label}
                </Button>
              )}
            </li>
          );
        })}
      </ol>
    </Box>
  );
}

Breadcrumb.displayName = 'Breadcrumb';
