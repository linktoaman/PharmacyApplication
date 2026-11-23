# Architecture Requirements Document (ARD)

> Replace all `<PLACEHOLDER>` values. Every material architecture decision or constraint should have a stable ID that feature specifications can reference.

## Document Metadata

- **Product/Application:** Simple Pharmacy React Demo
- **Document ID:** ARD-SPRD
- **Version:** 0.1
- **Status:** Draft
- **Architecture Owner:** TBD
- **Contributors:** TBD
- **Last Updated:** 2026-11-23
- **Reference PRD:** `PRD.md`

---

## 1. Architecture Summary

Simple Pharmacy React Demo will be a small static single-page React application built with Vite and basic CSS. The architecture uses lightweight MVC-style separation: static medicine data and image references as the model, reusable React components as views, and top-level React state/handler logic as the controller-style orchestration layer.

The application runs fully in the browser. It has no backend, database, authentication, payment gateway, external API, analytics, remote logging, or persistent browser storage for cart or checkout data. Medicine data and placeholder images are bundled as local static assets. Checkout fields are handled only in volatile React component state and cleared after simulated submission to support HIPAA-sensitive demo handling.

Deployment is through static hosting only, with local development, preview/staging build, and production static site environments. CI/CD installs dependencies, runs linting, tests, accessibility smoke checks, privacy inspections, builds an immutable static artifact, and deploys it. Rollback is performed by redeploying a previous static build.

## 2. Architecture Drivers

- PRD-FR-001 — Provide a home page and simple single-page navigation for Home, Medicines, and Cart.
- PRD-FR-002 — Display 6–10 static medicines with name, price, and local/static placeholder image.
- PRD-FR-003 — Support immediate case-insensitive partial-name medicine search.
- PRD-FR-004 — Manage add-to-cart behavior entirely with local React state.
- PRD-FR-005 — Display cart quantities, line totals, overall total, and empty cart state without edit controls.
- PRD-FR-006 — Provide checkout fields for customer name, phone number, and address only.
- PRD-FR-007 — Validate required checkout fields, show simulated success, and clear cart and checkout fields.
- PRD-FR-008 — Separate static data/model, reusable views, and top-level state/handler logic.
- PRD-NFR-001 — Handle checkout data only in volatile local React state and never persist or transmit it.
- PRD-NFR-002 — Keep the app lightweight with local assets, static data, local state, and basic CSS.
- PRD-NFR-003 — Provide basic accessible navigation, controls, labels, and messages.
- PRD-NFR-004 — Use clean, minimal pharmacy-themed styling.
- CON-001 — The company context is a small business in healthcare and must respect HIPAA-sensitive handling expectations.
- CON-002 — The app must not persist or transmit checkout data.
- CON-003 — The app must not include backend, database, authentication, payment gateway, or external API integrations.
- CON-004 — The app must use React with basic CSS.
- CON-005 — The app must use dummy/static medicine data.
- CON-006 — The app must use local React state for cart management.
- CON-007 — The app must remain small, lightweight, and easy to understand.
- CON-008 — Advanced workflows, additional modules, and unnecessary complexity are not allowed in this version.
- CON-009 — Target release date is not specified.

## 3. Architecture Principles

1. Keep all application behavior browser-local and static unless the PRD explicitly requires otherwise.
2. Minimize HIPAA-sensitive risk by avoiding persistence, transmission, analytics, and remote logging of checkout data.
3. Reuse established repository and platform patterns where appropriate.
4. Keep presentation, orchestration, domain, integration, and persistence concerns separated.
5. Prefer simple React state and plain CSS over frameworks, services, or abstractions that make the demo harder to understand.
6. Make acceptance and privacy behavior easy to verify through manual inspection and focused automated tests.

## 4. System Context

### 4.1 Actors

