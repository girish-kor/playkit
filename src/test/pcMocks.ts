/**
 * Shared PlayCanvas mocks for hook/component tests (docs/TESTING.md § "PlayCanvas
 * bridge isolation": "mocking pc.Application/pc.Entity"). Deliberately minimal --
 * only the subset of the real `pc.Application`/`pc.Entity` API surface that
 * src/internal/pcEntity.ts and the hooks in src/hooks/ actually call.
 */

export class MockEmitter {
  private listeners = new Map<string, Set<(...args: unknown[]) => void>>();
  private onceListeners = new Map<string, Set<(...args: unknown[]) => void>>();

  on(event: string, handler: (...args: unknown[]) => void): this {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(handler);
    return this;
  }

  once(event: string, handler: (...args: unknown[]) => void): this {
    if (!this.onceListeners.has(event)) this.onceListeners.set(event, new Set());
    this.onceListeners.get(event)!.add(handler);
    return this;
  }

  off(event: string, handler?: (...args: unknown[]) => void): this {
    if (!handler) {
      this.listeners.delete(event);
      this.onceListeners.delete(event);
      return this;
    }
    this.listeners.get(event)?.delete(handler);
    this.onceListeners.get(event)?.delete(handler);
    return this;
  }

  fire(event: string, ...args: unknown[]): this {
    this.listeners.get(event)?.forEach((handler) => handler(...args));
    const once = this.onceListeners.get(event);
    if (once) {
      once.forEach((handler) => handler(...args));
      this.onceListeners.delete(event);
    }
    return this;
  }
}

export interface MockEntityOptions {
  guid?: string;
  enabled?: boolean;
  position?: unknown;
  rotation?: unknown;
  scale?: unknown;
  scripts?: unknown[];
}

export function createMockEntity(options: MockEntityOptions = {}) {
  const {
    guid = 'mock-entity',
    enabled = true,
    position = { x: 0, y: 0, z: 0 },
    rotation = { x: 0, y: 0, z: 0 },
    scale = { x: 1, y: 1, z: 1 },
    scripts = [],
  } = options;

  const emitter = new MockEmitter();
  let currentPosition = position;
  let currentRotation = rotation;
  let currentScale = scale;

  return {
    guid,
    enabled,
    script: { scripts },
    getPosition: () => currentPosition,
    getEulerAngles: () => currentRotation,
    getLocalScale: () => currentScale,
    setPosition: (v: unknown) => {
      currentPosition = v;
    },
    setEulerAngles: (v: unknown) => {
      currentRotation = v;
    },
    setLocalScale: (v: unknown) => {
      currentScale = v;
    },
    on: emitter.on.bind(emitter),
    once: emitter.once.bind(emitter),
    off: emitter.off.bind(emitter),
    fire: emitter.fire.bind(emitter),
  };
}

export type MockEntity = ReturnType<typeof createMockEntity>;

export interface MockAppOptions {
  entities?: Record<string, MockEntity>;
  assets?: unknown[];
}

export function createMockApp(options: MockAppOptions = {}) {
  const { entities = {}, assets = [] } = options;
  const emitter = new MockEmitter();
  const assetsEmitter = new MockEmitter();

  return {
    root: {
      findByGuid: (id: string) => entities[id] ?? null,
    },
    assets: {
      list: () => assets,
      on: assetsEmitter.on.bind(assetsEmitter),
      off: assetsEmitter.off.bind(assetsEmitter),
      fire: assetsEmitter.fire.bind(assetsEmitter),
    },
    keyboard: new MockEmitter(),
    mouse: new MockEmitter(),
    on: emitter.on.bind(emitter),
    off: emitter.off.bind(emitter),
    fire: emitter.fire.bind(emitter),
  };
}

export type MockApp = ReturnType<typeof createMockApp>;
