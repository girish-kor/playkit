import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useObjectiveProgress } from '../useObjectiveProgress';
import { useObjectiveSync } from '../useObjectiveSync';
import { useStopwatchSync } from '../useStopwatchSync';
import { useTimerSync } from '../useTimerSync';

describe('useObjectiveSync', () => {
  it('updateObjective patches only the matching id, leaving others untouched', () => {
    const script = {
      objectives: [
        { id: 'a', name: 'A', progress: 0 },
        { id: 'b', name: 'B', progress: 0 },
      ],
    };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useObjectiveSync({ pcEntity: 'e1' }), { app });
    act(() => result.current.updateObjective('a', { progress: 1 }));
    expect(result.current.objectives).toEqual([
      { id: 'a', name: 'A', progress: 1 },
      { id: 'b', name: 'B', progress: 0 },
    ]);
  });
});

describe('useObjectiveProgress', () => {
  it('scopes its stateKey to objectiveId, defaulting to 0; complete() sets it to 1', () => {
    const { result } = renderHookWithPC(() => useObjectiveProgress({ objectiveId: 'find-key' }));
    expect(result.current.progress).toBe(0);
    act(() => result.current.complete());
    expect(result.current.progress).toBe(1);
  });
});

describe('useTimerSync', () => {
  it('reads time/isRunning from independent script keys and writes through start/pause/setTime', () => {
    const script = { timerTime: 30, timerRunning: false };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useTimerSync({ pcEntity: 'e1' }), { app });
    expect(result.current.time).toBe(30);
    expect(result.current.isRunning).toBe(false);
    act(() => result.current.start());
    expect(result.current.isRunning).toBe(true);
    act(() => result.current.pause());
    expect(result.current.isRunning).toBe(false);
    act(() => result.current.setTime(10));
    expect(result.current.time).toBe(10);
  });
});

describe('useStopwatchSync', () => {
  it('reads elapsed/laps from independent script keys, defaulting to 0/[]', () => {
    const { result } = renderHookWithPC(() => useStopwatchSync());
    expect(result.current.elapsed).toBe(0);
    expect(result.current.laps).toEqual([]);
    act(() => result.current.setElapsed(15));
    expect(result.current.elapsed).toBe(15);
  });
});
