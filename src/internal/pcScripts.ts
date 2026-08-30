/**
 * Loads `PCProvider.config.scripts` in order, each fully loaded before the next starts,
 * so that "any component script referenced by `pcAction`/`useScript` elsewhere in the
 * tree is guaranteed to be registered by the time `onReady` fires" (COMPONENTS.md §
 * Component: PCProvider). A PlayCanvas script file loaded this way self-registers via
 * its own top-level `pc.registerScript(...)` call when it executes, so ordered
 * sequential `<script>` injection is sufficient — no return value is needed here.
 */
export async function loadScriptsInOrder(urls: string[], assetPrefix?: string): Promise<void> {
  for (const url of urls) {
    await loadScript(assetPrefix ? new URL(url, assetPrefix).toString() : url);
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      // Non-browser environment (e.g. a test runner without jsdom's `document`) — a
      // script tag can't be injected; resolve immediately rather than hanging forever.
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load PlayCanvas script: ${src}`));
    document.head.appendChild(script);
  });
}
