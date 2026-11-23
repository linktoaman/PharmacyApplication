import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import MedicineCard from '../MedicineCard.jsx';

const medicine = {
  id: 'paracetamol-500',
  name: 'Paracetamol 500 mg',
  category: 'Pain relief',
  description: 'Common over-the-counter option for minor aches and fever.',
  price: 7.49,
  image: '/src/assets/medicines/paracetamol.svg',
  inStock: true,
};

describe('MedicineCard', () => {
  it('renders the medicine name, price, image, and add action', () => {
    const { container } = render(
      <MedicineCard medicine={medicine} onAddToCart={vi.fn()} />,
    );

    expect(screen.getByRole('heading', { name: medicine.name }))
      .toBeInTheDocument();
    expect(screen.getByText('$7.49')).toBeInTheDocument();
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      medicine.image,
    );
    expect(screen.getByRole('button', { name: 'Add to cart' }))
      .toBeEnabled();
  });

  it('emits the static medicine id when the add action is selected', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(<MedicineCard medicine={medicine} onAddToCart={onAddToCart} />);

    await user.click(screen.getByRole('button', { name: 'Add to cart' }));

    expect(onAddToCart).toHaveBeenCalledWith(medicine.id);
  });
});
