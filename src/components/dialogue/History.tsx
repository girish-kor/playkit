import * as React from 'react';

import { useDialogueHistory } from '../../hooks/useDialogueHistory';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { ScrollArea } from '../primitives/ScrollArea';
import { Text } from '../primitives/Text';
import type { HistoryEntry } from '../../types';

/** Scrollable history of dialogue lines with timestamps (COMPONENTS.md § Component: History). */
export type HistoryVariant = 'slide-in' | 'overlay' | 'sidebar';

interface NormalizedEntry {
  text: string;
  timestamp: Date;
  speaker?: string;
}

export interface HistoryProps {
  entries?: HistoryEntry[];
  maxEntries?: number;
  pcEntity?: string;
  className?: string;
  variant?: HistoryVariant;
  onToggle?: () => void;
  onClear?: () => void;
  onEntryClick?: (entry: NormalizedEntry, e: React.MouseEvent) => void;
  onEntryHover?: (entry: NormalizedEntry | null) => void;
  onEntryFocus?: (entry: NormalizedEntry) => void;
  'aria-label'?: string;
  onExport?: (entries: NormalizedEntry[]) => void;
  searchable?: boolean;
  onSearch?: (query: string) => void;
  filter?: (entry: NormalizedEntry) => boolean;
  onFilter?: (visibleCount: number) => void;
  isOpen?: boolean;
}

export function History({
  entries: entriesProp,
  maxEntries = 100,
  pcEntity,
  className,
  variant = 'slide-in',
  onToggle,
  onClear,
  onEntryClick,
  onEntryHover,
  onEntryFocus,
  'aria-label': ariaLabel,
  onExport,
  searchable = false,
  onSearch,
  filter,
  onFilter,
  isOpen = true,
}: HistoryProps): React.JSX.Element {
  const synced = useDialogueHistory({ pcEntity, maxEntries: maxEntries || undefined });

  const normalized = React.useMemo<NormalizedEntry[]>(() => {
    const rawEntries = pcEntity ? synced.entries : (entriesProp ?? []);
    return rawEntries.map((e) => ({
      text: e.text,
      timestamp: e.timestamp instanceof Date ? e.timestamp : new Date(e.timestamp),
      speaker: e.speaker,
    }));
  }, [pcEntity, synced.entries, entriesProp]);

  const [query, setQuery] = React.useState('');
  const visible = React.useMemo(() => {
    let result = maxEntries ? normalized.slice(-maxEntries) : normalized;
    if (filter) result = result.filter(filter);
    if (query) result = result.filter((e) => e.text.toLowerCase().includes(query.toLowerCase()));
    return result;
  }, [normalized, maxEntries, filter, query]);

  React.useEffect(() => {
    onFilter?.(visible.length);
  }, [visible.length, onFilter]);

  return (
    <Box
      role="log"
      aria-label={ariaLabel ?? `Dialogue history, ${visible.length} entries`}
      aria-live="off"
      aria-hidden={!isOpen}
      className={cn(
        'bg-black/90 text-white p-4 max-h-64 rounded-lg',
        variant === 'overlay' && 'fixed inset-0 max-h-none z-40',
        variant === 'sidebar' && 'fixed right-0 top-0 bottom-0 max-h-none w-80 rounded-none',
        variant === 'slide-in' && 'rounded-lg',
        className,
      )}
    >
      <div className="flex justify-between mb-2">
        {searchable && (
          <input
            type="search"
            aria-label="Search history"
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            className="bg-gray-800 rounded px-2 py-1 text-sm"
          />
        )}
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onPress={() => onExport?.(visible)}>
            Export
          </Button>
          <Button size="sm" variant="ghost" onPress={onClear}>
            Clear
          </Button>
          <Button size="sm" variant="ghost" onPress={onToggle}>
            Toggle
          </Button>
        </div>
      </div>
      <ScrollArea autoScroll className="max-h-48 scrollbar-thin">
        {visible.map((entry, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            onClick={(e) => onEntryClick?.(entry, e)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onEntryClick?.(entry, e as unknown as React.MouseEvent);
              }
            }}
            onMouseEnter={() => onEntryHover?.(entry)}
            onMouseLeave={() => onEntryHover?.(null)}
            onFocus={() => onEntryFocus?.(entry)}
            className="py-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <Text size="xs" className="text-gray-400">
              {entry.timestamp.toLocaleString()} {entry.speaker && `— ${entry.speaker}`}
            </Text>
            <Text size="sm">{entry.text}</Text>
          </div>
        ))}
      </ScrollArea>
    </Box>
  );
}

History.displayName = 'History';
