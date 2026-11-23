import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Navbar from '../Navbar.jsx';

describe('Navbar', () => {
  it('renders the brand and required navigation controls', () => {
    render(<Navbar activeView="home" cartQuantity={2} />);

    expect(screen.getByText('Simple Pharmacy')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Medicines' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cart/i })).toBeInTheDocument();
    expect(screen.getByLabelText('2 items in cart')).toBeInTheDocument();
  });

  it('marks the active navigation item with aria-current', () => {
    render(<Navbar activeView="medicines" cartQuantity={0} />);

    expect(screen.getByRole('button', { name: 'Medicines' }))
      .toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Home' }))
      .not.toHaveAttribute('aria-current');
    expect(screen.getByRole('button', { name: /Cart/i }))
      .not.toHaveAttribute('aria-current');
  });

  it('calls onNavigate with the selected view', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    render(<Navbar activeView="home" cartQuantity={0} onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: 'Medicines' }));
    await user.click(screen.getByRole('button', { name: /Cart/i }));

    expect(onNavigate).toHaveBeenNthCalledWith(1, 'medicines');
    expect(onNavigate).toHaveBeenNthCalledWith(2, 'cart');
  });
});
