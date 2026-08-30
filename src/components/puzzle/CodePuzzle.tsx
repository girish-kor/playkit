import * as React from 'react';

import { useStableId } from '../../internal/useStableId';

import { usePuzzleSubmit } from '../../hooks/usePuzzleSubmit';
import { cn } from '../../internal/cn';
import { Button } from '../primitives/Button';
import { Flex } from '../primitives/Flex';
import { Input } from '../primitives/Input';
import { Puzzle } from './Puzzle';

/** Number/letter code entry puzzle with validation (COMPONENTS.md § Component: CodePuzzle). */
export type CodePuzzleVariant = 'numeric' | 'alphanumeric' | 'symbolic';

export interface CodePuzzleProps {
  codeLength: number;
  correctCode: string | string[];
  pcEntity?: string;
  maskInput?: boolean;
  autoSubmit?: boolean;
  className?: string;
  variant?: CodePuzzleVariant;
  allowPaste?: boolean;
  clearOnInvalid?: boolean;
  onDigitEnter?: (digit: string) => void;
  onDigitFocus?: (index: number) => void;
  onDigitBlur?: (index: number) => void;
  onPaste?: (pasted: string) => void;
  onClear?: () => void;
  onCodeChange?: (code: string) => void;
  onCodeComplete?: (code: string) => void;
  onSubmit?: (code: string) => void;
  onInvalid?: () => void;
  'aria-label'?: string;
  onSuccess?: () => void;
  onFailure?: () => void;
  shakeOnInvalid?: boolean;
  feedback?: React.ReactNode;
}

export function CodePuzzle({
  codeLength,
  correctCode,
  pcEntity,
  maskInput = false,
  autoSubmit = false,
  className,
  variant = 'numeric',
  allowPaste = true,
  clearOnInvalid = false,
  onDigitEnter,
  onDigitFocus,
  onDigitBlur,
  onPaste,
  onClear,
  onCodeChange,
  onCodeComplete,
  onSubmit,
  onInvalid,
  'aria-label': ariaLabel = 'Code entry',
  onSuccess,
  onFailure,
  shakeOnInvalid = true,
}: CodePuzzleProps): React.JSX.Element {
  const puzzleId = useStableId('code-puzzle');
  const [digits, setDigits] = React.useState<string[]>(() => Array(codeLength).fill(''));
  const [isInvalid, setIsInvalid] = React.useState(false);
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
  const { submit } = usePuzzleSubmit<string>();

  const expected = Array.isArray(correctCode) ? correctCode.join('') : correctCode;

  const code = digits.join('');

  const checkCode = React.useCallback(
    async (fullCode: string) => {
      const isValid = await submit(fullCode, (value) => value === expected);
      if (isValid) {
        onSuccess?.();
      } else {
        onInvalid?.();
        onFailure?.();
        if (clearOnInvalid) setDigits(Array(codeLength).fill(''));
        if (shakeOnInvalid) {
          setIsInvalid(true);
          setTimeout(() => setIsInvalid(false), 400);
        }
      }
      return isValid;
    },
    [submit, expected, onSuccess, onInvalid, onFailure, clearOnInvalid, codeLength, shakeOnInvalid],
  );

  const setDigit = (index: number, value: string) => {
    const char = value.slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char) {
      onDigitEnter?.(char);
      onCodeChange?.(next.join(''));
      if (index < codeLength - 1) inputRefs.current[index + 1]?.focus();
    }
    const assembled = next.join('');
    if (assembled.length === codeLength && next.every(Boolean)) {
      onCodeComplete?.(assembled);
      if (autoSubmit) {
        onSubmit?.(assembled);
        void checkCode(assembled);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (!allowPaste) return;
    const pasted = e.clipboardData.getData('text');
    onPaste?.(pasted);
    const chars = pasted.slice(0, codeLength).split('');
    setDigits((prev) => {
      const next = [...prev];
      chars.forEach((c, i) => (next[i] = c));
      return next;
    });
  };

  return (
    <Puzzle
      puzzleId={puzzleId}
      type="code"
      pcEntity={pcEntity}
      solution={expected}
      onSolve={() => undefined}
      validateSolution={(state, solution) => state === solution}
      aria-label={ariaLabel}
      className={className}
    >
      <div
        role="textbox"
        aria-label={ariaLabel}
        className={cn('grid gap-2', isInvalid && 'animate-[shake_0.4s]')}
        style={{ gridTemplateColumns: `repeat(${codeLength}, minmax(0, 1fr))` }}
        onPaste={handlePaste}
      >
        {digits.map((digit, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            aria-label={`Digit ${index + 1} of ${codeLength}`}
            aria-invalid={isInvalid || undefined}
            type={maskInput ? 'password' : variant === 'numeric' ? 'number' : 'text'}
            value={digit}
            // eslint-disable-next-line jsx-a11y/no-autofocus -- documented Input/Button behavior pattern: focus the first digit slot so typing can start immediately (docs/REBUILD-GUIDE.md: "auto-focus first").
            autoFocus={index === 0}
            className="w-12 h-12 text-center text-2xl"
            onChange={(e) => setDigit(index, e.target.value)}
            onFocus={() => onDigitFocus?.(index)}
            onBlur={() => onDigitBlur?.(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      {!autoSubmit && (
        <Flex gap={2} className="mt-2">
          <Button
            onPress={() => {
              onSubmit?.(code);
              void checkCode(code);
            }}
          >
            Submit
          </Button>
          <Button
            variant="ghost"
            onPress={() => {
              setDigits(Array(codeLength).fill(''));
              onClear?.();
            }}
          >
            Clear
          </Button>
        </Flex>
      )}
    </Puzzle>
  );
}

CodePuzzle.displayName = 'CodePuzzle';
