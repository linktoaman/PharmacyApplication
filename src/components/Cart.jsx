export default function Cart({
  cartLines,
  totals,
  onNavigate,
}) {
  return (
    <section className="section stack" aria-labelledby="cart-title">
      <div>
        <p className="eyebrow">Local cart</p>
        <h1 id="cart-title">Review cart.</h1>
      </div>

      {cartLines.length > 0 ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Medicine</th>
                <th scope="col">Qty</th>
                <th scope="col">Line total</th>
              </tr>
            </thead>
            <tbody>
              {cartLines.map((line) => (
                <tr key={line.medicine.id}>
                  <td>{line.medicine.name}</td>
                  <td>{line.quantity}</td>
                  <td>${(line.medicine.price * line.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>Your cart is empty.</p>
        </div>
      )}

      <div className="card cart-summary">
        <p>
          {totals.itemCount} item{totals.itemCount === 1 ? '' : 's'} | $
          {totals.subtotal.toFixed(2)}
        </p>
        <button
          className="button"
          type="button"
          disabled={cartLines.length === 0}
          onClick={() => onNavigate('checkout')}
        >
          Continue to checkout
        </button>
      </div>
    </section>
  );
}
