import * as React from 'react';

import { useConsoleBridge, type ConsoleLogEntry } from '../../hooks/useConsoleBridge';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';
import { Text } from '../primitives/Text';

/** In-game console with command history and filtering (COMPONENTS.md § Component: Console, DevMode only). */
export type ConsoleVariant = 'dark' | 'light' | 'compact';
export type ConsoleFilter = 'all' | 'log' | 'warn' | 'error' | 'debug';

export interface ConsoleProps {
  maxLines?: number;
  filter?: ConsoleFilter;
  pcEntity?: string;
  variant?: ConsoleVariant;
  onCommand: (command: string) => void;
  className?: string;
  onClear?: () => void;
  onFilterChange?: (filter: string) => void;
  onCopy?: (text: string) => void;
  'aria-label'?: string;
  onExecute?: (command: string, result: unknown) => void;
  autocomplete?: (command: string) => string[];
}

const LEVEL_COLOR: Record<ConsoleLogEntry['level'], string> = {
  log: 'text-white',
  warn: 'text-yellow-400',
  error: 'text-red-400',
  debug: 'text-gray-400',
};

export function Console({
  maxLines = 1000,
  filter: filterProp = 'all',
  pcEntity,
  variant = 'dark',
  onCommand,
  className,
  onClear,
  onFilterChange,
  onCopy,
  'aria-label': ariaLabel = 'Console',
  onExecute,
  autocomplete,
}: ConsoleProps): React.JSX.Element {
  void pcEntity;
  const { logs, clear, filter: applyFilter } = useConsoleBridge({ enabled: true });
  const [filterLevel, setFilterLevel] = React.useState<ConsoleFilter>(filterProp);
  const [command, setCommand] = React.useState('');
  const [history, setHistory] = React.useState<string[]>([]);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  const visibleLogs = applyFilter(filterLevel).slice(-maxLines);

  const handleFilterChange = (next: ConsoleFilter) => {
    setFilterLevel(next);
    onFilterChange?.(next);
  };

  const execute = () => {
    if (!command) return;
    onCommand(command);
    setHistory((prev) => [...prev, command]);
    try {
      onExecute?.(command, undefined);
    } catch (err) {
      onExecute?.(command, err);
    }
    setCommand('');
    setSuggestions([]);
  };

  const updateCommand = (value: string) => {
    setCommand(value);
    setSuggestions(autocomplete ? autocomplete(value) : []);
  };

  return (
    <Box
      role="log"
      aria-label={ariaLabel}
      aria-live="polite"
      className={cn(
        'font-mono text-sm overflow-auto',
        variant === 'dark' && 'bg-black/90 text-white',
        variant === 'light' && 'bg-white text-black',
        variant === 'compact' && 'text-xs',
        className,
      )}
    >
      <div className="flex justify-between p-1">
        <select
          aria-label="Filter level"
          value={filterLevel}
          onChange={(e) => handleFilterChange(e.target.value as ConsoleFilter)}
          className="bg-gray-800 text-white text-xs"
        >
          {(['all', 'log', 'warn', 'error', 'debug'] as const).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onPress={() => onCopy?.(visibleLogs.map((l) => l.args.join(' ')).join('\n'))}
          >
            Copy
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onPress={() => {
              clear();
              onClear?.();
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <div>
        {visibleLogs.map((entry, i) => (
          <div
            key={i}
            className={cn('border-b border-gray-800 px-2 py-0.5', LEVEL_COLOR[entry.level])}
          >
            {entry.args.map((a) => String(a)).join(' ')}
          </div>
        ))}
      </div>
      <div className="flex gap-1 p-1 border-t border-gray-800">
        <Input
          aria-label="Console command"
          value={command}
          list="console-history"
          onChange={(e) => updateCommand(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && execute()}
          className="flex-1"
        />
        <datalist id="console-history">
          {[...history, ...suggestions].map((h, i) => (
            <option key={i} value={h} />
          ))}
        </datalist>
        <Button size="sm" onPress={execute}>
          Run
        </Button>
      </div>
      <Text size="xs" className="sr-only">
        Uses {logs.length} buffered log entries
      </Text>
    </Box>
  );
}

Console.displayName = 'Console';
