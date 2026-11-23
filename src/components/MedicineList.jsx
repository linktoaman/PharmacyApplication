import { filterMedicines } from '../utils/search.js';
import MedicineCard from './MedicineCard.jsx';

export default function MedicineList({
  medicines,
  searchQuery,
  onSearchChange,
  onAddToCart,
}) {
  const visibleMedicines = filterMedicines(medicines, searchQuery);

  return (
    <section className="stack" aria-labelledby="catalog-title">
      <div className="card">
        <div className="card__header">
          <div>
            <h2 id="catalog-title">Medicines</h2>
            <p>Static sample inventory for the Pharmacy Three prototype.</p>
          </div>
          <label className="field catalog-search">
            <span>Search catalog</span>
            <input
              className="input"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by medicine or category"
            />
          </label>
        </div>
      </div>

      {visibleMedicines.length > 0 ? (
        <div className="grid">
          {visibleMedicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No medicines match that search.</p>
        </div>
      )}
    </section>
  );
}
