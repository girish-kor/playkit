#!/usr/bin/env node
// CI-CD gate (docs/CI-CD.md #4): "Verify no Debug/DevTools-category component is
// reachable from the production entry point." Runs against the BUILT artifact
// (dist/index.js), after `npm run build`, so it checks what actually ships, not just
// the source graph.
import { readFileSync, existsSync } from 'node:fs';

const DEVTOOLS_COMPONENTS = new Set([
  'DevTools',
  'Inspector',
  'Property',
  'Console',
  'PerformanceMonitor',
  'AssetViewer',
]);

const entryPath = new URL('../dist/index.js', import.meta.url);

if (!existsSync(entryPath)) {
  console.error(
    `verify-devtools-excluded: ${entryPath.pathname} does not exist. Run "npm run build" first.`,
  );
  process.exit(1);
}

const source = readFileSync(entryPath, 'utf8');

// Collect every locally-exported binding name from every `export { ... }` block, and
// resolve `X as Y` aliases to the externally-visible name `Y` — that external name is
// what a consumer would actually import, which is what "reachable from the production
// entry point" (docs/BUILD.md #3) means.
const exportedNames = new Set();
for (const match of source.matchAll(/export\s*\{([^}]*)\}/g)) {
  for (const rawEntry of match[1].split(',')) {
    const entry = rawEntry.trim();
    if (!entry) continue;
    const asMatch = entry.match(/^(\S+)\s+as\s+(\S+)$/);
    exportedNames.add(asMatch ? asMatch[2] : entry);
  }
}

const leaked = [...DEVTOOLS_COMPONENTS].filter((name) => exportedNames.has(name));

if (leaked.length > 0) {
  console.error(
    `verify-devtools-excluded: FAILED. The following Debug/DevTools components are reachable ` +
      `from dist/index.js: ${leaked.join(', ')}. They must only be exported from ` +
      `'game-ui-components/devtools' (dist/devtools.js), never from the main entry point ` +
      `(docs/BUILD.md, docs/LOGGING.md).`,
  );
  process.exit(1);
}

console.log(
  'verify-devtools-excluded: OK — no Debug/DevTools component is exported from the production entry point.',
);
