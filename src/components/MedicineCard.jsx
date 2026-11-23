export default function MedicineCard({ medicine, onAddToCart }) {
  return (
    <article className="card medicine-card">
      <div>
        <p className="eyebrow">{medicine.category}</p>
        <h3>{medicine.name}</h3>
        <p>{medicine.description}</p>
      </div>
      <div className="medicine-card__footer">
        <strong>${medicine.price.toFixed(2)}</strong>
        <button
          className="button"
          type="button"
          disabled={!medicine.inStock}
          onClick={() => onAddToCart(medicine)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
