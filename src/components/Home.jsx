export default function Home({ onNavigate }) {
  return (
    <section className="section home-hero" aria-labelledby="home-title">
      <div className="intro home-hero__copy">
        <p className="eyebrow">Simulated pharmacy demo</p>
        <h1 id="home-title">Simple Pharmacy</h1>
        <p>
          Explore a small demo pharmacy for browsing medicines, adding items to
          a local cart, and walking through a simulated checkout.
        </p>
        <p>
          Checkout details stay only in page state for this prototype and are
          cleared after the simulated checkout flow.
        </p>
        <div className="cluster home-hero__actions">
          <button
            className="button"
            type="button"
            onClick={() => onNavigate('medicines')}
          >
            Browse medicines
          </button>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => onNavigate('cart')}
          >
            View cart
          </button>
        </div>
      </div>
      <div className="pharmacy-illustration" aria-hidden="true">
        <div className="pharmacy-illustration__building">
          <div className="pharmacy-illustration__sign">Rx</div>
          <div className="pharmacy-illustration__cross">+</div>
          <div className="pharmacy-illustration__shelves">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="pharmacy-illustration__bottle">
          <span />
        </div>
        <div
          className={
            'pharmacy-illustration__pill pharmacy-illustration__pill--one'
          }
        />
        <div
          className={
            'pharmacy-illustration__pill pharmacy-illustration__pill--two'
          }
        />
      </div>
    </section>
  );
}
