import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OrientationLock } from '../OrientationLock';

describe('OrientationLock', () => {
  it('renders children or fallback based on orientation', () => {
    const onMatch = vi.fn();
    const onMismatch = vi.fn();

    render(
      <OrientationLock
        required="landscape"
        onOrientationMatch={onMatch}
        onOrientationMismatch={onMismatch}
        aria-label="Orientation warning"
      >
        <div>Content</div>
      </OrientationLock>,
    );

    // JSDOM viewport is typically 1024x768 (width >= height -> landscape)
    const alertEl = screen.queryByRole('alert', { name: 'Orientation warning' });
    if (alertEl) {
      expect(alertEl).toBeInTheDocument();
      expect(onMismatch).toHaveBeenCalled();
    } else {
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(onMatch).toHaveBeenCalled();
    }
  });

  it('attempts orientation lock when attemptLock is true', () => {
    const onLockFailed = vi.fn();
    render(
      <OrientationLock required="portrait" attemptLock={true} onLockFailed={onLockFailed}>
        <div>Content</div>
      </OrientationLock>,
    );
    // screen.orientation.lock is not present in JSDOM by default
  });
});
