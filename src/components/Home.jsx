import MedicineList from './MedicineList.jsx';

export default function Home({
  medicines,
  searchQuery,
  onSearchChange,
  onAddToCart,
}) {
  return (
    <section className="section stack" aria-labelledby="home-title">
      <div className="intro">
        <p className="eyebrow">Pharmacy catalog</p>
        <h1 id="home-title">Care-ready essentials.</h1>
        <p>
          Browse the starter medicine catalog and add items to the local cart
          prototype.
        </p>
      </div>
      <MedicineList
        medicines={medicines}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onAddToCart={onAddToCart}
      />
    </section>
  );
}
