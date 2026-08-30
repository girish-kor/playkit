import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useObjectPuzzleSync } from '../useObjectPuzzleSync';
import { usePuzzleBridge } from '../usePuzzleBridge';
import { usePuzzleSubmit } from '../usePuzzleSubmit';
import { useSequenceSubmit } from '../useSequenceSubmit';
import { useSliderSync } from '../useSliderSync';

describe('useObjectPuzzleSync', () => {
  it('place merges an object->slot mapping; pick removes the mapping entirely', () => {
    const { result } = renderHookWithPC(() => useObjectPuzzleSync());
    expect(result.current.placed).toEqual({});
    act(() => result.current.place('rock', 'slotA'));
    expect(result.current.placed).toEqual({ rock: 'slotA' });
    act(() => result.current.pick('rock'));
    expect(result.current.placed).not.toHaveProperty('rock');
  });
});

describe('usePuzzleBridge', () => {
  it('scopes its stateKey to the given puzzleId, and reset clears it', () => {
    const script = { 'puzzleState.lock1': { code: '1234' } };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(
      () => usePuzzleBridge({ puzzleId: 'lock1', pcEntity: 'e1' }),
      {
        app,
      },
    );
    expect(result.current.state).toEqual({ code: '1234' });
    act(() => result.current.reset());
    expect(result.current.state).toBeUndefined();
  });
});

describe('usePuzzleSubmit', () => {
  it('resolves isValid from the validate callback, exercising both true and false outcomes', async () => {
    const { result } = renderHookWithPC(() => usePuzzleSubmit<string>());
    expect(result.current.isValid).toBeNull();
    await act(async () => {
      await result.current.submit('1234', () => true);
    });
    expect(result.current.isValid).toBe(true);
    await act(async () => {
      await result.current.submit('wrong', () => false);
    });
    expect(result.current.isValid).toBe(false);
  });

  it('awaits an async validate function', async () => {
    const { result } = renderHookWithPC(() => usePuzzleSubmit<number>());
    const validate = vi.fn().mockResolvedValue(true);
    await act(async () => {
      const outcome = await result.current.submit(42, validate);
      expect(outcome).toBe(true);
    });
    expect(validate).toHaveBeenCalledWith(42);
  });
});

describe('useSequenceSubmit', () => {
  it('returns true only when the sequence exactly matches expected, in order', () => {
    const { result } = renderHookWithPC(() => useSequenceSubmit<number>());
    expect(result.current.submit([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(result.current.submit([1, 3, 2], [1, 2, 3])).toBe(false);
    expect(result.current.submit([1, 2], [1, 2, 3])).toBe(false);
  });
});

describe('useSliderSync', () => {
  it('move swaps the tiles at the two given indices and persists the result', () => {
    const script = { sliderTiles: [1, 2, 0, 4] };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useSliderSync({ pcEntity: 'e1' }), { app });
    expect(result.current.tiles).toEqual([1, 2, 0, 4]);
    act(() => result.current.move(1, 2));
    expect(result.current.tiles).toEqual([1, 0, 2, 4]);
  });

  it('is a no-op when either index is out of range for the current tiles array', () => {
    const { result } = renderHookWithPC(() => useSliderSync());
    expect(() => result.current.move(0, 5)).not.toThrow();
    expect(result.current.tiles).toEqual([]);
  });
});
