import { useState } from 'react';

import Cart from './components/Cart.jsx';
import CheckoutForm from './components/CheckoutForm.jsx';
import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';
import medicines from './models/medicines.js';
import { addMedicineToCart, calculateCartTotals } from './utils/cart.js';
import { initialCheckoutValues, validateCheckout } from './utils/checkout.js';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartLines, setCartLines] = useState([]);
  const [checkoutValues, setCheckoutValues] = useState(initialCheckoutValues);
  const [validationMessage, setValidationMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const totals = calculateCartTotals(cartLines);

  const handleAddToCart = (medicine) => {
    setCartLines((currentCartLines) => (
      addMedicineToCart(currentCartLines, medicine)
    ));
    setSuccessMessage('');
    setValidationMessage('');
  };

  const handleCheckoutChange = (event) => {
    const { name, value } = event.target;

    setCheckoutValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();

    const nextValidationMessage = validateCheckout(checkoutValues, cartLines);

    if (nextValidationMessage !== '') {
      setValidationMessage(nextValidationMessage);
      setSuccessMessage('');
      return;
    }

    setValidationMessage('');
    setSuccessMessage(
      'Pickup request received. The cart remains local to this session.',
    );
  };

  const handleCheckoutReset = () => {
    setCheckoutValues(initialCheckoutValues);
    setValidationMessage('');
    setSuccessMessage('');
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="topbar">
        <div className="shell topbar__content">
          <div className="brand-mark" aria-hidden="true">
            <span className="brand-mark__cross">+</span>
          </div>
          <span className="brand-name">Pharmacy Three</span>
          <Navbar activeView={activeView} onNavigate={setActiveView} />
        </div>
      </header>
      <main id="main-content" className="shell page-content">
        {activeView === 'home' && (
          <Home
            medicines={medicines}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddToCart={handleAddToCart}
          />
        )}
        {activeView === 'cart' && (
          <Cart
            cartLines={cartLines}
            totals={totals}
            onNavigate={setActiveView}
          />
        )}
        {activeView === 'checkout' && (
          <CheckoutForm
            checkoutValues={checkoutValues}
            validationMessage={validationMessage}
            successMessage={successMessage}
            onChange={handleCheckoutChange}
            onSubmit={handleCheckoutSubmit}
            onReset={handleCheckoutReset}
          />
        )}
      </main>
      <footer className="footer">
        <div className="shell">Pharmacy Three prototype foundation</div>
      </footer>
    </>
  );
}
