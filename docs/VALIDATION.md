# Validation

Every explicit validation rule, and every explicitly **unvalidated** input, verified in `COMPONENTS.md`. The document is precise about which is which; this catalog preserves that distinction rather than assuming validation exists where it doesn't.

## Native form/constraint validation

- `Input.onInvalid?: (e) => void` — fires when native constraint validation (`pattern`, `required`, `max`, etc.) fails.
- `Input.error?: string` — when set (non-empty), automatically applies `aria-invalid="true"` and error styling without needing `aria-invalid` passed separately; explicitly passing `aria-invalid` overrides this automatic behavior.
- `Checkbox`/`RadioGroup`/`Input` all support `required`, surfaced through `aria-required`.

## Domain-specific validation callbacks

- `Puzzle.validateSolution?(state, solution) => boolean | Promise<boolean>` — if it throws or its returned promise rejects, `onError(error)` fires (distinct from `onFail`, which fires only after `maxAttempts` is exhausted).
- `CraftingPanel` — `canCraft` per recipe is computed by diffing `recipes[].ingredients` against the `inventory` prop; `onCraftFail(recipeId, reason: 'missing-ingredients' | 'error')` surfaces the failure reason.
- `EquipmentSlots` — `slotType` compatibility between an item and a slot is validated by the **consumer**, via `onEquip`'s acceptance or `onInvalidDrop`'s rejection path — `EquipmentSlots` itself performs no `slotType` validation.
- `MathPuzzle` — `problem: string` is display-only and is never parsed or evaluated by the component; for `inputType: 'expression'`, the consumer evaluates the answer inside `onSubmit`. The component is deliberately parser-free.
- `Keybinds.onConflict?(action, key, existingAction, resolve)` — conflict detection is real (a new binding matching an existing key is flagged), but resolution is explicitly handed to the caller via the `resolve('keep' | 'overwrite')` callback rather than an automatic policy.

## Explicitly unvalidated inputs (by design, not oversight)

These are stated in `COMPONENTS.md` as deliberately unvalidated; do not add runtime validation to these without a spec change, since the documented behavior (silent no-op or runtime-only failure) is the contract:
- `pcEntity`/`pcCamera`/`pcAction`/`pcProperty` on every consumer (`Box`, `Slot`, etc.) — an ID that doesn't resolve to a live PlayCanvas entity is a silent no-op, not an error, until the entity appears.
- `Icon.name` — a plain `string`, not a compile-time union; an unrecognized name is only caught at runtime (renders nothing or a placeholder).
- `TreeView.expanded`/`defaultExpanded` — an ID not present in `data` is silently ignored, no cross-check performed.
- `SliderPuzzle.tiles` — must be a permutation of `0..size²-1`; not checked at runtime, and `parityCheck` only validates solvability of an assumed-valid permutation, not the permutation's own validity.
- `FocusTrap.initialFocus` — a non-matching selector or out-of-trap element falls back silently to the first focusable descendant.
- `SkipLink.targetId` — not checked against the live DOM; a non-matching ID makes the anchor jump a no-op.
- `ErrorMsg.code` — accepted and surfaced as-is, not checked against any error-code registry.
- `Responsive.breakpoints` — no runtime check that the map is positive/monotonically increasing; an out-of-order map produces undefined breakpoint-matching behavior.
- `Grid.cols`/`rows` string values — must follow full Tailwind arbitrary-value syntax; an incomplete value (e.g. bare `'auto-fill'` without the `[repeat(...)]` wrapper) is not a valid class and is not caught by the component.

## Required-prop enforcement (type-level and runtime)

- `Image.alt`, `Avatar.alt` — required at the type level specifically to force a deliberate choice for decorative images (`alt=""`) rather than an accidental omission.
- `Button` with `variant="icon-only"` — `aria-label` is required; omitting it throws a development-time console error (see `docs/ERROR-HANDLING.md`).
- `LootContainer.onTake`, `Confirm.onConfirm`, `Console.onCommand` — required callback props with no default no-op; omitting them is a type error, not a silently-ignored feature.

## Two-tier validity: assembled vs. per-unit

`CodePuzzle`: `correctCode: string | string[]` — when an array, each index must match the corresponding digit slot exactly; the component does not validate array-length mismatches beyond normal indexing behavior (extra/missing entries are the caller's responsibility to get right).

## File input validation caveat

`Input`'s `accept` attribute (for `type="file"`) is a client-side hint only, not an enforced boundary — browsers do not strictly enforce it and it performs no content-based validation. Any real file-type/content validation must happen after the file leaves the component (see `docs/SECURITY.md`).

## Range/dial validation

`CombinationLock.correctCombination: number[]` must have length equal to `wheels`; `autoCheck?` (default `true`) checks continuously rather than requiring an explicit submit — there is no separate "submit" validation step to bypass when `autoCheck` is on.
