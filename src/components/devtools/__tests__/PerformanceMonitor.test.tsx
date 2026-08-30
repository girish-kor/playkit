import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PerformanceMonitor } from '../PerformanceMonitor';

describe('PerformanceMonitor', () => {
  it('renders status region with specified metrics', () => {
    render(<PerformanceMonitor pcApp={null} metrics={['fps', 'drawCalls']} aria-label="Perf Monitor" />);
    const region = screen.getByRole('status', { name: 'Perf Monitor' });
    expect(region).toBeInTheDocument();
    expect(screen.getByText(/fps:/)).toBeInTheDocument();
    expect(screen.getByText(/drawCalls:/)).toBeInTheDocument();
  });
});
