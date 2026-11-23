const views = [
  { id: 'home', label: 'Home' },
  { id: 'cart', label: 'Cart' },
  { id: 'checkout', label: 'Checkout' },
];

export default function Navbar({ activeView, onNavigate }) {
  return (
    <nav className="navbar" aria-label="Primary navigation">
      {views.map((view) => (
        <button
          key={view.id}
          className={`button ${activeView === view.id ? '' : 'button--quiet'}`}
          type="button"
          aria-current={activeView === view.id ? 'page' : undefined}
          onClick={() => onNavigate(view.id)}
        >
          {view.label}
        </button>
      ))}
    </nav>
  );
}
