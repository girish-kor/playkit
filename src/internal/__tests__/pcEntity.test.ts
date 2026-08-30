import { describe, expect, it, vi } from 'vitest';

import { createMockApp, createMockEntity } from '../../test/pcMocks';
import {
  findScriptOwning,
  pollUntilResolved,
  readTransform,
  resolveEntity,
  subscribeDestroy,
  subscribeEnabledChange,
  writeTransform,
} from '../pcEntity';

describe('resolveEntity', () => {
  it('returns null when entityId is falsy, without touching app/scene', () => {
    expect(resolveEntity(undefined, undefined, '')).toBeNull();
    expect(resolveEntity(undefined, undefined, undefined)).toBeNull();
  });

  it('resolves via app.root.findByGuid when present', () => {
    const entity = createMockEntity({ guid: 'e1' });
    const app = createMockApp({ entities: { e1: entity } });
    expect(resolveEntity(app, undefined, 'e1')).toBe(entity);
  });

  it('falls back to scene.root.findByGuid when app cannot resolve it', () => {
    const entity = createMockEntity({ guid: 'e1' });
    const scene = { root: { findByGuid: (id: string) => (id === 'e1' ? entity : null) } };
    expect(resolveEntity(undefined, scene, 'e1')).toBe(entity);
  });

  it('degrades to null for a plain mock object missing findByGuid entirely (no throw)', () => {
    expect(resolveEntity({}, {}, 'e1')).toBeNull();
  });
});

describe('pollUntilResolved', () => {
  it('resolves immediately without starting an interval when already available', () => {
    const onResolved = vi.fn();
    const cleanup = pollUntilResolved(() => 'value', onResolved);
    expect(onResolved).toHaveBeenCalledWith('value');
    expect(() => cleanup()).not.toThrow();
  });

  it('keeps polling until the target appears, then stops', () => {
    vi.useFakeTimers();
    let resolved: string | null = null;
    const onResolved = vi.fn();
    pollUntilResolved(() => resolved, onResolved, 100);
    expect(onResolved).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(onResolved).not.toHaveBeenCalled();

    resolved = 'now-available';
    vi.advanceTimersByTime(100);
    expect(onResolved).toHaveBeenCalledWith('now-available');
    expect(onResolved).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(onResolved).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('the returned cleanup stops polling before resolution', () => {
    vi.useFakeTimers();
    const onResolved = vi.fn();
    const cleanup = pollUntilResolved(() => null, onResolved, 50);
    cleanup();
    vi.advanceTimersByTime(1000);
    expect(onResolved).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});

describe('readTransform / writeTransform', () => {
  it('reads position/rotation/scale from a live entity', () => {
    const entity = createMockEntity({
      position: { x: 1, y: 2, z: 3 },
      rotation: { x: 0, y: 90, z: 0 },
      scale: { x: 2, y: 2, z: 2 },
    });
    expect(readTransform(entity)).toEqual({
      position: { x: 1, y: 2, z: 3 },
      rotation: { x: 0, y: 90, z: 0 },
      scale: { x: 2, y: 2, z: 2 },
    });
  });

  it('degrades to an all-null transform for a null entity (no-op, no throw)', () => {
    expect(readTransform(null)).toEqual({ position: null, rotation: null, scale: null });
  });

  it('writeTransform is a silent no-op when entity is null', () => {
    expect(() => writeTransform(null, { position: { x: 1, y: 1, z: 1 } })).not.toThrow();
  });

  it('writeTransform only calls setters for fields actually present in the patch', () => {
    const entity = createMockEntity();
    const setPosition = vi.spyOn(entity, 'setPosition');
    const setEulerAngles = vi.spyOn(entity, 'setEulerAngles');
    writeTransform(entity, { position: { x: 5, y: 0, z: 0 } });
    expect(setPosition).toHaveBeenCalledWith({ x: 5, y: 0, z: 0 });
    expect(setEulerAngles).not.toHaveBeenCalled();
  });
});

describe('subscribeEnabledChange / subscribeDestroy', () => {
  it('invokes the callback on entity enable/disable events', () => {
    const entity = createMockEntity();
    const onChange = vi.fn();
    const unsubscribe = subscribeEnabledChange(entity, onChange);
    entity.fire('enable');
    entity.fire('disable');
    expect(onChange).toHaveBeenNthCalledWith(1, true);
    expect(onChange).toHaveBeenNthCalledWith(2, false);
    unsubscribe();
    entity.fire('enable');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('returns a no-op unsubscribe for an entity without .on (no throw)', () => {
    const unsubscribe = subscribeEnabledChange({}, vi.fn());
    expect(() => unsubscribe()).not.toThrow();
  });

  it('fires the destroy callback once via entity.once', () => {
    const entity = createMockEntity();
    const onDestroy = vi.fn();
    subscribeDestroy(entity, onDestroy);
    entity.fire('destroy');
    expect(onDestroy).toHaveBeenCalledTimes(1);
  });
});

describe('findScriptOwning', () => {
  it('finds the first script instance owning the given stateKey', () => {
    const scriptA = { foo: 1 };
    const scriptB = { bar: 2 };
    const entity = createMockEntity({ scripts: [scriptA, scriptB] });
    expect(findScriptOwning(entity, 'bar')).toBe(scriptB);
  });

  it('returns null when no attached script owns the key', () => {
    const entity = createMockEntity({ scripts: [{ foo: 1 }] });
    expect(findScriptOwning(entity, 'missing')).toBeNull();
  });

  it('returns null for an entity with no script component (no throw)', () => {
    expect(findScriptOwning({}, 'anything')).toBeNull();
  });
});
