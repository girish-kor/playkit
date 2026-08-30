import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useAmmoSync } from '../useAmmoSync';
import { useEnergySync } from '../useEnergySync';
import { useHealthSync } from '../useHealthSync';
import { useInteractionPromptSync } from '../useInteractionPromptSync';
import { useLoadingSync } from '../useLoadingSync';
import { useMinimapSync } from '../useMinimapSync';
import { useProgressSync } from '../useProgressSync';
import { useStatusEffectSync } from '../useStatusEffectSync';

describe('useHealthSync', () => {
  it('defaults to 1 when unresolved, and writes to the entity script health key', () => {
    const script = { health: 0.5 };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useHealthSync({ pcEntity: 'e1' }), { app });
    expect(result.current.health).toBe(0.5);
    act(() => result.current.setHealth(0.2));
    expect(result.current.health).toBe(0.2);
  });

  it('defaults to 1 when pcEntity is not given', () => {
    const { result } = renderHookWithPC(() => useHealthSync());
    expect(result.current.health).toBe(1);
  });
});

describe('useEnergySync', () => {
  it('defaults to 1 and writes to the entity script energy key', () => {
    const script = { energy: 0.8 };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useEnergySync({ pcEntity: 'e1' }), { app });
    expect(result.current.energy).toBe(0.8);
  });
});

describe('useLoadingSync', () => {
  it('defaults to 0 and reads the entity script loadingProgress key', () => {
    const script = { loadingProgress: 0.4 };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useLoadingSync({ pcEntity: 'e1' }), { app });
    expect(result.current.progress).toBe(0.4);
  });
});

describe('useProgressSync', () => {
  it('defaults to 0 and reads the entity script progressValue key', () => {
    const script = { progressValue: 0.6 };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useProgressSync({ pcEntity: 'e1' }), { app });
    expect(result.current.value).toBe(0.6);
  });
});

describe('useAmmoSync', () => {
  it('reads current/reserve/isReloading from independent script keys, defaulting to 0/0/false', () => {
    const { result } = renderHookWithPC(() => useAmmoSync());
    expect(result.current.current).toBe(0);
    expect(result.current.reserve).toBe(0);
    expect(result.current.isReloading).toBe(false);
  });

  it('reload() sets isReloading true via the isReloading script key', () => {
    const script = { ammoCurrent: 10, ammoReserve: 30, isReloading: false };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useAmmoSync({ pcEntity: 'e1' }), { app });
    expect(result.current.current).toBe(10);
    expect(result.current.reserve).toBe(30);
    act(() => result.current.reload());
    expect(result.current.isReloading).toBe(true);
  });
});

describe('useInteractionPromptSync', () => {
  it('is undefined when unresolved, and reads the interactionTarget script key', () => {
    const { result: unresolved } = renderHookWithPC(() => useInteractionPromptSync());
    expect(unresolved.current.target).toBeUndefined();

    const script = { interactionTarget: { label: 'Door' } };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useInteractionPromptSync({ pcEntity: 'e1' }), {
      app,
    });
    expect(result.current.target).toEqual({ label: 'Door' });
  });
});

describe('useStatusEffectSync', () => {
  it('defaults to an empty effects array, and removeEffect filters by id', () => {
    const script = {
      statusEffects: [
        { id: 'poison', label: 'Poison' },
        { id: 'burn', label: 'Burn' },
      ],
    };
    const entity = createMockEntity({ guid: 'e1', scripts: [script] });
    const app = createMockApp({ entities: { e1: entity } });
    const { result } = renderHookWithPC(() => useStatusEffectSync({ pcEntity: 'e1' }), { app });
    expect(result.current.effects).toHaveLength(2);
    act(() => result.current.removeEffect('poison'));
    expect(result.current.effects).toEqual([{ id: 'burn', label: 'Burn' }]);
  });
});

describe('useMinimapSync', () => {
  it('reads textureUrl from pcCamera, falling back to pcEntity when pcCamera is absent', () => {
    const script = { minimapTextureUrl: 'tex.png' };
    const entity = createMockEntity({ guid: 'cam', scripts: [script] });
    const app = createMockApp({ entities: { cam: entity } });
    const { result } = renderHookWithPC(() => useMinimapSync({ pcEntity: 'cam' }), { app });
    expect(result.current.textureUrl).toBe('tex.png');
  });

  it('projectMarker maps world x/z onto minimap x/y for a top-down camera', () => {
    const { result } = renderHookWithPC(() => useMinimapSync());
    expect(result.current.projectMarker({ x: 5, y: 0, z: 7 })).toEqual({ x: 5, y: 7 });
  });
});
