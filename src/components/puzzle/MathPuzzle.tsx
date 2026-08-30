import * as React from 'react';

import { useStableId } from '../../internal/useStableId';

import { usePuzzleSubmit } from '../../hooks/usePuzzleSubmit';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';
import { Text } from '../primitives/Text';
import { Puzzle } from './Puzzle';

/**
 * Arithmetic/equation puzzle with input validation (COMPONENTS.md § Component:
 * MathPuzzle). Never parses/evaluates `problem` itself -- deliberately parser-free.
 */
export type MathPuzzleVariant = 'single' | 'multi-step';

export interface MathPuzzleStep {
  problem: string;
  answer: number | number[];
}

export interface MathPuzzleProps {
  problem?: string;
  answer?: number | number[];
  tolerance?: number;
  pcEntity?: string;
  inputType?: 'number' | 'expression';
  className?: string;
  variant?: MathPuzzleVariant;
  problems?: MathPuzzleStep[];
  onSubmit?: (value: number | string) => void;
  onSuccess?: () => void;
  onFailure?: (attempt: number | string) => void;
  onStepComplete?: (index: number) => void;
  'aria-label'?: string;
  showKeypad?: boolean;
  timeLimit?: number;
  onTimeout?: () => void;
}

function isCorrect(value: number, answer: number | number[], tolerance: number): boolean {
  const answers = Array.isArray(answer) ? answer : [answer];
  return answers.some((a) => Math.abs(a - value) <= tolerance);
}

export function MathPuzzle({
  problem,
  answer,
  tolerance = 0,
  pcEntity,
  inputType = 'number',
  className,
  variant = 'single',
  problems = [],
  onSubmit,
  onSuccess,
  onFailure,
  onStepComplete,
  'aria-label': ariaLabel = 'Math puzzle',
  showKeypad = false,
  timeLimit,
  onTimeout,
}: MathPuzzleProps): React.JSX.Element {
  const puzzleId = useStableId('math-puzzle');
  const { submit } = usePuzzleSubmit<number | string>();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [value, setValue] = React.useState('');

  const currentProblem =
    variant === 'multi-step'
      ? problems[currentStep]
      : { problem: problem ?? '', answer: answer ?? 0 };

  React.useEffect(() => {
    if (!timeLimit) return;
    const id = setTimeout(() => onTimeout?.(), timeLimit * 1000);
    return () => clearTimeout(id);
  }, [timeLimit, onTimeout, currentStep]);

  const handleSubmit = async () => {
    const raw: number | string = inputType === 'number' ? Number(value) : value;
    onSubmit?.(raw);
    const valid = await submit(raw, (candidate) => {
      if (inputType === 'expression') return typeof candidate === 'string';
      return (
        typeof candidate === 'number' &&
        isCorrect(candidate, currentProblem?.answer ?? 0, tolerance)
      );
    });
    if (valid) {
      onSuccess?.();
      if (variant === 'multi-step') {
        onStepComplete?.(currentStep);
        setCurrentStep((s) => s + 1);
      }
    } else {
      onFailure?.(raw);
    }
    setValue('');
  };

  return (
    <Puzzle
      puzzleId={puzzleId}
      type="logic"
      pcEntity={pcEntity}
      aria-label={ariaLabel}
      className={className}
    >
      <div role="group" aria-label={ariaLabel} className="flex flex-col items-center gap-4">
        <Text size="2xl" fontFamily="mono" aria-live="polite">
          {currentProblem?.problem}
        </Text>
        <Input
          aria-label={`Answer for: ${currentProblem?.problem}`}
          type={inputType === 'number' ? 'number' : 'text'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-24 text-center text-2xl"
        />
        {showKeypad && (
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
              <Button key={n} variant="ghost" size="sm" onPress={() => setValue((v) => v + n)}>
                {n}
              </Button>
            ))}
          </div>
        )}
        <Button onPress={handleSubmit}>Submit</Button>
      </div>
    </Puzzle>
  );
}

MathPuzzle.displayName = 'MathPuzzle';
