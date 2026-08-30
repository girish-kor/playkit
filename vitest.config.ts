import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// docs/TESTING.md's requirements this config exists to satisfy:
// - jsdom environment (component tests must not require a live PlayCanvas app/DOM).
// - deterministic fake timers are opted into PER TEST (not globally here), since
//   rAF-/timer-driven behavior (useAnimation, useTimer, Dialogue's typewriter) needs
//   explicit control, not a single global timer policy.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/test/**'],
    },
  },
});
