const views = [
  { id: 'home', label: 'Home' },
  { id: 'medicines', label: 'Medicines' },
  { id: 'cart', label: 'Cart' },
];

const noop = () => {};

export default function Navbar({
  activeView = 'home',
  cartQuantity = 0,
  onNavigate = noop,
}) {
  const displayedCartQuantity = Number.isFinite(cartQuantity)
    ? Math.max(0, cartQuantity)
    : 0;

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <div className="navbar__brand">
        <span className="brand-mark" aria-hidden="true">
          <span className="brand-mark__cross">+</span>
        </span>
        <span className="brand-name">Simple Pharmacy</span>
      </div>

      <div className="navbar__controls">
        {views.map((view) => (
          <button
            key={view.id}
            className="navbar__button"
            type="button"
            aria-current={activeView === view.id ? 'page' : undefined}
            onClick={() => onNavigate(view.id)}
          >
            <span>{view.label}</span>
            {view.id === 'cart' && (
              <span
                className="cart-badge"
                aria-label={`${displayedCartQuantity} items in cart`}
              >
                {displayedCartQuantity}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
