import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from '../Label';

describe('Label', () => {
  it('renders as a <label> associated with htmlFor', () => {
    render(<Label htmlFor="field">Name</Label>);
    const label = screen.getByText('Name', { selector: 'label' });
    expect(label).toHaveAttribute('for', 'field');
  });

  it('derives data-variant="required" from the required prop and shows the indicator', () => {
    render(<Label required>Name</Label>);
    const label = screen.getByText('Name', { exact: false, selector: 'label' });
    expect(label).toHaveAttribute('data-variant', 'required');
    expect(label).toHaveTextContent('*');
  });

  it('derives data-variant="optional" and shows the (optional) suffix', () => {
    render(<Label optional>Nickname</Label>);
    const label = screen.getByText('Nickname', { exact: false, selector: 'label' });
    expect(label).toHaveAttribute('data-variant', 'optional');
    expect(label).toHaveTextContent('(optional)');
  });

  it('hidden: true visually hides the label via sr-only while keeping it in the a11y tree', () => {
    render(<Label hidden>Hidden label</Label>);
    const label = screen.getByText('Hidden label', { selector: 'label' });
    expect(label.className).toContain('sr-only');
  });

  it('supports a custom requiredIndicator', () => {
    render(
      <Label required requiredIndicator="(required)">
        Name
      </Label>,
    );
    expect(screen.getByText('(required)')).toBeInTheDocument();
  });
});
