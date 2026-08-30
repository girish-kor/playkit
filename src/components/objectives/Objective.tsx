import * as React from 'react';

import { useObjectiveProgress } from '../../hooks/useObjectiveProgress';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { Progress } from '../feedback/Progress';
import type { Objective as ObjectiveData } from '../../types';

/** Single objective with progress indicator and subtask expansion (COMPONENTS.md § Component: Objective). */
export type ObjectiveVariant = 'compact' | 'expanded' | 'with-subtasks';

export interface ObjectiveProps {
  objective: ObjectiveData;
  isCompleted?: boolean;
  pcEntity?: string;
  className?: string;
  variant?: ObjectiveVariant;
  onToggle?: (id: string) => void;
  onClick?: (id: string) => void;
  onDoubleClick?: (id: string) => void;
  onUpdateProgress?: (id: string, progress: number) => void;
  onSubtaskComplete?: (subtaskId: string) => void;
  onSubtaskToggle?: (subtaskId: string) => void;
  onSubtaskClick?: (subtaskId: string) => void;
  'aria-label'?: string;
  showProgress?: boolean;
  onExpand?: (id: string) => void;
  onCollapse?: (id: string) => void;
  ariaLevel?: number;
}

export function Objective({
  objective,
  isCompleted,
  pcEntity,
  className,
  variant = 'compact',
  onToggle,
  onClick,
  onDoubleClick,
  onUpdateProgress,
  onSubtaskComplete,
  onSubtaskToggle,
  onSubtaskClick,
  'aria-label': ariaLabel,
  showProgress = true,
  onExpand,
  onCollapse,
  ariaLevel = 1,
}: ObjectiveProps): React.JSX.Element {
  const { progress: syncedProgress } = useObjectiveProgress({
    objectiveId: objective.id,
    pcEntity,
  });
  const [isExpanded, setIsExpanded] = React.useState(variant === 'with-subtasks');

  const progress = pcEntity ? syncedProgress : objective.progress;

  const prevProgressRef = React.useRef(progress);
  React.useEffect(() => {
    if (prevProgressRef.current !== progress && progress !== undefined) {
      prevProgressRef.current = progress;
      onUpdateProgress?.(objective.id, progress);
    }
  }, [progress, objective.id, onUpdateProgress]);

  const completed =
    isCompleted ??
    (progress !== undefined &&
      objective.maxProgress !== undefined &&
      progress >= objective.maxProgress);

  const toggleExpand = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    onToggle?.(objective.id);
    if (next) onExpand?.(objective.id);
    else onCollapse?.(objective.id);
  };

  return (
    <Box
      role="listitem"
      aria-label={ariaLabel ?? objective.name}
      aria-level={ariaLevel}
      aria-live="polite"
      className={cn(
        'flex flex-col gap-1 p-2 rounded hover:bg-gray-800',
        completed && 'opacity-50 line-through',
        className,
      )}
    >
      {/* Click-anywhere-on-the-row is a documented, additional affordance alongside the
          nested toggle Button; role="button" + onKeyDown below make it keyboard-accessible. */}
      <div
        role="button"
        tabIndex={0}
        className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400 rounded"
        onClick={() => onClick?.(objective.id)}
        onDoubleClick={() => onDoubleClick?.(objective.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(objective.id);
          }
        }}
      >
        {objective.subtasks && objective.subtasks.length > 0 && (
          <Button
            variant="icon-only"
            size="sm"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            onPress={toggleExpand}
          >
            <Icon name={isExpanded ? 'chevron-down' : 'chevron-right'} />
          </Button>
        )}
        <Text className="text-white">{objective.name}</Text>
      </div>
      {objective.description && variant !== 'compact' && (
        <Text size="sm" className="text-gray-400">
          {objective.description}
        </Text>
      )}
      {showProgress && objective.maxProgress !== undefined && (
        <Progress value={progress ?? 0} max={objective.maxProgress} height={6} />
      )}
      {isExpanded && objective.subtasks && (
        <ul className="pl-6 flex flex-col gap-1">
          {objective.subtasks.map((subtask) => (
            // The checkbox below is the primary interactive control; this row-level
            // onClick is a documented, secondary affordance (onSubtaskClick, distinct
            // from the checkbox's onSubtaskToggle) -- kept keyboard-reachable via the
            // checkbox itself rather than making the whole row a second tab stop.
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              key={subtask.id}
              aria-level={ariaLevel + 1}
              className={cn(
                'flex items-center gap-2 text-sm',
                subtask.completed && 'opacity-50 line-through',
              )}
              onClick={() => onSubtaskClick?.(subtask.id)}
            >
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => {
                  onSubtaskComplete?.(subtask.id);
                  onSubtaskToggle?.(subtask.id);
                }}
                aria-label={subtask.name}
              />
              <Text size="sm">{subtask.name}</Text>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

Objective.displayName = 'Objective';
