import * as React from 'react';

/**
 * Shared submit/validate hook (docs/API.md § usePuzzleSubmit) — used by `CodePuzzle`,
 * `MathPuzzle`, `WordPuzzle`, `MemoryMatch`, `CombinationLock`, `PatternLock`. Every
 * puzzle type except `SequencePuzzle` shares this one hook (see `useSequenceSubmit`'s
 * own doc comment for the preserved naming inconsistency).
 */
export function usePuzzleSubmit<T = unknown>(): {
  submit: (value: T, validate: (value: T) => boolean | Promise<boolean>) => Promise<boolean>;
  isValid: boolean | null;
} {
  const [isValid, setIsValid] = React.useState<boolean | null>(null);

  const submit = React.useCallback(
    async (value: T, validate: (value: T) => boolean | Promise<boolean>) => {
      const result = await validate(value);
      setIsValid(result);
      return result;
    },
    [],
  );

  return { submit, isValid };
}