- Demo Customer — Opens the website, views pharmacy information, searches medicines, adds medicines to the cart, views totals, and submits a simulated checkout form.
- Developer Learner — Reviews the React project structure, static data model, reusable components, and controller-style state/handler logic.
- Static Hosting Provider — Serves the compiled static assets over HTTPS; does not receive checkout submissions from the application.
- CI/CD Runner — Installs dependencies, runs quality/security checks, builds the static application, and deploys immutable static assets.

### 4.2 External Systems

| ID | System | Purpose | Interface | Owner |
|---|---|---|---|---|
| EXT-001 | Static Hosting Provider | Serve bundled static HTML, CSS, JavaScript, and local image assets over HTTPS | File/HTTPS static asset delivery | TBD hosting account owner |
| EXT-002 | CI/CD Platform | Run install, lint, test, build, security scan, SBOM generation, and static deployment pipeline | Pipeline/File | TBD engineering owner |

## 5. Technology Stack

| Layer | Technology | Version/Constraint | Rationale |
|---|---|---|---|
| Frontend | React with Vite | Current stable versions selected during implementation; no additional UI framework required | Lightweight setup for a small static React demo and fast local development |
| Backend | None | Prohibited by PRD scope | Avoids real order processing, data transmission, authentication, and operational complexity |
| Data | Static JavaScript/JSON module plus local/static image assets | 6–10 dummy medicines; no database or browser persistence | Meets static catalog requirements and keeps data easy to understand |
| Hosting | Static hosting provider | Netlify, Vercel static, GitHub Pages, or equivalent; HTTPS required | Serves immutable static build without backend infrastructure |
| Styling | Basic CSS | No external design system required | Supports clean minimal pharmacy-themed design without added complexity |
| State Management | React local component state | No Redux, server state, localStorage, or sessionStorage | Keeps cart/search/checkout behavior simple and volatile |
| Testing | Unit/component testing compatible with Vite React | Exact tool TBD by repository standards | Validates filtering, cart totals, checkout validation, and key views |
| Security Tooling | Dependency/CVE scanning and SBOM generation | Block high and critical findings | Supports HIPAA-sensitive small business healthcare context |

## 6. Logical Architecture

### 6.1 Components

#### COMP-001 — App Controller

- **Responsibility:** Own top-level local React state for selected section, search query, cart contents, checkout fields, validation messages, and success message; pass data and handlers to view components.
- **Inputs:** User navigation selections, search input changes, add-to-cart clicks, checkout field changes, checkout submit event.
- **Outputs:** Props for rendered sections, updated local UI state, validation/success messages.
- **Dependencies:** COMP-002, COMP-003, COMP-004, COMP-005, COMP-006, COMP-007.
- **Repository Area:** `src/App.jsx` or `src/controllers/AppController.jsx`

#### COMP-002 — Static Medicine Model

- **Responsibility:** Provide dummy medicine records with ID, name, price, and local/static image reference.
- **Inputs:** None at runtime.
- **Outputs:** Static 6–10 medicine catalog.
- **Dependencies:** Local/static image assets.
- **Repository Area:** `src/models/medicines.js`

#### COMP-003 — Home View

- **Responsibility:** Render pharmacy name and simple home content.
- **Inputs:** Pharmacy display name and any static home copy.
- **Outputs:** Home section UI.
- **Dependencies:** Basic CSS.
- **Repository Area:** `src/components/Home.jsx`

#### COMP-004 — Navigation View

- **Responsibility:** Render keyboard-reachable Home, Medicines, and Cart navigation controls for the single-page app.
- **Inputs:** Current active section and navigation handler.
- **Outputs:** Navigation UI and section-change events.
- **Dependencies:** COMP-001, basic CSS.
- **Repository Area:** `src/components/Navbar.jsx`

#### COMP-005 — Medicine Catalog View

