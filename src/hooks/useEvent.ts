import * as React from 'react';
import { useStore } from 'zustand';

import { usePCStore } from '../internal/pcContext';
import { pollUntilResolved, resolveEntity } from '../internal/pcEntity';
import { useLatest } from '../internal/useLatest';

/**
 * Hook for PlayCanvas event subscription (COMPONENTS.md § Hook: useEvent). `event` is
 * not validated against the entity's actual fired events — subscribing to a name the
 * entity never fires is a silent no-op, not an error.
 */
export interface UseEventOptions {
  entityId: string;
  event: string;
  handler: (...args: unknown[]) => void;
  /** Listen once (default: `false`). */
  once?: boolean;
  /** Debounce time in ms (default: `0`, i.e. no debouncing). */
  debounce?: number;
  onTrigger?: (...args: unknown[]) => void;
  onSubscribe?: () => void;
  onUnsubscribe?: () => void;
}

export interface UseEventResult {
  isListening: boolean;
  lastEvent: unknown;
}

export function useEvent(options: UseEventOptions): UseEventResult {
  const {
    entityId,
    event,
    handler,
    once = false,
    debounce = 0,
    onTrigger,
    onSubscribe,
    onUnsubscribe,
  } = options;

  const store = usePCStore();
  const app = useStore(store, (s) => s.app);
  const scene = useStore(store, (s) => s.scene);

  const [isListening, setIsListening] = React.useState(false);
  const [lastEvent, setLastEvent] = React.useState<unknown>(undefined);

  const handlerRef = useLatest(handler);
  const onTriggerRef = useLatest(onTrigger);
  const onSubscribeRef = useLatest(onSubscribe);
  const onUnsubscribeRef = useLatest(onUnsubscribe);
  const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => {
    let unsubscribeFromEntity: (() => void) | undefined;

    const stopPolling = pollUntilResolved(
      () => resolveEntity(app, scene, entityId),
      (entity) => {
        if (!entity?.on) return;

        const fire = (...args: unknown[]) => {
          const emit = () => {
            setLastEvent(args.length <= 1 ? args[0] : args);
            handlerRef.current(...args);
            onTriggerRef.current?.(...args);
          };
          if (debounce > 0) {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(emit, debounce);
          } else {
            emit();
          }
        };

        if (once) {
          entity.once(event, fire);
        } else {
          entity.on(event, fire);
        }
        setIsListening(true);
        onSubscribeRef.current?.();

        unsubscribeFromEntity = () => {
          entity.off?.(event, fire);
          setIsListening(false);
          onUnsubscribeRef.current?.();
        };
      },
    );

    return () => {
      stopPolling();
      unsubscribeFromEntity?.();
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [
    app,
    scene,
    entityId,
    event,
    once,
    debounce,
    handlerRef,
    onTriggerRef,
    onSubscribeRef,
    onUnsubscribeRef,
  ]);

  return { isListening, lastEvent };
}
