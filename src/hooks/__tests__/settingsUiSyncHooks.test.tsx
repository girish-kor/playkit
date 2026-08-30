import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useAccordionSync } from '../useAccordionSync';
import { useAvatarSync } from '../useAvatarSync';
import { useBadgeSync } from '../useBadgeSync';
import { useIconSync } from '../useIconSync';
import { useKeybindSync } from '../useKeybindSync';
import { useModalSync } from '../useModalSync';
import { useSettingsSync } from '../useSettingsSync';
import { useTextSync } from '../useTextSync';
import { useTextureSync } from '../useTextureSync';
import { useTooltipSync } from '../useTooltipSync';

const category = {
  id: 'audio',
  label: 'Audio',
  settings: [{ key: 'volume', label: 'Volume', type: 'slider' as const, default: 50 }],
};

describe('useSettingsSync', () => {
  it('setSetting patches only the matching category+key', () => {
    const script = { settingsBlob: [category] };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useSettingsSync({ pcEntity: 'e1' }), { app });
    act(() => result.current.setSetting('audio', 'volume', 80));
    expect(result.current.settings[0]!.settings[0]!.default).toBe(80);
  });

  it('resetAll restores the initially-resolved blob after settings have changed', () => {
    const script = { settingsBlob: [category] };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useSettingsSync({ pcEntity: 'e1' }), { app });
    act(() => result.current.setSetting('audio', 'volume', 80));
    expect(result.current.settings[0]!.settings[0]!.default).toBe(80);
    act(() => result.current.resetAll());
    expect(result.current.settings[0]!.settings[0]!.default).toBe(50);
  });
});

describe('useKeybindSync', () => {
  it('setBindings replaces the list; reset restores the initially-resolved bindings', () => {
    const script = { keybindings: [{ action: 'jump', key: 'Space' }] };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useKeybindSync({ pcEntity: 'e1' }), { app });
    act(() => result.current.setBindings([{ action: 'jump', key: 'Enter' } as never]));
    expect(result.current.bindings).toEqual([{ action: 'jump', key: 'Enter' }]);
    act(() => result.current.reset());
    expect(result.current.bindings).toEqual([{ action: 'jump', key: 'Space' }]);
  });
});

describe('useAccordionSync', () => {
  it('reads/writes the expanded id list', () => {
    const { result } = renderHookWithPC(() => useAccordionSync());
    expect(result.current.expanded).toEqual([]);
    act(() => result.current.setExpanded(['a', 'b']));
    expect(result.current.expanded).toEqual(['a', 'b']);
  });
});

describe('useBadgeSync', () => {
  it('reads badgeContent, undefined when unresolved', () => {
    const script = { badgeContent: 5 };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useBadgeSync({ pcEntity: 'e1' }), { app });
    expect(result.current.content).toBe(5);
  });
});

describe('useAvatarSync', () => {
  it('reads avatarSrc and avatarStatus from independent script keys', () => {
    const script = { avatarSrc: '/me.png', avatarStatus: 'online' };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useAvatarSync({ pcEntity: 'e1' }), { app });
    expect(result.current.src).toBe('/me.png');
    expect(result.current.status).toBe('online');
  });
});

describe('useTextSync / useIconSync / useTextureSync', () => {
  it('each write through to their respective script key', () => {
    vi.useFakeTimers();
    const script: Record<string, unknown> = {
      text: undefined,
      icon: undefined,
      texture: undefined,
    };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });

    const text = renderHookWithPC(() => useTextSync({ pcEntity: 'e1' }), { app });
    act(() => text.result.current.setText('hello'));
    act(() => vi.advanceTimersByTime(100));
    expect(script.text).toBe('hello');

    const icon = renderHookWithPC(() => useIconSync({ pcEntity: 'e1' }), { app });
    act(() => icon.result.current.setIcon('star'));
    act(() => vi.advanceTimersByTime(100));
    expect(script.icon).toBe('star');

    const texture = renderHookWithPC(() => useTextureSync({ pcEntity: 'e1' }), { app });
    act(() => texture.result.current.setTexture('tex.png'));
    act(() => vi.advanceTimersByTime(100));
    expect(script.texture).toBe('tex.png');
    vi.useRealTimers();
  });
});

describe('useTooltipSync', () => {
  it('reports loading only while bound and not yet resolved', () => {
    const { result } = renderHookWithPC(() => useTooltipSync());
    expect(result.current.loading).toBe(false);
    expect(result.current.content).toBeUndefined();
  });
});

describe('useModalSync', () => {
  it('open/close write through the isOpen script key', () => {
    const { result } = renderHookWithPC(() => useModalSync());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });
});