- **Responsibility:** Render search input, filtered medicine cards, empty search state, and add-to-cart actions.
- **Inputs:** Static catalog, current search query, filtered medicine list, search handler, add-to-cart handler.
- **Outputs:** Search change events and add-to-cart events.
- **Dependencies:** COMP-001, COMP-002, basic CSS, local/static image assets.
- **Repository Area:** `src/components/MedicineList.jsx` and `src/components/MedicineCard.jsx`

#### COMP-006 — Cart View

- **Responsibility:** Render selected medicines, quantities, line totals, overall total, empty cart state, and checkout form container.
- **Inputs:** Cart state, calculated line totals, calculated overall total, checkout state, validation/success messages, checkout handlers.
- **Outputs:** Checkout field change events and checkout submit event.
- **Dependencies:** COMP-001, COMP-007, basic CSS.
- **Repository Area:** `src/components/Cart.jsx`

#### COMP-007 — Checkout Form View

- **Responsibility:** Render customer name, phone number, and address fields; surface validation and success messages; submit simulated checkout.
- **Inputs:** Checkout field values, validation message, success message, field change handler, submit handler.
- **Outputs:** Checkout field change events and submit event.
- **Dependencies:** COMP-001, basic CSS.
- **Repository Area:** `src/components/CheckoutForm.jsx`

#### COMP-008 — Utility Logic

- **Responsibility:** Provide pure helper functions for medicine filtering, cart update, line total, cart total, and checkout validation where this improves testability without adding complexity.
- **Inputs:** Medicine list, search query, cart records, checkout field values.
- **Outputs:** Filtered medicines, updated cart records, totals, validation result.
- **Dependencies:** None.
- **Repository Area:** `src/utils/cart.js`, `src/utils/search.js`, or TBD by implementation structure

### 6.2 Data Flow

1. Browser requests static assets from EXT-001 and loads the React single-page application.
2. COMP-001 imports static medicine records from COMP-002 and passes them to COMP-005.
3. Demo Customer enters a search query; COMP-001 updates volatile local search state and COMP-005 renders medicines whose names match case-insensitive partial search.
4. Demo Customer selects add-to-cart; COMP-001 updates volatile local cart state and increments quantity when the medicine already exists in the cart.
5. Demo Customer opens Cart; COMP-006 renders selected medicines, quantities, line totals, overall total, and empty cart state when applicable.
6. Demo Customer enters checkout name, phone number, and address; COMP-001 stores these values only in volatile React state.
7. Demo Customer submits checkout; COMP-001 validates non-empty checkout fields, blocks submission on validation failure, or displays success and clears cart plus checkout state on success.
8. No checkout data is written to browser storage, sent over the network, logged remotely, or persisted after refresh/tab close/simulated success.

## 7. Architecture Decisions

### ARD-DEC-001 — Use Vite React Static Single-Page App

- **Status:** Accepted
- **Related Requirements:** PRD-FR-001, PRD-FR-008, PRD-NFR-002

**Decision**

Build the application as a Vite-powered React single-page static app.

**Rationale**

Vite is lightweight, fast for local development, and appropriate for a small React demo with static assets and no backend.

**Consequences**

- The app can be hosted on static hosting providers.
- The app avoids server-side rendering, backend routing, and framework complexity.
- Browser-only behavior must remain within the no-persistence and no-transmission constraints.

**Alternatives Considered**

- Create React App — Not selected because it is heavier and deprecated for many new React projects.
- Next.js static export — Not selected because it adds framework concepts unnecessary for the demo.
- Existing repository scaffold — Not selected as the default because no existing scaffold was specified.

### ARD-DEC-002 — Keep All Runtime Data Local and Volatile

- **Status:** Accepted
- **Related Requirements:** PRD-FR-004, PRD-FR-007, PRD-NFR-001, PRD-NFR-002

**Decision**

Search query, cart contents, checkout fields, validation messages, and success messages will be held only in React local state and cleared by normal state reset, page refresh, tab close, or successful simulated checkout.

**Rationale**

