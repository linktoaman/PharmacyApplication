import { describe, expect, it } from 'vitest';

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
  it('returns every medicine when the search query is blank', () => {
    expect(filterMedicines(medicines, '   ')).toBe(medicines);
  });

  it('filters medicines by name, category, or description without matching case', () => {
    expect(filterMedicines(medicines, 'pain')).toEqual([medicines[0]]);
    expect(filterMedicines(medicines, 'ALLERGY')).toEqual([medicines[1]]);
    expect(filterMedicines(medicines, 'vitamin')).toEqual([medicines[2]]);
  });

  it('trims surrounding whitespace before matching the query', () => {
    expect(filterMedicines(medicines, '  ibuPROFen  ')).toEqual([medicines[0]]);
  });
});
