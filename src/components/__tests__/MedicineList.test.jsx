import { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import medicines from '../../models/medicines.js';
import MedicineList from '../MedicineList.jsx';

const noop = () => {};

function ControlledMedicineList({ onAddToCart = noop }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <MedicineList
      medicines={medicines}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onClearSearch={() => setSearchQuery('')}
      onAddToCart={onAddToCart}
    />
  );
}

describe('MedicineList', () => {
  it('renders the complete static catalog without an external fetch mock', () => {
    render(
      <MedicineList
        medicines={medicines}
        searchQuery=""
        onSearchChange={vi.fn()}
        onClearSearch={vi.fn()}
        onAddToCart={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Medicines' }))
      .toBeInTheDocument();
    expect(screen.getByText(`${medicines.length} results`))
      .toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(medicines.length);
    medicines.forEach((medicine) => {
      expect(screen.getByRole('heading', { name: medicine.name }))
        .toBeInTheDocument();
    });
  });

  it('filters immediately by partial medicine name regardless of case', async () => {
    const user = userEvent.setup();

    render(<ControlledMedicineList />);

    await user.type(
      screen.getByRole('searchbox', { name: 'Search medicines' }),
      'CETA',
    );

    expect(screen.getByText('1 result')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Cetirizine 10 mg' }))
      .toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Paracetamol 500 mg' }))
      .not.toBeInTheDocument();
  });

  it('clears the search and restores the full catalog', async () => {
    const user = userEvent.setup();

    render(<ControlledMedicineList />);

    const searchInput = screen.getByRole('searchbox', {
      name: 'Search medicines',
    });

    await user.type(searchInput, 'saline');
    await user.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(searchInput).toHaveValue('');
    expect(screen.getByText(`${medicines.length} results`))
      .toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(medicines.length);
  });

  it('shows a no-results state when no medicine names match', async () => {
    const user = userEvent.setup();

    render(<ControlledMedicineList />);

    await user.type(
      screen.getByRole('searchbox', { name: 'Search medicines' }),
      'zzzz',
    );

    const emptyState = screen.getByText('No medicines match')
      .closest('.empty-state');

    expect(screen.getByText('0 results')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(emptyState).not.toBeNull();
    expect(within(emptyState).getByText(/clear the search/i))
      .toBeInTheDocument();
  });
});
