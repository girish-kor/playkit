import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useNetwork } from '../useNetwork';

class MockWebSocket {
  static OPEN = 1;
  static CONNECTING = 0;
  static CLOSED = 3;
  static instances: MockWebSocket[] = [];

  readyState = MockWebSocket.CONNECTING;
  onopen: (() => void) | null = null;
  onmessage: ((e: { data: string }) => void) | null = null;
  onerror: (() => void) | null = null;
  onclose: (() => void) | null = null;
  sent: string[] = [];

  constructor(public url: string) {
    MockWebSocket.instances.push(this);
  }

  send(data: string): void {
    this.sent.push(data);
  }

  close(): void {
    this.readyState = MockWebSocket.CLOSED;
    this.onclose?.();
  }

  open(): void {
    this.readyState = MockWebSocket.OPEN;
    this.onopen?.();
  }

  message(payload: unknown): void {
    this.onmessage?.({ data: JSON.stringify(payload) });
  }
}

describe('useNetwork', () => {
  beforeEach(() => {
    MockWebSocket.instances = [];
    vi.stubGlobal('WebSocket', MockWebSocket as unknown as typeof WebSocket);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('starts disconnected and connects a WebSocket to networkId on mount', () => {
    renderHook(() => useNetwork({ networkId: 'wss://example.test', channel: 'lobby' }));
    expect(MockWebSocket.instances).toHaveLength(1);
    expect(MockWebSocket.instances[0]!.url).toBe('wss://example.test');
  });

  it('reports isConnected true and sends a join message once the socket opens', () => {
    const { result } = renderHook(() =>
      useNetwork({ networkId: 'wss://example.test', channel: 'lobby' }),
    );
    act(() => MockWebSocket.instances[0]!.open());
    expect(result.current.isConnected).toBe(true);
    expect(MockWebSocket.instances[0]!.sent[0]).toContain('"type":"join"');
  });

  it('routes player-join/player-leave messages into players and fires callbacks', () => {
    const onPlayerJoin = vi.fn();
    const onPlayerLeave = vi.fn();
    const { result } = renderHook(() =>
      useNetwork({
        networkId: 'wss://example.test',
        channel: 'lobby',
        onPlayerJoin,
        onPlayerLeave,
      }),
    );
    const socket = MockWebSocket.instances[0]!;
    act(() => socket.open());
    act(() => socket.message({ type: 'player-join', player: { id: 'p1' } }));
    expect(result.current.players).toEqual([{ id: 'p1' }]);
    expect(onPlayerJoin).toHaveBeenCalledWith({ id: 'p1' });

    act(() => socket.message({ type: 'player-leave', player: { id: 'p1' } }));
    expect(result.current.players).toEqual([]);
    expect(onPlayerLeave).toHaveBeenCalledWith({ id: 'p1' });
  });

  it('routes arbitrary messages to onMessage', () => {
    const onMessage = vi.fn();
    renderHook(() => useNetwork({ networkId: 'wss://example.test', channel: 'lobby', onMessage }));
    const socket = MockWebSocket.instances[0]!;
    act(() => socket.open());
    act(() => socket.message({ type: 'custom', foo: 'bar' }));
    expect(onMessage).toHaveBeenCalledWith({ type: 'custom', foo: 'bar' });
  });

  it('calls onDisconnect and attempts a reconnect when the socket closes and reconnect is true', () => {
    vi.useFakeTimers();
    const onDisconnect = vi.fn();
    renderHook(() =>
      useNetwork({
        networkId: 'wss://example.test',
        channel: 'lobby',
        onDisconnect,
        reconnect: true,
      }),
    );
    const socket = MockWebSocket.instances[0]!;
    act(() => socket.open());
    act(() => socket.close());
    expect(onDisconnect).toHaveBeenCalledTimes(1);

    act(() => vi.advanceTimersByTime(500));
    expect(MockWebSocket.instances).toHaveLength(2);
    vi.useRealTimers();
  });

  it('does not reconnect when reconnect is false', () => {
    vi.useFakeTimers();
    renderHook(() =>
      useNetwork({ networkId: 'wss://example.test', channel: 'lobby', reconnect: false }),
    );
    const socket = MockWebSocket.instances[0]!;
    act(() => socket.open());
    act(() => socket.close());
    act(() => vi.advanceTimersByTime(5000));
    expect(MockWebSocket.instances).toHaveLength(1);
    vi.useRealTimers();
  });

  it('send() only writes to the socket while OPEN', () => {
    const { result } = renderHook(() =>
      useNetwork({ networkId: 'wss://example.test', channel: 'lobby' }),
    );
    const socket = MockWebSocket.instances[0]!;
    act(() => result.current.send({ hello: 'world' }));
    expect(socket.sent).toHaveLength(0);

    act(() => socket.open());
    act(() => result.current.send({ hello: 'world' }));
    expect(socket.sent.some((s) => s.includes('"hello":"world"'))).toBe(true);
  });

  it('calls onError when WebSocket is unavailable in this environment', () => {
    vi.unstubAllGlobals();
    vi.stubGlobal('WebSocket', undefined as unknown as typeof WebSocket);
    const onError = vi.fn();
    renderHook(() => useNetwork({ networkId: 'wss://example.test', channel: 'lobby', onError }));
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
    vi.stubGlobal('WebSocket', MockWebSocket as unknown as typeof WebSocket);
  });
});
