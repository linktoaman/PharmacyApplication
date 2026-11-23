import { describe, expect, it } from 'vitest';

import { addMedicineToCart, calculateCartTotals } from '../cart';

const aspirin = {
  id: 'aspirin',
  name: 'Aspirin',
  price: 5.5,
};

const coughSyrup = {
  id: 'cough-syrup',
  name: 'Cough Syrup',
  price: 8.25,
};

describe('addMedicineToCart', () => {
  it('adds a new cart line for a medicine that is not already present', () => {
    expect(addMedicineToCart([], aspirin)).toEqual([
      {
        medicine: aspirin,
        quantity: 1,
      },
    ]);
  });

  it('increments the quantity for a duplicate medicine instead of adding a line', () => {
    const cartLines = [
      {
        medicine: aspirin,
        quantity: 1,
      },
      {
        medicine: coughSyrup,
        quantity: 2,
      },
    ];

    expect(addMedicineToCart(cartLines, aspirin)).toEqual([
      {
        medicine: aspirin,
        quantity: 2,
      },
      {
        medicine: coughSyrup,
        quantity: 2,
      },
    ]);
  });
});

describe('calculateCartTotals', () => {
  it('calculates item count and subtotal from each cart line quantity', () => {
    expect(calculateCartTotals([
      {
        medicine: aspirin,
        quantity: 2,
      },
      {
        medicine: coughSyrup,
        quantity: 3,
      },
    ])).toEqual({
      itemCount: 5,
      subtotal: 35.75,
    });
  });

  it('returns zero totals for an empty cart', () => {
    expect(calculateCartTotals([])).toEqual({
      itemCount: 0,
      subtotal: 0,
    });
  });
});
