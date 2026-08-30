import * as React from 'react';
import { useLatest } from '../internal/useLatest';

/**
 * Hook for PlayCanvas network/multiplayer, for multiplayer escape games
 * (COMPONENTS.md § Hook: useNetwork). `networkId` is not validated against an active
 * session at call time — connecting with an unknown/expired id fails asynchronously
 * (`onError`/`isConnected` staying `false`), not synchronously.
 */
export interface UseNetworkOptions {
  networkId: string;
  channel: string;
  /** Auto-reconnect (default: `true`). */
  reconnect?: boolean;
  onMessage?: (msg: unknown) => void;
  onPlayerJoin?: (player: unknown) => void;
  onPlayerLeave?: (player: unknown) => void;
  onDisconnect?: () => void;
  onReconnect?: () => void;
  onError?: (error: Error) => void;
}

export interface UseNetworkResult {
  isConnected: boolean;
  isHost: boolean;
  players: unknown[];
  latency: number;
  send: (data: unknown) => void;
}

const RECONNECT_BACKOFF_MS = [500, 1000, 2000, 5000];

export function useNetwork(options: UseNetworkOptions): UseNetworkResult {
  const {
    networkId,
    channel,
    reconnect = true,
    onMessage,
    onPlayerJoin,
    onPlayerLeave,
    onDisconnect,
    onReconnect,
    onError,
  } = options;

  const [isConnected, setIsConnected] = React.useState(false);
  const [isHost, setIsHost] = React.useState(false);
  const [players, setPlayers] = React.useState<unknown[]>([]);
  const [latency, setLatency] = React.useState(0);

  const socketRef = React.useRef<WebSocket | null>(null);
  const attemptRef = React.useRef(0);
  const everConnectedRef = React.useRef(false);

  const onMessageRef = useLatest(onMessage);
  const onPlayerJoinRef = useLatest(onPlayerJoin);
  const onPlayerLeaveRef = useLatest(onPlayerLeave);
  const onDisconnectRef = useLatest(onDisconnect);
  const onReconnectRef = useLatest(onReconnect);
  const onErrorRef = useLatest(onError);

  React.useEffect(() => {
    let cancelled = false;
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let pingTimer: ReturnType<typeof setInterval> | undefined;

    function connect() {
      if (cancelled) return;
      if (typeof WebSocket === 'undefined') {
        onErrorRef.current?.(
          new Error('useNetwork: WebSocket is not available in this environment.'),
        );
        return;
      }

      let socket: WebSocket;
      try {
        socket = new WebSocket(networkId);
      } catch (err) {
        onErrorRef.current?.(err instanceof Error ? err : new Error(String(err)));
        return;
      }
      socketRef.current = socket;

      socket.onopen = () => {
        if (cancelled) return;
        setIsConnected(true);
        attemptRef.current = 0;
        if (everConnectedRef.current) onReconnectRef.current?.();
        everConnectedRef.current = true;
        socket.send?.(JSON.stringify({ type: 'join', channel }));

        const pingStart = () => {
          const sentAt = Date.now();
          try {
            socket.send(JSON.stringify({ type: 'ping', sentAt }));
          } catch {
            // dropped ping — latency simply won't update this tick.
          }
        };
        pingTimer = setInterval(pingStart, 5000);
      };

      socket.onmessage = (event) => {
        if (cancelled) return;
        let parsed: any = event.data;
        try {
          parsed = JSON.parse(event.data);
        } catch {
          // non-JSON payload — pass through raw.
        }
        if (parsed?.type === 'pong' && typeof parsed.sentAt === 'number') {
          setLatency(Date.now() - parsed.sentAt);
          return;
        }
        if (parsed?.type === 'host') {
          setIsHost(Boolean(parsed.isHost));
          return;
        }
        if (parsed?.type === 'player-join') {
          setPlayers((prev) => [...prev, parsed.player]);
          onPlayerJoinRef.current?.(parsed.player);
          return;
        }
        if (parsed?.type === 'player-leave') {
          // Each message round-trips through JSON independently, so the leaving
          // player's object is never reference-equal to the one stored from its
          // join message -- compare by serialized value instead of identity.
          const leavingKey = JSON.stringify(parsed.player);
          setPlayers((prev) => prev.filter((p) => JSON.stringify(p) !== leavingKey));
          onPlayerLeaveRef.current?.(parsed.player);
          return;
        }
        onMessageRef.current?.(parsed);
      };

      socket.onerror = () => {
        if (cancelled) return;
        onErrorRef.current?.(new Error(`useNetwork: connection error on channel "${channel}".`));
      };

      socket.onclose = () => {
        if (cancelled) return;
        setIsConnected(false);
        onDisconnectRef.current?.();
        if (pingTimer) clearInterval(pingTimer);
        if (reconnect) {
          const backoff =
            RECONNECT_BACKOFF_MS[Math.min(attemptRef.current, RECONNECT_BACKOFF_MS.length - 1)];
          attemptRef.current += 1;
          reconnectTimer = setTimeout(connect, backoff);
        }
      };
    }

    connect();

    return () => {
      cancelled = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (pingTimer) clearInterval(pingTimer);
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [
    networkId,
    channel,
    reconnect,
    onMessageRef,
    onPlayerJoinRef,
    onPlayerLeaveRef,
    onDisconnectRef,
    onReconnectRef,
    onErrorRef,
  ]);

  const send = React.useCallback((data: unknown) => {
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'message', data }));
    }
  }, []);

  return { isConnected, isHost, players, latency, send };
}
