export default function MedicineCard({ medicine, onAddToCart }) {
  return (
    <article className="card medicine-card">
      <div className="medicine-card__image-wrap">
        <img
          className="medicine-card__image"
          src={medicine.image}
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="medicine-card__content">
        <div>
          <p className="medicine-card__tag">Demo item</p>
          <h3>{medicine.name}</h3>
          <p>{medicine.description}</p>
        </div>
        <p className="medicine-card__category">{medicine.category}</p>
      </div>
      <div className="medicine-card__footer">
        <strong>${medicine.price.toFixed(2)}</strong>
        <button
          className="button"
          type="button"
          disabled={!medicine.inStock}
          onClick={() => onAddToCart(medicine.id)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
