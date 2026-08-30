# Design System

Source: Tailwind class patterns and variant enums verified in `COMPONENTS.md`. This is a utility-class design system (Tailwind CSS via `clsx` + `tailwind-merge`), not a custom CSS-in-JS or token-JSON system — no design-token file exists in the repository; the "tokens" below are the enum values and Tailwind scale conventions verified directly in component prop tables.

## Color

- Color props are typed as Tailwind color-class strings (e.g. `'text-white'`, `'text-red-500'`, `'bg-gray-800'`), never raw CSS/hex values. Verified explicitly on `Text.color`: "Must be a Tailwind text-color class ... raw CSS color values (`'#fff'`, `'red'`) are not supported and should be applied via `style` instead."
- Semantic color enums used across components: `Badge.color`: `'default' | 'success' | 'warning' | 'error' | 'info'`.
- Status colors verified in prose: health/damage `text-red-400`/`bg-red-500`; heal `text-green-400`; critical `text-yellow-300`; miss `text-gray-400`; buff `border-green-500`; debuff `border-red-500`; neutral effect `border-gray-500`.
- Default surface/border colors verified: `bg-gray-800` (Card, Input, Popover), `bg-gray-900` (ItemTip, ItemComparison), `border-gray-700` (Divider default, ScrollArea track), `bg-gray-700` (Checkbox unchecked, TreeView hover/selected).

## Sizing scale

- Numeric size props map 1:1 to the Tailwind spacing scale (e.g. `Icon.size` default `5` → `w-5 h-5`; `Flex.gap` numeric values map to `gap-{n}` and "must be a valid Tailwind spacing scale step (e.g., `0`–`96` in the default theme)").
- String size values are passed through as Tailwind arbitrary values (e.g. `Icon.size='[18px]'` → `w-[18px] h-[18px]`; `Grid.cols='[repeat(auto-fill,minmax(120px,1fr))]'`).
- Named size scales, verified per component: `Text.size`: `'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'` (1:1 to `text-{size}`); `Button.size`/`Input.size`: `'sm' | 'md' | 'lg'`; `Avatar.size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | number` (named presets map to Tailwind scale, a `number` is raw pixels).

## Variant taxonomy

Every styled component exposes a `variant` prop as a closed string-literal union (never a free-form string), verified examples: `Box.variant`: `'solid' | 'outline' | 'ghost' | 'transparent'`; `Button.variant`: `'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'icon-only'`; `Card.variant`: `'default' | 'outline' | 'elevated' | 'hoverable'`; `Input.variant`: `'default' | 'outline' | 'ghost' | 'filled'`; `Avatar.variant`: `'circle' | 'rounded' | 'square'`; `Divider.variant`: `'solid' | 'dashed' | 'dotted'`; `Badge.variant`: `'solid' | 'outline' | 'dot'`. Rule: variant sets are closed and documented per component in `COMPONENTS.md`'s "Variants" field; a new visual style is added by extending that union, not by allowing arbitrary strings.

## Typography

`Text` is the single typography primitive: `size` (`xs`–`4xl`), `weight` (`'thin' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'`, default `'normal'`), `fontFamily` (`'sans' | 'serif' | 'mono'`), `align`, `transform`, `tracking`, `leading` (predefined scale) with `lineHeight` (numeric/arbitrary override, takes precedence over `leading` when set). `Label` composes `Text` with `as="label"` rather than being a separate typographic primitive.

## Elevation / radius

`Card.elevation`: numeric, maps to `shadow-{n}` (verified range `1`–`8`). `Card.radius`: `'none' | 'sm' | 'md' | 'lg' | 'xl'` (default `'md'`). No separate global elevation/radius token file exists; each component declares its own default and scale.

## Composition/merge rule

All Tailwind class generation goes through `clsx` (conditional class assembly) then `tailwind-merge` (conflict resolution/de-duplication) — verified as the `Dependencies` pair on every styled primitive (`Box`, `Flex`, `Grid`, `Text`, `Input`, `Card`, etc.). A component must never concatenate class strings without this pair, since raw concatenation cannot resolve conflicting utilities (e.g. two different `bg-*` classes).

## Motion

`prefers-reduced-motion: reduce` is respected explicitly by `Overlay` (fade transition skipped/instant) and by the `A11y` component's `reducedMotion` handling (per `Overlay`'s own cross-reference). Animation durations are explicit numeric millisecond props, not CSS-file-defined durations (`Overlay.transitionDuration` default `200`; `Health`/`Energy.animationDuration` default `300`; `ItemTip.delay` default `300`).
