import '@testing-library/jest-dom/vitest';

// jsdom does not implement ResizeObserver, but several Radix primitives used across
// this library (Popover, Select, Slider, ...) call it internally to measure their
// content -- stub a no-op implementation so those components render in tests instead
// of throwing "ResizeObserver is not defined".
if (typeof globalThis.ResizeObserver === 'undefined') {
  class ResizeObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
}

// jsdom does not implement PointerEvent capture APIs that Radix's pointer-based
// interactions (Slider, Popover, DropdownMenu, ...) call directly on elements.
if (typeof Element !== 'undefined') {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = () => {};
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {};
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
}
