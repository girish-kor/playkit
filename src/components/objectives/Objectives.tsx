import * as React from 'react';

import { useObjectiveSync } from '../../hooks/useObjectiveSync';
import { cn } from '../../internal/cn';
import { Box } from '../primitives/Box';
import { Flex } from '../primitives/Flex';
import { Objective } from './Objective';
import type { Objective as ObjectiveData } from '../../types';

/** Main objectives display with progress and completion tracking (COMPONENTS.md § Component: Objectives). */
export type ObjectivesVariant = 'list' | 'compact' | 'sidebar' | 'timeline';
export type ObjectivesSortOrder = 'default' | 'progress' | 'alphabetical';
export type ObjectivesGroupBy = 'status' | 'type' | 'none';

export interface ObjectivesProps {
  objectives: ObjectiveData[];
  pcEntity?: string;
  showCompleted?: boolean;
  className?: string;
  variant?: ObjectivesVariant;
  sortOrder?: ObjectivesSortOrder;
  emptyState?: React.ReactNode;
  onComplete?: (id: string) => void;
  onObjectiveComplete?: (id: string) => void;
  onUpdate?: (id: string, progress: number) => void;
  onObjectiveProgress?: (id: string, progress: number) => void;
  onObjectiveAdd?: (objective: ObjectiveData) => void;
  onObjectiveRemove?: (id: string) => void;
  onToggle?: (id: string) => void;
  'aria-label'?: string;
  groupBy?: ObjectivesGroupBy;
  onGroupChange?: (group: string) => void;
  onReorder?: (newOrder: string[]) => void;
  collapsible?: boolean;
}

function isComplete(objective: ObjectiveData): boolean {
  if (objective.progress === undefined) return false;
  const max = objective.maxProgress ?? 1;
  return objective.progress >= max;
}

export function Objectives({
  objectives: objectivesProp,
  pcEntity,
  showCompleted = true,
  className,
  variant = 'list',
  sortOrder = 'default',
  emptyState,
  onComplete,
  onObjectiveComplete,
  onUpdate,
  onObjectiveProgress,
  onObjectiveAdd,
  onObjectiveRemove,
  onToggle,
  'aria-label': ariaLabel = 'Objectives',
}: ObjectivesProps): React.JSX.Element {
  const synced = useObjectiveSync({ pcEntity });
  const objectives = pcEntity ? synced.objectives : objectivesProp;

  const prevIdsRef = React.useRef<Set<string>>(new Set(objectives.map((o) => o.id)));
  const wasCompleteRef = React.useRef<Map<string, boolean>>(
    new Map(objectives.map((o) => [o.id, isComplete(o)])),
  );

  React.useEffect(() => {
    const currentIds = new Set(objectives.map((o) => o.id));
    for (const objective of objectives) {
      if (!prevIdsRef.current.has(objective.id)) onObjectiveAdd?.(objective);
      const nowComplete = isComplete(objective);
      const wasComplete = wasCompleteRef.current.get(objective.id) ?? false;
      if (nowComplete && !wasComplete) {
        onComplete?.(objective.id);
        onObjectiveComplete?.(objective.id);
      }
      if (objective.progress !== undefined) {
        onUpdate?.(objective.id, objective.progress);
        onObjectiveProgress?.(objective.id, objective.progress);
      }
      wasCompleteRef.current.set(objective.id, nowComplete);
    }
    for (const id of prevIdsRef.current) {
      if (!currentIds.has(id)) onObjectiveRemove?.(id);
    }
    prevIdsRef.current = currentIds;
  }, [
    objectives,
    onObjectiveAdd,
    onComplete,
    onObjectiveComplete,
    onUpdate,
    onObjectiveProgress,
    onObjectiveRemove,
  ]);

  const visible = React.useMemo(() => {
    let list = showCompleted ? objectives : objectives.filter((o) => !isComplete(o));
    if (sortOrder === 'alphabetical') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === 'progress')
      list = [...list].sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0));
    return list;
  }, [objectives, showCompleted, sortOrder]);

  return (
    <Box
      role="navigation"
      aria-label={ariaLabel}
      className={cn('bg-gray-900/90 text-white p-4 rounded-lg', className)}
    >
      {visible.length === 0 ? (
        (emptyState ?? <span className="text-gray-400 text-sm">No objectives</span>)
      ) : (
        <Flex direction="col" gap={2} aria-live="polite">
          {visible.map((objective) => (
            <Objective
              key={objective.id}
              objective={objective}
              isCompleted={isComplete(objective)}
              variant={variant === 'compact' ? 'compact' : 'with-subtasks'}
              onToggle={onToggle}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
}

Objectives.displayName = 'Objectives';
