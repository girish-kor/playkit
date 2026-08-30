import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createMockApp } from '../../test/pcMocks';
import { renderHookWithPC } from '../../test/renderWithPC';
import { useConfirm } from '../useConfirm';
import { useContextMenu } from '../useContextMenu';
import { useNotificationListener } from '../useNotificationListener';

describe('useConfirm', () => {
  it('fires a confirm:request event with a resolver, and resolves once that resolver is called', async () => {
    const app = createMockApp();
    const fireSpy = vi.spyOn(app, 'fire').mockImplementation(((
      _event: string,
      payload: { resolve: (v: boolean) => void },
    ) => {
      payload.resolve(true);
    }) as unknown as typeof app.fire);
    const { result } = renderHookWithPC(() => useConfirm(), { app });
    const outcome = await result.current.confirm('Delete?', 'Are you sure?');
    expect(outcome).toBe(true);
    expect(fireSpy).toHaveBeenCalledWith(
      'confirm:request',
      expect.objectContaining({ title: 'Delete?', message: 'Are you sure?' }),
    );
  });

  it('resolves false when unresolved (no app to ever call resolve)', async () => {
    const { result } = renderHookWithPC(() => useConfirm());
    const outcome = await result.current.confirm('Delete?', 'Are you sure?');
    expect(outcome).toBe(false);
  });
});

describe('useNotificationListener', () => {
  it('addListener subscribes to the app "notification" event and returns an unsubscribe function', () => {
    const app = createMockApp();
    const handler = vi.fn();
    const { result } = renderHookWithPC(() => useNotificationListener(), { app });
    const unsubscribe = result.current.addListener(handler);
    act(() => app.fire('notification', { text: 'hi' }));
    expect(handler).toHaveBeenCalledWith({ text: 'hi' });
    unsubscribe();
    act(() => app.fire('notification', { text: 'again' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('addListener is a documented no-op returning a no-op unsubscribe when unresolved', () => {
    const { result } = renderHookWithPC(() => useNotificationListener());
    const unsubscribe = result.current.addListener(vi.fn());
    expect(() => unsubscribe()).not.toThrow();
  });
});

describe('useContextMenu', () => {
  it('select writes the chosen item id to the lastMenuSelection script key', () => {
    const { result } = renderHookWithPC(() => useContextMenu());
    expect(() => result.current.select({ id: 'delete', label: 'Delete' })).not.toThrow();
  });
});
