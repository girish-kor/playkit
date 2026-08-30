# Coding Standards

Source: patterns verified consistently across every component entry in `COMPONENTS.md`. These are binding rules for implementation, derived from the specification's own internal consistency — not invented conventions.

## Naming

- Component names are PascalCase and match their `## Component: X` heading exactly (verified across all ~100+ entries).
- Hook names are camelCase, prefixed `use`, and domain-sync hooks follow `use<Domain>Sync` (`useHealthSync`, `useEnergySync`, `useInventorySync`, `useSlotSync`, `useBadgeSync`, `useAvatarSync`, `useAccordionSync`, `useMinimapSync`, `useAmmoSync`, `useStatusEffectSync`, `useEquipmentSync`, `useCraftingSync`, `useLootSync`, `useStepperSync`, `useSliderSync`, `useObjectPuzzleSync`, `useTooltipSync`, `useTextSync`, `useIconSync`, `useTextureSync`, `useSettingSync`/`useSettingsSync`, `useKeybindSync`, `useModalSync`, `useA11ySync`).
- Boolean props are named as predicates or `is`/`has`-prefixed state (`disabled`, `readOnly`, `required`, `isPressed`, `isHovered`, `isFocused`, `hasError`) — never ambiguous nouns.
- Props named `pcEntity`, `pcCamera`, `pcAction`, `pcProperty` are reserved exclusively for PlayCanvas binding identifiers; no other prop uses the `pc*` prefix for a non-PlayCanvas purpose.

## Prop API conventions

- Every component's default value for each optional prop is stated explicitly in `COMPONENTS.md` (e.g. `Button.variant` default `'primary'`); an implementation must match every documented default exactly — a default is part of the contract, not an implementation detail.
- Enum-like props are closed string-literal unions, never open `string` (verified: `Box.variant`, `Button.variant`, `Card.variant`, etc.), with the single documented exception of `Icon.name` (deliberately a plain `string` against a runtime-resolved registry, not a compile-time union) and `Text.color` (a Tailwind class string, not an enum, because the space of valid Tailwind color classes is too large to enumerate).
- A controlled prop and its `default*` uncontrolled counterpart always share the same value type and the controlled prop always wins when both are supplied (see `docs/STATE-MANAGEMENT.md`).
- Two props with different names but identical purpose/signature (e.g. `Checkbox.onChange`/`onCheckedChange`, `Tabs.onChange`/`onTabChange`, `RadioGroup`-adjacent naming) both fire on every occurrence — an alias prop is never a silent replacement for the original, both must be dispatched from the same code path to avoid divergence.

## Composition rules

- A component that needs another element's semantics without an extra wrapper node uses the `asChild`/`Slot` pattern (`@radix-ui/react-slot`), never a manual `React.cloneElement` reimplementation.
- A component's "Composition" field in `COMPONENTS.md` is the authoritative list of what it is built from; an implementation must not compose additional components beyond what is documented without first updating `COMPONENTS.md` and `docs/MODULES.md`.
- Ref forwarding is required wherever `COMPONENTS.md` documents a `ref` prop (verified explicitly for `Slot`: "must be defined with `React.forwardRef`... a custom child component receiving props from `Slot` must also forward its ref").

## Accessibility-first implementation

- Interactive behavior (keyboard, focus, ARIA state) is delegated to `react-aria` or the matching `@radix-ui/react-*` primitive wherever one is named in a component's "Dependencies" field — a component must not hand-roll keyboard handling that a named library already provides (verified rule, stated directly on `Button`: "Always use react-aria; avoid raw `<button>`" and on `Checkbox`/`RadioGroup`/`Tabs`/`Accordion`: "Use Radix ... for keyboard and screen reader support").
- Every component that renders visible informational content the user can act on documents its ARIA role and required `aria-label` conditions in `COMPONENTS.md`; an implementation must satisfy every such condition (e.g. `Button` throws a development-time console error if `variant="icon-only"` is used without `aria-label`).

## Styling rules

- Class assembly always goes through `clsx` then `tailwind-merge` (see `docs/DESIGN-SYSTEM.md`); raw string concatenation of class names is prohibited.
- Color/size/spacing values accept either a typed enum (mapped 1:1 to a Tailwind class) or a Tailwind arbitrary-value string; raw CSS values (hex colors, unitless numbers outside the documented numeric-scale props) are prohibited in typed props and must go through `style` instead (verified rule on `Text.color`).

## Performance discipline

- Any prop or hook documented with a default throttle/debounce/virtualization threshold in `COMPONENTS.md` must ship with that exact default; changing a default (e.g. lowering `useSync`'s 100ms debounce to `0`) is documented as actively harmful and is prohibited without a corresponding update to the spec and `docs/PERFORMANCE.md`.
- Per-frame callbacks (`HUD.onRender`, `HUD.onUpdate`) must not allocate or trigger synchronous layout in their handler bodies, per the explicit performance note on `HUD`.

## Enforcement mapping (SOLID / DRY / KISS / SoC / IoC / DI)

- **Single Responsibility** — one component per concern per `docs/FOLDER-STRUCTURE.md`; a component's props never mix two unrelated domains (e.g. `Health` does not also expose ammo props).
- **Open/Closed** — new visual styles extend a variant union (`docs/DESIGN-SYSTEM.md`) rather than adding conditional branches keyed on new ad-hoc props.
- **Liskov Substitution** — components sharing a compositional base (e.g. everything built on `Box`) must accept and forward the full `Box` prop/event surface without narrowing it, as verified on `Flex`/`Grid`/`Text` ("Inherits all `Box` props and events").
- **Interface Segregation** — domain-specific callbacks (`onHeal`, `onDamage`, `onRegenStart`) are separate props rather than a single generic `onEvent(type, payload)` callback, so a consumer only wires what it needs.
- **Dependency Inversion / IoC / DI** — components depend on PlayCanvas only through injected hooks (`docs/ARCHITECTURE.md`, `docs/MODULES.md`), never on the PlayCanvas runtime directly.
- **DRY** — shared behavior is factored into hooks (`useSync`, `useAnimation`, `useScrollToBottom`) and shared primitives (`Progress` reused by `Health`/`Energy`/`AmmoIndicator`/`InteractionPrompt`; `ItemTip`'s stat-row rendering reused by `ItemComparison`) rather than duplicated per component.
- **KISS / SoC** — the three-layer split (Primitives / feature modules / PlayCanvas Bridge, `docs/ARCHITECTURE.md`) keeps layout, domain behavior, and engine integration in separate, independently testable layers.
