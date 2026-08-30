# Security

Source: security-relevant props and behaviors verified in `COMPONENTS.md`. This is a client-side UI component library; no server, auth, or backend code exists in the repository. The rules below bind what is in scope: XSS surface, cross-origin resource handling, and untrusted-input handling within components.

## XSS surface

`Text.dangerouslySetInnerHTML: { __html: string }` "renders raw HTML for rich text (e.g., inline formatting from a CMS), mirroring React's native prop. Bypasses `children`; the caller is responsible for sanitizing the HTML before passing it in to avoid XSS." This is the only documented raw-HTML injection point in the entire component set.

**Rule:** Any value passed to `Text`'s `dangerouslySetInnerHTML` must be sanitized (e.g. an allowlist-based HTML sanitizer) at the call site before it reaches the component; the component itself performs no sanitization. Do not introduce a second raw-HTML prop on any other component without the same explicit caller-sanitizes contract documented alongside it.

## Cross-origin resource loading

`Image` exposes `crossOrigin?: 'anonymous' | 'use-credentials' | ''` and `referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'` (native `ReferrerPolicy` values). `Image.priority` (LCP hint) is documented as needing an accompanying `<link rel="preconnect">` (and ideally `rel="preload" as="image"`) in the document head for cross-origin images — `priority` alone does not establish an early connection, and does not itself change trust/credential behavior.

**Rule:** Do not default `crossOrigin` to `'use-credentials'`; only set it when the resource's origin explicitly requires credentialed CORS. Prefer the most restrictive applicable `referrerPolicy` (`'strict-origin-when-cross-origin'` or stricter) unless a specific integration requires otherwise.

## Untrusted external content

`loadChildren?: (id: string) => Promise<TreeNode[]>` (`TreeView`) and `onCraft: (recipeId: string) => void | Promise<void>` (`CraftingPanel`) are the two documented points where a component awaits caller-supplied async data. Neither component validates the shape of what the promise resolves to; the caller is responsible for the data's integrity before it is rendered.

## File input handling

`Input` with `type="file"` exposes `accept` (comma-separated MIME/extension allowlist) and `multiple`. `accept` is a client-side hint only — it is not a security boundary (browsers do not strictly enforce it, and it does not validate file content); any file-type or content validation of an uploaded file must happen after the file leaves this component, not be assumed from `accept` having been set.

## Icon/name resolution

`Icon.name` is "typed as a plain `string`, not a union of Lucide icon names, so an unrecognized name is only caught at runtime (renders nothing, or falls back to a placeholder) rather than at compile time." This is a correctness gap, not by itself an injection vector, since it resolves against a fixed local icon registry rather than executing or rendering caller-supplied markup.

## Required accessible text as a content-integrity rule

`Image.alt` and `Avatar.alt` are required props specifically "to force this to be a deliberate choice rather than an oversight" — for decorative images the caller must pass `alt=""` explicitly. This is an accessibility rule (see `docs/ACCESSIBILITY.md`) restated here because it is enforced at the type level, the same enforcement pattern security-relevant required props should follow.

## Network hook (`useNetwork`)

`useNetwork({networkId, channel, reconnect?, onMessage?, onPlayerJoin?, onPlayerLeave?, onDisconnect?, onReconnect?, onError?})` uses `pc.WebSocket` "or custom network layer," for multiplayer only. `networkId` is not validated — an unknown/expired ID fails asynchronously via `onError`/`isConnected` staying `false`, not a synchronous rejection. `reconnect` defaults `true` (backoff retries on disconnect). No authentication, message-signing, payload-validation, or transport-encryption detail is documented for this hook.

**Rule:** Treat every `onMessage` payload as untrusted network input and validate/sanitize it before use in UI state (e.g. before passing any part of it to `Text.dangerouslySetInnerHTML` or rendering as trusted HTML) — `useNetwork` itself performs no payload validation.

## Out of scope (not documented, not to be assumed)

No authentication, authorization, session, or secrets-management code exists in `COMPONENTS.md` or elsewhere in this repository. Beyond `useNetwork`'s WebSocket-based multiplayer channel, no other network-transport or server-side code is documented.
