import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Settings } from '../Settings';
import type { SettingsCategory } from '../../../types';

const mockCategories: SettingsCategory[] = [
  {
    id: 'general',
    label: 'General',
    settings: [
      { key: 'fullscreen', label: 'Fullscreen', type: 'toggle', default: false },
      { key: 'volume', label: 'Volume', type: 'slider', default: 80, min: 0, max: 100 },
      { key: 'quality', label: 'Quality', type: 'select', default: 'high', options: [{ label: 'High', value: 'high' }, { label: 'Low', value: 'low' }] },
    ],
  },
];

describe('Settings', () => {
  it('renders modal when isOpen is true', () => {
    render(<Settings isOpen={true} onClose={() => {}} categories={mockCategories} />);
    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByText('Fullscreen')).toBeInTheDocument();
  });

  it('calls onOpen when opened', () => {
    const onOpen = vi.fn();
    render(<Settings isOpen={true} onOpen={onOpen} onClose={() => {}} categories={mockCategories} />);
    expect(onOpen).toHaveBeenCalled();
  });

  it('calls onClose with cancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Settings isOpen={true} onClose={onClose} categories={mockCategories} />);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalledWith('cancel');
  });

  it('calls onSearch when search input is typed into', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Settings isOpen={true} onClose={() => {}} categories={mockCategories} onSearch={onSearch} />);
    const searchInput = screen.getByRole('searchbox', { name: 'Search settings' });
    await user.type(searchInput, 'v');
    expect(onSearch).toHaveBeenCalledWith('v');
  });

  it('enables save button when setting changes (isDirty)', async () => {
    const user = userEvent.setup();
    render(<Settings isOpen={true} onClose={() => {}} categories={mockCategories} />);
    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeDisabled();

    await user.click(screen.getByRole('switch', { name: 'Fullscreen' }));
    expect(saveButton).toBeEnabled();
  });
});
