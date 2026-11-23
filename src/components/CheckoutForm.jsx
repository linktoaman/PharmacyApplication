export default function CheckoutForm({
  checkoutValues,
  validationMessage,
  successMessage,
  onChange,
  onSubmit,
  onReset,
}) {
  return (
    <section className="section stack" aria-labelledby="checkout-title">
      <div>
        <p className="eyebrow">Checkout</p>
        <h1 id="checkout-title">Confirm pickup.</h1>
      </div>

      {validationMessage !== '' && (
        <p className="message message--danger" role="alert">
          {validationMessage}
        </p>
      )}
      {successMessage !== '' && (
        <p className="message message--success" role="status">
          {successMessage}
        </p>
      )}

      <form className="card stack" onSubmit={onSubmit}>
        <div className="form-grid">
          <label className="field">
            <span>Patient name</span>
            <input
              className="input"
              name="fullName"
              value={checkoutValues.fullName}
              onChange={onChange}
              autoComplete="name"
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              className="input"
              name="email"
              type="email"
              value={checkoutValues.email}
              onChange={onChange}
              autoComplete="email"
            />
          </label>
          <label className="field">
            <span>Phone</span>
            <input
              className="input"
              name="phone"
              type="tel"
              value={checkoutValues.phone}
              onChange={onChange}
              autoComplete="tel"
            />
          </label>
        </div>
        <div className="cluster">
          <button className="button" type="submit">
            Place order
          </button>
          <button
            className="button button--secondary"
            type="button"
            onClick={onReset}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
