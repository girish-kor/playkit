import * as React from 'react';

/**
 * `SequencePuzzle`'s own submit hook (docs/API.md § useSequenceSubmit) — preserved as
 * a naming inconsistency, not unified with `usePuzzleSubmit`, per docs/API.md's own
 * note: "every puzzle type except SequencePuzzle shares one usePuzzleSubmit hook;
 * SequencePuzzle alone has its own useSequenceSubmit."
 */
export function useSequenceSubmit<T = unknown>(): {
  submit: (sequence: T[], expected: T[]) => boolean;
} {
  const submit = React.useCallback(
    (sequence: T[], expected: T[]) =>
      sequence.length === expected.length && sequence.every((step, i) => step === expected[i]),
    [],
  );
  return { submit };
}
