import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useConsoleBridge } from '../useConsoleBridge';
import { useDevAPI } from '../useDevAPI';
import { useEditorBridge } from '../useEditorBridge';
import { usePrefabLibrary } from '../usePrefabLibrary';
import { usePropertyEditor } from '../usePropertyEditor';
import { useSceneInspector } from '../useSceneInspector';

describe('useDevAPI', () => {
  it('getScene reads pcApp.scene; inspect passes the entity through unchanged', () => {
    const scene = { id: 'scene1' };
    const { result } = renderHook(() => useDevAPI({ pcApp: { scene } }));
    expect(result.current.getScene()).toBe(scene);
    const entity = { id: 'e1' };
    expect(result.current.inspect(entity)).toBe(entity);
  });

  it('getScene is null when pcApp is unresolved', () => {
    const { result } = renderHook(() => useDevAPI({ pcApp: undefined }));
    expect(result.current.getScene()).toBeNull();
  });
});

describe('useSceneInspector', () => {
  it('reads entities from pcScene.root.children, refreshing on demand', () => {
    const children = [{ id: 'a' }];
    const { result } = renderHook(() => useSceneInspector({ pcScene: { root: { children } } }));
    expect(result.current.entities).toEqual(children);
    expect(() => act(() => result.current.refresh())).not.toThrow();
  });

  it('defaults to an empty array when pcScene is unresolved', () => {
    const { result } = renderHook(() => useSceneInspector({ pcScene: undefined }));
    expect(result.current.entities).toEqual([]);
  });
});

describe('usePropertyEditor', () => {
  it('get/set read and write arbitrary entity properties', () => {
    const entity: Record<string, unknown> = { enabled: true };
    const { result } = renderHook(() => usePropertyEditor({ entity }));
    expect(result.current.get('enabled')).toBe(true);
    result.current.set('enabled', false);
    expect(entity.enabled).toBe(false);
  });

  it('is a documented no-op when entity is unresolved (no throw)', () => {
    const { result } = renderHook(() => usePropertyEditor({ entity: undefined }));
    expect(result.current.get('x')).toBeUndefined();
    expect(() => result.current.set('x', 1)).not.toThrow();
  });
});

describe('useEditorBridge', () => {
  it('place clones the prefab, positions it, and adds it to the scene root', () => {
    const cloned = { setPosition: vi.fn() };
    const prefab = { clone: () => cloned };
    const addChild = vi.fn();
    const { result } = renderHook(() => useEditorBridge({ pcScene: { root: { addChild } } }));
    const instance = result.current.place(prefab, { x: 1, y: 2, z: 3 });
    expect(instance).toBe(cloned);
    expect(cloned.setPosition).toHaveBeenCalledWith({ x: 1, y: 2, z: 3 });
    expect(addChild).toHaveBeenCalledWith(cloned);
  });

  it('delete calls destroy on the entity', () => {
    const destroy = vi.fn();
    const { result } = renderHook(() => useEditorBridge({ pcScene: undefined }));
    result.current.delete({ destroy });
    expect(destroy).toHaveBeenCalledTimes(1);
  });

  it('transform only calls setters for fields actually present in the patch', () => {
    const entity = { setPosition: vi.fn(), setEulerAngles: vi.fn(), setLocalScale: vi.fn() };
    const { result } = renderHook(() => useEditorBridge({ pcScene: undefined }));
    result.current.transform(entity, { position: { x: 1, y: 0, z: 0 } });
    expect(entity.setPosition).toHaveBeenCalledWith({ x: 1, y: 0, z: 0 });
    expect(entity.setEulerAngles).not.toHaveBeenCalled();
  });
});

describe('usePrefabLibrary', () => {
  it('filters the asset list down to template/prefab-typed assets', () => {
    const assets = [
      { id: '1', name: 'Rock', type: 'prefab' },
      { id: '2', name: 'Texture', type: 'texture' },
      { id: '3', name: 'Tree', type: 'template' },
    ];
    const { result } = renderHook(() =>
      usePrefabLibrary({ pcApp: { assets: { list: () => assets } } }),
    );
    expect(result.current.prefabs.map((p) => p.id)).toEqual(['1', '3']);
  });

  it('load resolves a prefab by id, undefined when not found', () => {
    const assets = [{ id: '1', name: 'Rock', type: 'prefab' }];
    const { result } = renderHook(() =>
      usePrefabLibrary({ pcApp: { assets: { list: () => assets } } }),
    );
    expect(result.current.load('1')?.name).toBe('Rock');
    expect(result.current.load('missing')).toBeUndefined();
  });

  it('defaults to an empty prefab list when pcApp is unresolved', () => {
    const { result } = renderHook(() => usePrefabLibrary({ pcApp: undefined }));
    expect(result.current.prefabs).toEqual([]);
  });
});

describe('useConsoleBridge', () => {
  it('captures console.log/warn/error/debug calls into the logs feed while enabled', () => {
    const { result } = renderHook(() => useConsoleBridge());
    act(() => console.warn('careful'));
    expect(result.current.logs).toHaveLength(1);
    expect(result.current.logs[0]).toMatchObject({ level: 'warn', args: ['careful'] });
  });

  it('does not patch console at all when enabled is false', () => {
    const originalWarn = console.warn;
    renderHook(() => useConsoleBridge({ enabled: false }));
    expect(console.warn).toBe(originalWarn);
  });

  it('restores the original console methods on unmount', () => {
    const originalLog = console.log;
    const { unmount } = renderHook(() => useConsoleBridge());
    expect(console.log).not.toBe(originalLog);
    unmount();
    expect(console.log).toBe(originalLog);
  });

  it('filter narrows logs to one level, or returns everything for "all"', () => {
    const { result } = renderHook(() => useConsoleBridge());
    act(() => {
      console.log('a');
      console.error('b');
    });
    expect(result.current.filter('error')).toHaveLength(1);
    expect(result.current.filter('all')).toHaveLength(2);
  });

  it('clear empties the logs feed', () => {
    const { result } = renderHook(() => useConsoleBridge());
    act(() => console.log('a'));
    act(() => result.current.clear());
    expect(result.current.logs).toEqual([]);
  });
});
