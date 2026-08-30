/**
 * Shared inline type shapes declared across `COMPONENTS.md`, consolidated per
 * `docs/DATA-MODELS.md`. None of these are backed by a schema file, database, or ORM —
 * they are the TypeScript-style prop/return shapes documented inline per component or
 * hook. Fields marked optional below are `?` in `COMPONENTS.md` exactly as shown here.
 *
 * Do not add fields to any of these without a `COMPONENTS.md` update first
 * (`docs/RULES.md` § Maintainability).
 */
import type * as React from 'react';

// --- World-space vs. screen-space position convention (docs/DATA-MODELS.md) ---
// Every `{x, y, z}` position is PlayCanvas world-space (matches `pc.Vec3`, in scene
// units). Screen-space positions are always separately typed as `{x, y}`.
export interface Position3 {
  x: number;
  y: number;
  z: number;
}

export interface Position2 {
  x: number;
  y: number;
}

// --- Generic item/node types ---

export interface Item<T = unknown> {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  stackable?: boolean;
  maxStack?: number;
  quantity?: number;
  equipped?: boolean;
  data?: T;
}

export interface TreeNode<T = unknown> {
  id: string;
  label: string;
  children?: TreeNode<T>[];
  icon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  data?: T;
}

export interface Prefab<T = unknown> {
  id: string;
  name: string;
  thumbnail?: string;
  data: T;
  category?: string;
}

// --- Dialogue ---

export interface Speaker {
  name: string;
  avatar?: string;
  color?: string;
}

/**
 * The item type of `useDialogueSync`'s `lines` array. Its field-level shape is not
 * declared anywhere in `COMPONENTS.md` — treat as opaque; do not invent fields for it
 * without a spec update (docs/API.md, docs/DATA-MODELS.md).
 */
export type DialogueLine = unknown;

export interface HistoryEntry {
  text: string;
  timestamp: Date | string;
  speaker?: string;
}

// --- Objectives ---

export interface Objective {
  id: string;
  name: string;
  description?: string;
  /** Raw count against `maxProgress` — NOT pre-normalized to 0-1, unless `maxProgress`
   * is omitted, in which case `progress` itself is treated as a 0-1 fraction. */
  progress?: number;
  maxProgress?: number;
  subtasks?: {
    id: string;
    name: string;
    completed: boolean;
    progress?: number;
  }[];
}

// --- Navigation ---

export interface NavItem {
  id: string;
  label: string;
  /** Opaque string passed to `onNavigate`/`onBack`; never validated as a route. */
  path?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  disabled?: boolean;
}

// --- Menus ---

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: ContextMenuItem[];
  disabled?: boolean;
  separator?: boolean;
  /** Display-only text — does not register a global key handler. */
  shortcut?: string;
}

// --- Settings ---

export interface SettingsCategory {
  id: string;
  label: string;
  settings: SettingDef[];
}

export interface SettingDef {
  key: string;
  label: string;
  description?: string;
  type: 'toggle' | 'slider' | 'select' | 'keybind';
  default: unknown;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ label: string; value: unknown }>;
  keybinding?: { defaultKey: string };
}

export interface KeyBinding {
  action: string;
  key: string;
  label?: string;
  modifiers?: Array<'ctrl' | 'shift' | 'alt' | 'meta'>;
}

// --- Editor / Debug ---

export interface PropertyDef {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'color' | 'vector';
  options?: unknown[];
  min?: number;
  max?: number;
  step?: number;
}

/** The runtime value for a `PropertyDef` of `type: 'vector'`; the number of numeric
 * inputs rendered (2/3/4) is inferred from which components are present. */
export interface VectorValue {
  x: number;
  y: number;
  z?: number;
  w?: number;
}

// --- Puzzle ---

export interface ObjectPuzzleObject {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  /** World-space starting position. */
  position?: Position3;
}

export interface ObjectPuzzleSlot {
  id: string;
  position: Position3;
  label?: string;
  /** Derivable from placed-objects state but exposable directly. */
  occupied?: boolean;
}

export interface CrosswordClue {
  word: string;
  clue: string;
  position: { row: number; col: number };
  direction: 'across' | 'down';
}

// --- Combat / status ---

export interface Recipe {
  id: string;
  name: string;
  icon?: string;
  ingredients: { itemId: string; quantity: number }[];
  output: { itemId: string; quantity: number };
  craftTime?: number;
}

export interface StatusEffect {
  id: string;
  name: string;
  icon: string;
  type: 'buff' | 'debuff' | 'neutral';
  duration?: number;
  remaining?: number;
  stacks?: number;
}

export interface DamageNumberEvent {
  id: string;
  amount: number;
  type: 'damage' | 'heal' | 'critical' | 'miss';
  position?: Position3;
}

// --- Touch / input ---

export interface TouchControl {
  /** Doubles as the React list key — must be unique within the array. */
  id: string;
  type: 'joystick' | 'button';
  position?: Position2 | 'relative' | 'absolute';
  label?: string;
  size?: number;
}

// --- Notification ---

/**
 * `docs/DATA-MODELS.md`: field-level shape not spelled out beyond `Toast`'s own props
 * (`message`, `type`, `duration`, etc.). `COMPONENTS.md` does not explicitly declare
 * `ToastInput` as a subset of `Toast`'s props -- that equivalence is inferred, not
 * verified; do not assume it without checking `COMPONENTS.md` sec Component: Toast.
 */
export type ToastData = Record<string, unknown>;
export type ToastInput = Record<string, unknown>;
