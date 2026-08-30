import * as React from 'react';

import { useDevAPI } from '../../hooks/useDevAPI';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Tabs } from '../primitives/Tabs';
import { Console } from './Console';
import { Inspector } from './Inspector';

/**
 * Developer tools panel for debugging, only in DevMode (COMPONENTS.md § Component:
 * DevTools). Never reachable from the production entry point (docs/BUILD.md,
 * docs/LOGGING.md) -- enforced by the separate `game-ui-components/devtools` export.
 */
export type DevToolsVariant = 'compact' | 'full' | 'floating' | 'docked';

export interface DevToolsProps {
  enabled?: boolean;
  pcEntity?: string;
  pcApp?: unknown;
  pcScene?: unknown;
  variant?: DevToolsVariant;
  floatingPosition?: { x: number; y: number };
  initialTab?: string;
  className?: string;
  onToggle?: () => void;
  onClearLogs?: () => void;
  onExecuteCommand?: (cmd: string) => void;
  onTabChange?: (tab: string) => void;
  'aria-label'?: string;
  keyboardShortcut?: string;
  onOpen?: (e?: React.SyntheticEvent) => void;
  onClose?: (e?: React.SyntheticEvent) => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  showDevTools?: boolean;
}

function defaultEnabled(): boolean {
  try {
    return typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';
  } catch {
    return false;
  }
}

export function DevTools({
  enabled,
  pcEntity,
  pcApp,
  pcScene,
  variant = 'docked',
  floatingPosition,
  initialTab = 'console',
  className,
  onToggle,
  onClearLogs,
  onExecuteCommand,
  onTabChange,
  'aria-label': ariaLabel = 'Developer tools',
  keyboardShortcut = '`',
  onOpen,
  onClose,
  onMinimize,
  onMaximize,
  showDevTools,
}: DevToolsProps): React.JSX.Element | null {
  const isEnabled = enabled ?? defaultEnabled();
  useDevAPI({ pcApp });
  const [isOpen, setIsOpen] = React.useState(showDevTools ?? true);
  const [isMinimized, setIsMinimized] = React.useState(variant === 'compact');
  const [position, setPosition] = React.useState(floatingPosition ?? { x: 0, y: 0 });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === keyboardShortcut) {
        setIsOpen((prev) => {
          const next = !prev;
          onToggle?.();
          if (next) onOpen?.();
          else onClose?.();
          return next;
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [keyboardShortcut, onToggle, onOpen, onClose]);

  const toggleMinimize = () => {
    setIsMinimized((prev) => {
      const next = !prev;
      if (next) onMinimize?.();
      else onMaximize?.();
      return next;
    });
  };

  if (!isEnabled) return null;

  return (
    <Box
      role="region"
      aria-label={ariaLabel}
      aria-hidden={isMinimized}
      className={cn(
        variant === 'floating' ? 'fixed' : 'fixed bottom-0 left-0 right-0 h-64',
        'bg-gray-900/95 z-[9999] border-t-2',
        isMinimized && 'h-8 overflow-hidden',
        !isOpen && 'hidden',
        className,
      )}
      style={variant === 'floating' ? { left: position.x, top: position.y } : undefined}
      onPointerDown={(e) => {
        if (variant !== 'floating') return;
        const startX = e.clientX - position.x;
        const startY = e.clientY - position.y;
        const move = (ev: PointerEvent) =>
          setPosition({ x: ev.clientX - startX, y: ev.clientY - startY });
        const up = () => {
          window.removeEventListener('pointermove', move);
          window.removeEventListener('pointerup', up);
        };
        window.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
      }}
    >
      <div className="flex justify-between items-center px-2 py-1 border-b border-gray-700">
        <span className="text-white text-xs">DevTools</span>
        <Button
          variant="icon-only"
          size="sm"
          aria-label={isMinimized ? 'Maximize' : 'Minimize'}
          onPress={toggleMinimize}
        >
          {isMinimized ? '▲' : '▼'}
        </Button>
      </div>
      {!isMinimized && (
        <Tabs
          aria-label="DevTools tabs"
          defaultTab={initialTab}
          onChange={onTabChange}
          tabs={[
            {
              id: 'console',
              label: 'Console',
              content: (
                <Console
                  onCommand={(cmd) => onExecuteCommand?.(cmd)}
                  onClear={onClearLogs}
                  pcEntity={pcEntity}
                />
              ),
            },
            {
              id: 'inspector',
              label: 'Inspector',
              content: <Inspector pcScene={pcScene} pcEntity={pcEntity} />,
            },
          ]}
        />
      )}
    </Box>
  );
}

DevTools.displayName = 'DevTools';