The healthcare/HIPAA context requires conservative demo handling. Avoiding browser storage and network submission reduces privacy risk and matches the PRD.

**Consequences**

- Cart and checkout information do not survive refresh or tab close.
- No backend, database, storage migration, or server audit trail exists.
- Browser storage and network inspection become key validation steps.

**Alternatives Considered**

- localStorage/sessionStorage — Not selected because the PRD prohibits persistent cart and checkout data.
- Backend API submission — Not selected because backend and external APIs are out of scope.
- Encrypted browser storage — Not selected because any persistence is unnecessary and prohibited for this demo.

### ARD-DEC-003 — Use Lightweight MVC-Style Separation Without Classical MVC Classes

- **Status:** Accepted
- **Related Requirements:** PRD-FR-008, PRD-NFR-002

**Decision**

Represent the model as static medicine data, views as reusable React components, and controller-style behavior as top-level React state and handler functions.

**Rationale**

This demonstrates separation of concerns while keeping the implementation small and understandable for a learning/demo project.

**Consequences**

- Components remain simple and easy to review.
- Testable pure utility functions may be extracted where useful.
- Strict controller/model classes and routing abstractions are intentionally avoided.

**Alternatives Considered**

- Strict classical MVC classes — Not selected because it would add unnecessary complexity.
- Folder names only with no responsibility separation — Not selected because the PRD requires meaningful separation.
- No architecture separation — Not selected because it would reduce learning value.

### ARD-DEC-004 — No External Runtime Integrations

- **Status:** Accepted
- **Related Requirements:** PRD-FR-002, PRD-FR-006, PRD-FR-007, PRD-NFR-001, PRD-NFR-002

**Decision**

The app will have no runtime external APIs, analytics, payment gateway, authentication service, backend, database, or remote logging integration. Only bundled local/static assets are used by application logic.

**Rationale**

The PRD explicitly requires a static lightweight demo and prohibits external APIs and real production workflows.

**Consequences**

- All catalog data must be included in the application bundle.
- There is no runtime dependency on third-party APIs.
- Observability is limited to local browser/manual inspection.

**Alternatives Considered**

- Privacy-safe analytics — Not selected because any telemetry adds complexity and privacy review burden.
- Remote error logging — Not selected because it could accidentally capture checkout data and is unnecessary.
- Payment or order APIs — Not selected because they are out of scope.

### ARD-DEC-005 — Deploy as Immutable Static Build

- **Status:** Accepted
- **Related Requirements:** PRD-NFR-002, PRD-NFR-004

**Decision**

Deploy production as immutable static assets to a static hosting provider with HTTPS. Rollback is performed by redeploying a previous known-good static build.

**Rationale**

Static deployment matches the no-backend architecture and is operationally simple for a small business demo.

**Consequences**

- No server runtime patching or database rollback is required.
- Hosting provider availability determines public site availability.
- Deployment pipeline must preserve prior build artifacts or provider deployment history for rollback.

**Alternatives Considered**

- Manual drag-and-drop deployment — Not selected because it weakens repeatability and rollback confidence.
- Containerized Nginx deployment — Not selected because it adds infrastructure complexity.
- Kubernetes rollout — Not selected because it is disproportionate to a static demo.

### ARD-DEC-006 — Quality Gate Includes Build, Lint, Tests, Accessibility Smoke, and Privacy Inspection

- **Status:** Accepted
- **Related Requirements:** PRD-FR-001, PRD-FR-002, PRD-FR-003, PRD-FR-004, PRD-FR-005, PRD-FR-006, PRD-FR-007, PRD-FR-008, PRD-NFR-001, PRD-NFR-003

**Decision**

Merges and release candidates must pass build, lint, unit tests, key component tests, accessibility smoke check, manual acceptance checklist, browser storage inspection, and browser network inspection.

**Rationale**

The app is small, but privacy handling and acceptance behavior are central to the healthcare/HIPAA context and demo success.

**Consequences**

