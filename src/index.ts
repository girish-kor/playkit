// Package entry point. Re-exports every component and hook per docs/FOLDER-STRUCTURE.md,
// EXCEPT the Debug/DevTools category, which must never be reachable from the production
// entry point (docs/BUILD.md, docs/LOGGING.md). Import those explicitly from
// 'playkit/devtools' in development-only code.

export * from './components/primitives';
export * from './components/hud';
export * from './components/inventory';
export * from './components/puzzle';
export * from './components/dialogue';
export * from './components/objectives';
export * from './components/timer';
export * from './components/navigation';
export * from './components/feedback';
export * from './components/modal';
export * from './components/overlay';
export * from './components/settings';
export * from './components/editor';
export * from './components/loading';
export * from './components/error';
export * from './components/responsive';
export * from './components/accessibility';
export * from './components/general';
export * from './components/playcanvas-bridge';

export * from './hooks';

// `./types` is not blanket re-exported: `docs/DATA-MODELS.md`'s `Objective` type and
// `docs/FOLDER-STRUCTURE.md`'s `Objective` component (Objectives category) share the
// exact same name in COMPONENTS.md itself — a genuine spec-level collision, not
// something invented here. The component wins the bare `Objective` export (components
// are the primary public API surface); the data shape is exported as `ObjectiveData`.
export type {
  Position3,
  Position2,
  Item,
  TreeNode,
  Prefab,
  Speaker,
  DialogueLine,
  HistoryEntry,
  NavItem,
  ContextMenuItem,
  SettingsCategory,
  SettingDef,
  KeyBinding,
  PropertyDef,
  VectorValue,
  ObjectPuzzleObject,
  ObjectPuzzleSlot,
  CrosswordClue,
  Recipe,
  StatusEffect,
  DamageNumberEvent,
  TouchControl,
  ToastData,
  ToastInput,
} from './types';
export type { Objective as ObjectiveData } from './types';
