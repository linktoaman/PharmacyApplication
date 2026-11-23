import { describe, expect, it } from 'vitest';

import staticMedicines from '../../models/medicines';
import { filterMedicines } from '../search';

const medicines = [
  {
    id: 'pain-away',
    name: 'Pain Away',
    category: 'Pain Relief',
    description: 'Ibuprofen tablets for headaches and inflammation.',
  },
  {
    id: 'allergy-ease',
    name: 'Allergy Ease',
    category: 'Allergy',
    description: 'Antihistamine capsules for seasonal allergy symptoms.',
  },
  {
    id: 'vita-boost',
    name: 'Vita Boost',
    category: 'Supplements',
    description: 'Daily vitamin support.',
  },
];

describe('filterMedicines', () => {
  it('keeps the bundled static catalog within the required complete shape', () => {
    expect(staticMedicines.length).toBeGreaterThanOrEqual(6);
    expect(staticMedicines.length).toBeLessThanOrEqual(10);

    staticMedicines.forEach((medicine) => {
      expect(medicine).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        category: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        image: expect.any(String),
        inStock: expect.any(Boolean),
      }));
      expect(medicine.id).not.toBe('');
      expect(medicine.name).not.toBe('');
      expect(medicine.image).not.toBe('');
    });
  });

  it('returns every medicine when the search query is blank', () => {
    expect(filterMedicines(medicines, '   ')).toBe(medicines);
  });

  it('filters medicines by partial name without matching case', () => {
    expect(filterMedicines(medicines, 'pain')).toEqual([medicines[0]]);
    expect(filterMedicines(medicines, 'ALLERGY')).toEqual([medicines[1]]);
    expect(filterMedicines(medicines, 'boost')).toEqual([medicines[2]]);
  });

  it('filters the static catalog by immediate partial-name queries', () => {
    expect(filterMedicines(staticMedicines, 'para')).toEqual([
      staticMedicines[0],
    ]);
    expect(filterMedicines(staticMedicines, 'SYR')).toEqual([
      staticMedicines[4],
    ]);
  });

  it('trims surrounding whitespace before matching the query', () => {
    expect(filterMedicines(medicines, '  vita  ')).toEqual([medicines[2]]);
  });

  it('returns no medicines when names do not match the query', () => {
    expect(filterMedicines(medicines, 'ibuprofen')).toEqual([]);
  });
});
