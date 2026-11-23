export default function App() {
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
        </div>
      </header>
      <main id="main-content" className="shell page-content">
        <section className="intro" aria-labelledby="intro-title">
          <p className="eyebrow">Static React foundation</p>
          <h1 id="intro-title">Care-ready views start here.</h1>
          <p>
            This placeholder keeps the app lightweight while future pharmacy
            workflows are added.
          </p>
        </section>
      </main>
      <footer className="footer">
        <div className="shell">Pharmacy Three prototype foundation</div>
      </footer>
    </>
  );
}
