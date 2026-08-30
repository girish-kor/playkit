import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useDialogueChoice } from '../useDialogueChoice';
import { useDialogueHistory } from '../useDialogueHistory';
import { useDialogueSync } from '../useDialogueSync';

describe('useDialogueSync', () => {
  it('starts at the first line, and nextLine advances but clamps at the last line', () => {
    const script = { dialogueLines: [{ text: 'a' }, { text: 'b' }] };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useDialogueSync({ pcEntity: 'e1' }), { app });
    expect(result.current.currentLine).toEqual({ text: 'a' });
    act(() => result.current.nextLine());
    expect(result.current.currentLine).toEqual({ text: 'b' });
    act(() => result.current.nextLine());
    expect(result.current.currentLine).toEqual({ text: 'b' });
  });

  it('currentLine is undefined for an empty lines array', () => {
    const { result } = renderHookWithPC(() => useDialogueSync());
    expect(result.current.currentLine).toBeUndefined();
  });
});

describe('useDialogueChoice', () => {
  it('fires a dialogue:choice event on the PlayCanvas app with the chosen id', () => {
    const app = createMockApp();
    const fireSpy = vi.spyOn(app, 'fire');
    const { result } = renderHookWithPC(() => useDialogueChoice(), { app });
    result.current.selectChoice('option-2');
    expect(fireSpy).toHaveBeenCalledWith('dialogue:choice', 'option-2');
  });

  it('is a documented no-op when unresolved (no throw)', () => {
    const { result } = renderHookWithPC(() => useDialogueChoice());
    expect(() => result.current.selectChoice('x')).not.toThrow();
  });
});

describe('useDialogueHistory', () => {
  it('defaults to an empty entries array, and clear() empties it', () => {
    const script = { dialogueHistory: [{ speaker: 'npc', text: 'hi' }] };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useDialogueHistory({ pcEntity: 'e1' }), { app });
    expect(result.current.entries).toHaveLength(1);
    act(() => result.current.clear());
    expect(result.current.entries).toEqual([]);
  });

  it('maxEntries truncates to only the most recent entries', () => {
    const script = { dialogueHistory: [{ text: '1' }, { text: '2' }, { text: '3' }] };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(
      () => useDialogueHistory({ pcEntity: 'e1', maxEntries: 2 }),
      { app },
    );
    expect(result.current.entries).toEqual([{ text: '2' }, { text: '3' }]);
  });
});