- The pipeline remains lightweight while providing meaningful assurance.
- Some validation remains manual due to the small demo scope.
- High and critical dependency vulnerabilities block release.

**Alternatives Considered**

- Manual testing only — Not selected because focused tests and linting reduce regressions.
- Fixed 80% coverage threshold — Not selected because the user selected no fixed percentage for this small demo.
- Full HIPAA compliance test suite — Not selected because this is not a production healthcare ordering system.

## 8. API and Integration Architecture

### ARD-API-001 — Static Asset Delivery

- **Type:** File
- **Operation/Topic:** `GET /` and bundled static asset requests
- **Provider:** EXT-001 Static Hosting Provider
- **Consumers:** Demo Customer browser, Developer Learner browser
- **Authentication:** None for application access; HTTPS required for transport
- **Versioning:** Immutable build artifact or hosting deployment version

**Request/Input Contract**

Browser requests compiled static HTML, CSS, JavaScript, and bundled local image assets from the static hosting origin.

**Response/Output Contract**

Static host returns compiled application assets. The application bundle contains static medicine data and image references required for the demo.

**Error Handling**

Static host handles missing assets with standard HTTP status codes. Deployment validation must confirm the production build loads successfully. Rollback is redeployment of a previous static build. No checkout data is included in asset requests.

### ARD-API-002 — In-Browser Search and Cart Events

- **Type:** Event
- **Operation/Topic:** `searchChange`, `addToCart`, `navigateSection`
- **Provider:** COMP-005 Medicine Catalog View and COMP-004 Navigation View
- **Consumers:** COMP-001 App Controller
- **Authentication:** None; in-browser user interaction only
- **Versioning:** Internal component prop contract versioned with the application build

**Request/Input Contract**

Search event contains a string search query. Add-to-cart event contains a medicine ID from COMP-002. Navigation event contains one of `home`, `medicines`, or `cart`.

**Response/Output Contract**

COMP-001 updates volatile React state and rerenders the appropriate view. No network request, browser storage write, or external event publication occurs.

**Error Handling**

Unknown medicine IDs must not mutate cart state. Empty search query restores the full catalog. Invalid navigation targets must leave the current section unchanged or fall back to Home.

### ARD-API-003 — In-Browser Checkout Submit Event

- **Type:** Event
- **Operation/Topic:** `checkoutSubmit`
- **Provider:** COMP-007 Checkout Form View
- **Consumers:** COMP-001 App Controller
- **Authentication:** None; in-browser user interaction only
- **Versioning:** Internal component prop contract versioned with the application build

**Request/Input Contract**

Input contains customer name, phone number, and address strings held in volatile React state.

**Response/Output Contract**

On validation failure, COMP-001 sets a visible validation message. On successful simulated submission, COMP-001 sets a visible success message and clears cart plus checkout field state.

**Error Handling**

Submission is blocked when any required field is empty. No retry, idempotency key, network request, persistence, or external publication is used because checkout is simulated and browser-local.

## 9. Data Architecture

### DATA-001 — Medicine

- **Purpose:** Display dummy catalog entries for browsing, search, and add-to-cart behavior.
- **System of Record:** COMP-002 Static Medicine Model bundled with the app.
- **Classification:** Internal
- **Retention:** Retained in source code/static build until changed by a future release.
- **Key Relationships:** Referenced by cart lines through medicine ID.

### DATA-002 — Cart Line

- **Purpose:** Represent selected medicine quantity and calculated line total in the simulated cart.
- **System of Record:** Volatile React state in COMP-001 App Controller.
- **Classification:** Confidential
- **Retention:** Retained only in volatile browser memory until simulated checkout success, page refresh, tab close, or app state reset.
- **Key Relationships:** References DATA-001 Medicine by ID.

### DATA-003 — Checkout Fields

