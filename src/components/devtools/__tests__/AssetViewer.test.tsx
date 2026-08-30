import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AssetViewer } from '../AssetViewer';

describe('AssetViewer', () => {
  it('renders asset viewer container', () => {
    render(<AssetViewer pcApp={null} aria-label="Asset List" />);
    expect(screen.getByRole('tree', { name: 'Asset List' })).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
  });
});
