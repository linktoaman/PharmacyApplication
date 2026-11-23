import { useEffect, useRef, useState } from 'react';

import Cart from './components/Cart.jsx';
import Home from './components/Home.jsx';
import MedicineList from './components/MedicineList.jsx';
import Navbar from './components/Navbar.jsx';
import medicines from './models/medicines.js';
import { addMedicineToCart, calculateCartTotals } from './utils/cart.js';

const validViews = new Set(['home', 'medicines', 'cart']);

const initialAppState = {
  activeView: 'home',
  searchQuery: '',
  cart: [],
};

export default function App() {
  const [appState, setAppState] = useState(initialAppState);
  const mainContentRef = useRef(null);
  const shouldFocusMainRef = useRef(false);
  const {
    activeView,
    searchQuery,
    cart,
  } = appState;

  const totals = calculateCartTotals(cart);

  useEffect(() => {
    if (!shouldFocusMainRef.current) {
      return;
    }

    shouldFocusMainRef.current = false;
    mainContentRef.current?.focus();
  }, [activeView]);

  const handleNavigate = (nextView) => {
    if (!validViews.has(nextView)) {
      return;
    }

    shouldFocusMainRef.current = true;
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

  const handleClearSearch = () => {
    setAppState((currentState) => ({
      ...currentState,
      searchQuery: '',
    }));
  };

  const handleAddToCart = (medicineId) => {
    const selectedMedicine = medicines.find((medicine) => (
      medicine.id === medicineId
    ));

    if (!selectedMedicine) {
      return;
    }

    setAppState((currentState) => ({
      ...currentState,
      cart: addMedicineToCart(currentState.cart, selectedMedicine),
    }));
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="topbar">
        <div className="shell topbar__content">
          <Navbar
            activeView={activeView}
            cartQuantity={totals.itemCount}
            onNavigate={handleNavigate}
          />
        </div>
      </header>
      <main
        id="main-content"
        className="shell page-content"
        ref={mainContentRef}
        tabIndex={-1}
      >
        {activeView === 'home' && (
          <Home onNavigate={handleNavigate} />
        )}
        {activeView === 'medicines' && (
          <section className="section">
            <MedicineList
              medicines={medicines}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onClearSearch={handleClearSearch}
              onAddToCart={handleAddToCart}
            />
          </section>
        )}
        {activeView === 'cart' && (
          <Cart
            cartLines={cart}
            totals={totals}
            onNavigate={handleNavigate}
          />
        )}
      </main>
      <footer className="footer">
        <div className="shell">Pharmacy Three prototype foundation</div>
      </footer>
    </>
  );
}