- **Purpose:** Collect customer name, phone number, and address for simulated checkout validation.
- **System of Record:** Volatile React state in COMP-001 App Controller.
- **Classification:** Confidential
- **Retention:** Retained only in volatile browser memory until simulated checkout success, page refresh, tab close, or app state reset; never persisted or transmitted.
- **Key Relationships:** Associated with current simulated cart only within the active browser session.

### DATA-004 — UI Messages

- **Purpose:** Display validation errors and simulated checkout success feedback.
- **System of Record:** Volatile React state in COMP-001 App Controller.
- **Classification:** Internal
- **Retention:** Retained only in volatile browser memory until changed by user action, refresh, tab close, or state reset.
- **Key Relationships:** Related to checkout validation and simulated submission state.

### Data Migration

- **Required:** No
- **Approach:** Not applicable. This is a new static demo app with no database, backend, persisted cart, persisted checkout data, or existing data migration.

## 10. Security Architecture

### ARD-SEC-001 — HIPAA-Sensitive Demo Data Handling

- **Related Requirements:** PRD-NFR-001

The implementation must:

- Store checkout name, phone number, and address only in volatile React state.
- Clear checkout fields after successful simulated checkout.
- Clear cart state after successful simulated checkout.
- Avoid localStorage, sessionStorage, IndexedDB, cookies, backend submission, analytics, remote logging, and external API transmission for checkout data.
- Support browser storage and network inspection as release validation evidence.
- Treat checkout fields as confidential healthcare-context demo data due to the healthcare/HIPAA context.

The implementation must not:

- Collect payment information, insurance information, prescription details, date of birth, or other protected health information beyond the PRD-specified fields.
- Persist cart or checkout data in browser storage.
- Send checkout data to any backend, third-party service, telemetry service, analytics tool, or remote logger.
- Present the simulated checkout as real order placement, prescription fulfillment, or pharmacy processing.

### ARD-SEC-002 — Static App Security Baseline

- **Related Requirements:** PRD-NFR-001, PRD-NFR-002

The implementation must:

- Use HTTPS when hosted publicly through the static hosting provider.
- Keep application secrets out of the codebase and build artifacts.
- Run dependency/CVE scanning before release.
- Generate an SBOM before release.
- Block release on high or critical dependency vulnerabilities unless an approved exception is recorded.

The implementation must not:

- Embed API keys, tokens, passwords, or other secrets in client-side code.
- Add authentication, authorization, or role logic for this version.
- Add remote audit logging or telemetry that could capture checkout data.

### Security Controls

- **Authentication:** None; the PRD requires no authentication and no real order processing.
- **Authorization:** None; no protected backend resources or roles exist in this version.
- **Secrets Management:** No application secrets are required; implementation must not introduce client-side secrets.
- **Encryption:** HTTPS in transit from static host to browser; no app-managed encryption at rest because no data is persisted by the application.
- **Audit Logging:** No application audit logging; manual acceptance, storage inspection, and network inspection provide validation evidence for this demo.
- **Dependency/CVE Scanning:** Required in CI/CD or release process; high and critical findings block release unless an exception is approved by the Architecture Owner and Security Reviewer.
- **SBOM:** Required for release artifacts.

## 11. Reliability, Performance, and Scalability

### ARD-OPS-001 — Static App Availability

- **Target:** Public availability follows the selected static hosting provider capability; the application has no backend runtime service dependency.
- **Validation Method:** Confirm production static site loads successfully from the hosted URL after deployment and after rollback drill when applicable.

### ARD-OPS-002 — Successful Production Build

- **Target:** `npm run build` or repository-equivalent production build completes successfully for every release candidate.
- **Validation Method:** CI/CD build step must pass before deployment.

### ARD-OPS-003 — Search Responsiveness

- **Target:** Medicine search updates immediately during manual testing with the required 6–10 item static catalog.
- **Validation Method:** Manual acceptance test verifies case-insensitive partial search and catalog restoration when search is cleared.

### ARD-OPS-004 — Cart Responsiveness

