import * as React from 'react';

import { useStableId } from '../../internal/useStableId';
import { useDrag } from '@use-gesture/react';

import { usePuzzleSubmit } from '../../hooks/usePuzzleSubmit';
import { cn } from '../../internal/cn';
import { Puzzle } from './Puzzle';

/** Rotating-dial or multi-wheel combination lock, distinct from CodePuzzle's direct
 * digit entry (COMPONENTS.md § Component: CombinationLock). */
export type CombinationLockVariant = 'dial' | 'wheel-strip';

export interface CombinationLockProps {
  wheels: number;
  range?: { min: number; max: number };
  correctCombination: number[];
  pcEntity?: string;
  values?: number[];
  className?: string;
  variant?: CombinationLockVariant;
  onChange?: (values: number[]) => void;
  onWheelChange?: (wheelIndex: number, value: number) => void;
  onSubmit?: (values: number[]) => void;
  autoCheck?: boolean;
  onSuccess?: () => void;
  onFailure?: () => void;
  'aria-label'?: string;
  wrapAround?: boolean;
  dragSensitivity?: number;
}

function Wheel({
  value,
  range,
  wrapAround,
  dragSensitivity,
  variant,
  onChange,
}: {
  value: number;
  range: { min: number; max: number };
  wrapAround: boolean;
  dragSensitivity: number;
  variant: CombinationLockVariant;
  onChange: (next: number) => void;
}) {
  const startValueRef = React.useRef(value);
  const bind = useDrag(({ movement: [, my], first }) => {
    if (first) startValueRef.current = value;
    const delta = Math.round(-my / dragSensitivity);
    let next = startValueRef.current + delta;
    const span = range.max - range.min + 1;
    if (wrapAround) next = range.min + ((((next - range.min) % span) + span) % span);
    else next = Math.max(range.min, Math.min(range.max, next));
    if (next !== value) onChange(next);
  });

  const adjust = (delta: number) => {
    const span = range.max - range.min + 1;
    let next = value + delta;
    if (wrapAround) next = range.min + ((((next - range.min) % span) + span) % span);
    else next = Math.max(range.min, Math.min(range.max, next));
    onChange(next);
  };

  return (
    <div
      {...bind()}
      role="slider"
      tabIndex={0}
      aria-valuenow={value}
      aria-valuemin={range.min}
      aria-valuemax={range.max}
      onKeyDown={(e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') adjust(1);
        if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') adjust(-1);
      }}
      className={cn(
        variant === 'dial'
          ? 'w-16 h-16 rounded-full border-4 flex items-center justify-center touch-none select-none'
          : 'overflow-hidden h-12 w-8 flex items-center justify-center border touch-none select-none',
      )}
    >
      <span className="text-white text-lg font-mono">{value}</span>
    </div>
  );
}

export function CombinationLock({
  wheels,
  range = { min: 0, max: 9 },
  correctCombination,
  pcEntity,
  values: controlledValues,
  className,
  variant = 'dial',
  onChange,
  onWheelChange,
  onSubmit,
  autoCheck = true,
  onSuccess,
  onFailure,
  'aria-label': ariaLabel = 'Combination lock',
  wrapAround = true,
  dragSensitivity = 20,
}: CombinationLockProps): React.JSX.Element {
  const puzzleId = useStableId('combination-lock');
  const { submit } = usePuzzleSubmit<number[]>();
  const [uncontrolledValues, setUncontrolledValues] = React.useState<number[]>(() =>
    Array(wheels).fill(range.min),
  );
  const isControlled = controlledValues !== undefined;
  const values = isControlled ? controlledValues : uncontrolledValues;

  const check = React.useCallback(
    async (candidate: number[]) => {
      const valid = await submit(candidate, (c) => c.every((v, i) => v === correctCombination[i]));
      if (valid) onSuccess?.();
      else onFailure?.();
      return valid;
    },
    [submit, correctCombination, onSuccess, onFailure],
  );

  const setWheel = (index: number, value: number) => {
    const next = [...values];
    next[index] = value;
    if (!isControlled) setUncontrolledValues(next);
    onChange?.(next);
    onWheelChange?.(index, value);
    if (autoCheck) void check(next);
  };

  return (
    <Puzzle
      puzzleId={puzzleId}
      type="code"
      pcEntity={pcEntity}
      aria-label={ariaLabel}
      className={className}
    >
      <div role="group" aria-label={ariaLabel} className="flex gap-2">
        {values.map((value, index) => (
          <Wheel
            key={index}
            value={value}
            range={range}
            wrapAround={wrapAround}
            dragSensitivity={dragSensitivity}
            variant={variant}
            onChange={(next) => setWheel(index, next)}
          />
        ))}
      </div>
      {!autoCheck && (
        <button
          type="button"
          className="mt-2 text-sm text-blue-400"
          onClick={() => {
            onSubmit?.(values);
            void check(values);
          }}
        >
          Submit
        </button>
      )}
    </Puzzle>
  );
}

CombinationLock.displayName = 'CombinationLock';
