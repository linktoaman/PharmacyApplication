import { useState } from 'react';

import Cart from './components/Cart.jsx';
import CheckoutForm from './components/CheckoutForm.jsx';
import Home from './components/Home.jsx';
import Navbar from './components/Navbar.jsx';
import medicines from './models/medicines.js';
import { addMedicineToCart, calculateCartTotals } from './utils/cart.js';
import { initialCheckoutValues, validateCheckout } from './utils/checkout.js';

const initialAppState = {
  activeView: 'home',
  searchQuery: '',
  cart: [],
  checkoutFields: initialCheckoutValues,
  validationMessage: '',
  successMessage: '',
};

export default function App() {
  const [appState, setAppState] = useState(initialAppState);
  const {
    activeView,
    searchQuery,
    cart,
    checkoutFields,
    validationMessage,
    successMessage,
  } = appState;

  const totals = calculateCartTotals(cart);

  const handleNavigate = (nextView) => {
    setAppState((currentState) => ({
      ...currentState,
      activeView: nextView,
    }));
  };

  const handleSearchChange = (nextSearchQuery) => {
    setAppState((currentState) => ({
      ...currentState,
      searchQuery: nextSearchQuery,
    }));
  };

  const handleAddToCart = (medicine) => {
    setAppState((currentState) => ({
      ...currentState,
      cart: addMedicineToCart(currentState.cart, medicine),
      validationMessage: '',
      successMessage: '',
    }));
  };

  const handleCheckoutChange = (event) => {
    const { name, value } = event.target;

    setAppState((currentState) => ({
      ...currentState,
      checkoutFields: {
        ...currentState.checkoutFields,
        [name]: value,
      },
    }));
  };

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();

    const nextValidationMessage = validateCheckout(checkoutFields, cart);

    if (nextValidationMessage !== '') {
      setAppState((currentState) => ({
        ...currentState,
        validationMessage: nextValidationMessage,
        successMessage: '',
      }));
      return;
    }

    setAppState((currentState) => ({
      ...currentState,
      validationMessage: '',
      successMessage:
        'Pickup request received. The cart remains local to this session.',
    }));
  };

  const handleCheckoutReset = () => {
    setAppState((currentState) => ({
      ...currentState,
      checkoutFields: initialCheckoutValues,
      validationMessage: '',
      successMessage: '',
    }));
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
          <Navbar activeView={activeView} onNavigate={handleNavigate} />
        </div>
      </header>
      <main id="main-content" className="shell page-content">
        {activeView === 'home' && (
          <Home
            medicines={medicines}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onAddToCart={handleAddToCart}
          />
        )}
        {activeView === 'cart' && (
          <Cart
            cartLines={cart}
            totals={totals}
            onNavigate={handleNavigate}
          />
        )}
        {activeView === 'checkout' && (
          <CheckoutForm
            checkoutValues={checkoutFields}
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