- **Target:** Add-to-cart and cart total updates complete immediately during manual testing with the required 6–10 item static catalog.
- **Validation Method:** Manual acceptance test verifies duplicate adds increment quantity, line totals update, and overall total updates.

### ARD-OPS-005 — Privacy Validation

- **Target:** Checkout name, phone number, and address are not present in localStorage, sessionStorage, IndexedDB, cookies, or outbound network requests during simulated checkout testing.
- **Validation Method:** Browser developer tools storage and network inspection during manual release validation.

## 12. Observability

- **Logging:** Browser console must show no runtime errors during manual acceptance testing; no remote logging is allowed.
- **Metrics:** No telemetry, analytics, product metrics, or remote performance collection is required or allowed for this version.
- **Tracing:** No distributed tracing is applicable because there is no backend, external API, queue, or service call.
- **Alerting:** No application alerting is required; static hosting provider availability alerts are optional and outside the application architecture.
- **Sensitive Data Restrictions:** Checkout data must not be logged to console, remote logging systems, analytics, network requests, or browser storage.

## 13. Deployment Architecture

- **Environments:** Local development, preview/staging static build, and production static site.
- **Deployment Model:** Static-site deployment of immutable compiled HTML, CSS, JavaScript, and local image assets to Netlify, Vercel static, GitHub Pages, or equivalent.
- **CI/CD:** Simple hosted static-site pipeline: install dependencies, run lint, run unit/component tests, run accessibility smoke check where configured, run dependency/CVE scan, generate SBOM, build, deploy immutable static build.
- **Configuration Management:** Use build-time static configuration only when necessary; no runtime secrets or environment-specific API endpoints are required.
- **Rollback:** Redeploy a previous known-good static build or use static host deployment history rollback.
- **Infrastructure as Code:** Use static-host project configuration files where available; no custom cloud infrastructure unless required by the selected host.

## 14. Testing Architecture

Required test levels:

- Unit tests
- Integration tests
- Contract tests
- End-to-end tests
- Security tests
- Performance tests, where applicable

Minimum quality expectations:

- **Coverage Threshold:** No fixed percentage; unit tests must cover filtering, cart quantity/total calculations, checkout required-field validation, and key component rendering, and all Must acceptance criteria must pass.
- **Blocking Security Severity:** High and critical dependency/CVE findings block release unless an approved exception is recorded.
- **Required Build/Lint Checks:** Production build, lint, unit tests, component tests for key views, accessibility smoke check, browser storage privacy inspection, browser network privacy inspection, dependency/CVE scan, SBOM generation, and manual PRD acceptance checklist.

## 15. Architecture Constraints

- ARC-CON-001 — The app must comply with healthcare/HIPAA-sensitive handling expectations by not persisting or transmitting checkout data.
- ARC-CON-002 — The app must not include a backend, database, authentication, payment gateway, external API integration, analytics, telemetry, or remote logging.
- ARC-CON-003 — The app must use React with Vite and basic CSS.
- ARC-CON-004 — The app must use static dummy medicine data containing 6–10 medicines.
- ARC-CON-005 — Medicine images must be local/static placeholder assets bundled with the React app.
- ARC-CON-006 — Cart, search, checkout fields, validation, and success messages must use volatile local React state only.
- ARC-CON-007 — Cart data and checkout data must not be written to localStorage, sessionStorage, IndexedDB, cookies, backend services, or third-party services.
- ARC-CON-008 — The app must remain small, lightweight, and easy to understand.
- ARC-CON-009 — The app must avoid advanced workflows, strict classical MVC classes, additional modules, and unnecessary complexity.
- ARC-CON-010 — Cart item removal, quantity editing, manual quantity input, and advanced cart controls are out of scope.
- ARC-CON-011 — Real patient ordering, prescription fulfillment, pharmacist workflows, and admin inventory management are out of scope.
- ARC-CON-012 — Public hosting must use HTTPS through the static hosting provider.
- ARC-CON-013 — Release must include dependency/CVE scanning and SBOM generation.
- ARC-CON-014 — Target release date is not specified.

