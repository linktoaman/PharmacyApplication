import { filterMedicines } from '../utils/search.js';
import MedicineCard from './MedicineCard.jsx';

export default function MedicineList({
  medicines,
  searchQuery,
  onSearchChange,
  onClearSearch = () => onSearchChange(''),
  onAddToCart,
}) {
  const visibleMedicines = filterMedicines(medicines, searchQuery);
  const resultLabel = visibleMedicines.length === 1 ? 'result' : 'results';

  return (
    <section className="catalog stack" aria-labelledby="catalog-title">
      <div className="catalog__header">
        <div className="catalog__intro">
          <div>
            <h2 id="catalog-title">Medicines</h2>
            <p>
              Search the sample catalog and add demo medicines to your cart.
            </p>
          </div>
          <span className="catalog__count" aria-live="polite">
            {visibleMedicines.length} {resultLabel}
          </span>
        </div>
        <div className="catalog__controls">
          <label className="field catalog-search">
            <span>Search medicines</span>
            <input
              className="input"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Try paracetamol or saline"
              aria-describedby="catalog-search-hint"
            />
          </label>
          <button
            className="button button--secondary catalog__clear"
            type="button"
            onClick={onClearSearch}
          >
            Clear search
          </button>
          <p id="catalog-search-hint" className="catalog__hint">
            Filters by medicine name as you type.
          </p>
        </div>
      </div>

      {visibleMedicines.length > 0 ? (
        <div className="catalog__grid">
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
          <h3>No medicines match</h3>
          <p>
            Try a different medicine name or clear the search to view the full
            catalog.
          </p>
        </div>
      )}
    </section>
  );
}
