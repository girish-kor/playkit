import * as React from 'react';

import { useStableId } from '../../internal/useStableId';

import { useSequenceSubmit } from '../../hooks/useSequenceSubmit';
import { useTimer } from '../../hooks/useTimer';
import { cn } from '../../internal/cn';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { Puzzle } from './Puzzle';

/** Pattern/sequence matching puzzle, e.g. Simon Says (COMPONENTS.md § Component: SequencePuzzle). */
export type SequencePuzzleVariant = 'memory' | 'pattern' | 'rhythm';

export interface SequencePuzzleProps<S = number> {
  sequence: S[];
  visuals?: React.ReactNode[];
  pcEntity?: string;
  delayBetweenSteps?: number;
  className?: string;
  variant?: SequencePuzzleVariant;
  showSequence?: boolean;
  onSequenceStart?: () => void;
  onSequenceEnd?: () => void;
  onStep?: (step: S) => void;
  onStepCorrect?: (step: S, index: number) => void;
  onStepIncorrect?: (step: S, index: number) => void;
  onComplete?: () => void;
  onReset?: () => void;
  onInput?: (step: S) => void;
  onSequenceRepeat?: () => void;
  'aria-label'?: string;
  onFail?: () => void;
  showProgress?: boolean;
  allowReplay?: boolean;
}

export function SequencePuzzle<S = number>({
  sequence,
  visuals,
  pcEntity,
  delayBetweenSteps = 500,
  className,
  variant = 'memory',
  showSequence = true,
  onSequenceStart,
  onSequenceEnd,
  onStep,
  onStepCorrect,
  onStepIncorrect,
  onComplete,
  onReset,
  onInput,
  onSequenceRepeat,
  'aria-label': ariaLabel = 'Sequence puzzle',
  onFail,
  showProgress = true,
  allowReplay = false,
}: SequencePuzzleProps<S>): React.JSX.Element {
  const puzzleId = useStableId('sequence-puzzle');
  const { submit } = useSequenceSubmit<S>();
  useTimer({ initialTime: 0, autoStart: false });

  const [userSequence, setUserSequence] = React.useState<S[]>([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(-1);

  const playSequence = React.useCallback(
    (isRepeat = false) => {
      if (!showSequence) return;
      setIsPlaying(true);
      onSequenceStart?.();
      if (isRepeat) onSequenceRepeat?.();
      sequence.forEach((step, i) => {
        setTimeout(() => {
          setHighlightIndex(i);
          onStep?.(step);
          if (i === sequence.length - 1) {
            setTimeout(() => {
              setHighlightIndex(-1);
              setIsPlaying(false);
              onSequenceEnd?.();
            }, delayBetweenSteps);
          }
        }, i * delayBetweenSteps);
      });
    },
    [
      sequence,
      delayBetweenSteps,
      showSequence,
      onSequenceStart,
      onSequenceEnd,
      onStep,
      onSequenceRepeat,
    ],
  );

  React.useEffect(() => {
    playSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- play once per new sequence identity only.
  }, [sequence]);

  const handleInput = (step: S) => {
    if (isPlaying) return;
    onInput?.(step);
    const next = [...userSequence, step];
    const index = next.length - 1;
    const isCorrect = step === sequence[index];

    if (isCorrect) {
      onStepCorrect?.(step, index);
    } else {
      onStepIncorrect?.(step, index);
      onFail?.();
      setUserSequence([]);
      return;
    }

    setUserSequence(next);
    if (next.length === sequence.length) {
      const success = submit(next, sequence);
      if (success) onComplete?.();
      setUserSequence([]);
    }
  };

  const reset = () => {
    setUserSequence([]);
    onReset?.();
  };

  return (
    <Puzzle
      puzzleId={puzzleId}
      type="sequence"
      pcEntity={pcEntity}
      aria-label={ariaLabel}
      className={className}
    >
      <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-4">
        {sequence.map((step, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Step ${i + 1} of ${sequence.length}`}
            disabled={isPlaying}
            onClick={() => handleInput(step)}
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center bg-gray-700',
              highlightIndex === i && 'bg-blue-500 scale-110',
              variant === 'rhythm' && 'transition-transform',
            )}
          >
            {visuals?.[i] ?? <Icon name="circle" />}
          </button>
        ))}
      </div>
      {showProgress && (
        <div aria-live="polite" className="text-sm text-gray-400 mt-2">
          {userSequence.length} / {sequence.length}
        </div>
      )}
      {allowReplay && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2"
          onPress={() => playSequence(true)}
          disabled={isPlaying}
        >
          Replay
        </Button>
      )}
      <Button variant="ghost" size="sm" className="mt-2 ml-2" onPress={reset}>
        Reset
      </Button>
    </Puzzle>
  );
}

SequencePuzzle.displayName = 'SequencePuzzle';