## 16. Risks and Trade-offs

| ID | Risk/Trade-off | Impact | Mitigation |
|---|---|---|---|
| ARC-RISK-001 | Demo checkout fields could be mistaken for a real pharmacy ordering flow | High | Make UI copy and success message clearly indicate simulated checkout; do not persist or transmit data |
| ARC-RISK-002 | HIPAA context could be undermined if checkout data is stored or transmitted | High | Use volatile React state only; validate with browser storage and network inspection |
| ARC-RISK-003 | Static hosting provider logs may record normal asset requests | Low | Ensure checkout data is never encoded into URLs, query strings, asset requests, or outbound requests |
| ARC-RISK-004 | Scope creep could add backend, auth, payments, analytics, or inventory management | Medium | Enforce architecture constraints and PRD out-of-scope items during review |
| ARC-RISK-005 | MVC-style separation could become too complex for a small demo | Medium | Use simple static data, reusable components, and top-level handlers instead of strict MVC classes |
| ARC-RISK-006 | No fixed coverage percentage may allow weak test depth | Medium | Require focused tests for filtering, cart totals, checkout validation, key views, and all Must acceptance criteria |
| ARC-RISK-007 | No backend audit log limits traceability | Low | Accept as appropriate for a static simulated demo; use manual acceptance evidence instead |

## 17. Open Architecture Questions

| ID | Question | Owner | Status | Decision/Due Date |
|---|---|---|---|---|
| ARC-OQ-001 | Which specific static hosting provider will be used: Netlify, Vercel static, GitHub Pages, or equivalent? | Architecture Owner | Open | TBD |
| ARC-OQ-002 | Which exact unit/component testing tools will be used with Vite React? | Engineering Lead | Open | TBD |
| ARC-OQ-003 | Who is the named Architecture Owner for approval? | Product Owner | Open | TBD |
| ARC-OQ-004 | Who is the named Security Reviewer for approval? | Product Owner | Open | TBD |
| ARC-OQ-005 | Who is the named Engineering Lead for approval? | Product Owner | Open | TBD |

## 18. Feature Mapping

| Feature | Relevant Components | Decision IDs | Interface IDs | Security IDs |
|---|---|---|---|---|
| FEAT-001 | COMP-001, COMP-003, COMP-004 | ARD-DEC-001, ARD-DEC-003, ARD-DEC-006 | ARD-API-001, ARD-API-002 | ARD-SEC-002 |
| FEAT-002 | COMP-001, COMP-002, COMP-005, COMP-008 | ARD-DEC-001, ARD-DEC-003, ARD-DEC-004, ARD-DEC-006 | ARD-API-001, ARD-API-002 | ARD-SEC-002 |
| FEAT-003 | COMP-001, COMP-006, COMP-008 | ARD-DEC-002, ARD-DEC-003, ARD-DEC-006 | ARD-API-002 | ARD-SEC-001, ARD-SEC-002 |
| FEAT-004 | COMP-001, COMP-006, COMP-007, COMP-008 | ARD-DEC-002, ARD-DEC-004, ARD-DEC-006 | ARD-API-003 | ARD-SEC-001, ARD-SEC-002 |
| FEAT-005 | COMP-001, COMP-002, COMP-003, COMP-004, COMP-005, COMP-006, COMP-007, COMP-008 | ARD-DEC-001, ARD-DEC-003 | ARD-API-002, ARD-API-003 | ARD-SEC-001, ARD-SEC-002 |

## 19. Approval

| Role | Name | Decision | Date |
|---|---|---|---|
| Solution Architect | TBD | Pending | TBD |
| Security Reviewer | TBD | Pending | TBD |
| Engineering Lead | TBD | Pending | TBD |