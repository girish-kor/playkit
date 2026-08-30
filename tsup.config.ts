import { defineConfig } from 'tsup';

// Build requirements this must satisfy (docs/BUILD.md):
// 1. Compile the TypeScript-style contracts in COMPONENTS.md / docs/API.md.
// 2. Never let the CSS pipeline (owned by the *consuming* app's Tailwind config,
//    per docs/DESIGN-SYSTEM.md) purge dynamically generated classes -- this library
//    ships class NAMES as strings, it does not compile or ship CSS itself.
// 3. Exclude the Debug/DevTools category from the production entry point -- enforced
//    here by giving it its own separate entry/export ('./devtools'), never bundled
//    into or re-exported from 'index'. See src/index.ts, src/devtools.ts, and
//    scripts/verify-devtools-excluded.mjs.
// 4. Produce a package entry point re-exporting every (non-DevTools) component and
//    hook, per docs/FOLDER-STRUCTURE.md.
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    devtools: 'src/devtools.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  target: 'es2020',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-router-dom', 'playcanvas'],
});
