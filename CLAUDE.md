# BYD Price Estimator — Claude Guide

## Project

Vite 5 + React 18 SPA. Instant price calculator for custom standing desks sold by Build Your Desks. No TypeScript, no CSS framework, no server side.

## Dev Commands

```bash
npm run dev          # start dev server (localhost:5173)
npm run build        # production build → dist/
npm run lint         # ESLint (zero errors required)
npm run lint:fix     # auto-fix lint issues
npm run format       # Prettier write
npm run format:check # Prettier check (CI gate)
npm run test         # Vitest watch
npm run test:run     # Vitest run once (CI gate)
```

## File Structure

```
src/
  App.jsx                         root — desk type state, header, footer
  main.jsx                        ReactDOM mount + global.css import
  styles/global.css               body/scrollbar/range resets only
  constants/
    tokens.js                     T — design token object (all colours/font)
    config.js                     🔴 business config (CONTACT_URL, UNIDESK_PRICE, desk names)
    assembly.js                   TOP_RATE, ASSEMBLY_STANDARD/TWO_PERSON/THRESHOLD_CM
    accessories.js                ACCESSORY_DRAWER/RETRACT_SOCKET/CASTOR_4PCS/6PCS
    rectDesk.js                   RECT_FRAMES, colours, edges, grommets, grommetRectPrice()
    lshapeDesk.js                 LSHAPE_MATERIALS, SOLID_WOOD_SPECIES, routing options
    deskTypes.js                  TYPES array for the desk selector
  utils/helpers.js                fmt(v), clamp(v, min, max)
  components/
    TypeSelector.jsx              renders TypeCard grid
    ui/                           12 stateless primitives (Card, PillSelect, etc.)
    calculators/
      RectCalculator.jsx          rectangular desk — size/frame/colour/accessories/total
      LShapeCalculator.jsx        material tab switcher → LShapeMaterialPanel
      LShapeMaterialPanel.jsx     full L-shape state + pricing (largest component)
      LShapeDiagram.jsx           SVG live-scaled L-shape preview
      UniDeskCard.jsx             fixed-size UniDesk
      ComingSoonCard.jsx          placeholder for future desks
  test/
    setup.js                      @testing-library/jest-dom import
    helpers.test.js               fmt, clamp unit tests
    pricing.test.js               constants, grommet pricing, area calculations
    components/                   Card, CheckOption, PillSelect, RectCalculator tests
```

## Architecture

**Styling**: All via React inline `style={}` objects. Never add CSS classes or Tailwind. Token source: `src/constants/tokens.js` (`T`). Import `T` and reference `T.brand`, `T.border`, etc.

**State**: `useState` per calculator component. No global state manager. The only app-level state is `type` (active desk) in `App.jsx`.

**Pricing logic**: Lives inside `useMemo` inside each calculator component. Do **not** extract to a `pricing.js` — the logic captures closure variables from state, restructuring would require passing explicit state objects and retesting all scenarios.

**`LShapeCalculator` + `LShapeMaterialPanel`**: Two separate components. `LShapeCalculator` is a thin tab switcher. `LShapeMaterialPanel` holds all state. The `key={material}` prop on `LShapeMaterialPanel` **must be preserved** — it resets all state when the user switches material (MFC → MDF → Solid Wood).

**`useEffect` in `RectCalculator`**: Auto-selects the motor frame when length changes beyond a frame's supported range. `singleOk` and `dualOk` both derive from `length`, so the dep array `[length]` is intentionally minimal. eslint-disable comments suppress the `exhaustive-deps` and `set-state-in-effect` warnings on that block.

## Pricing Rules (Business Logic)

### Rectangular Desk

| Length    | Rule                                                     |
| --------- | -------------------------------------------------------- |
| < 80cm    | Invalid — `tooShort`, show `StopNotice`                  |
| 80–99cm   | Flat tier — $349 total, T-03 Mini frame                  |
| 100–150cm | T-03 Single ($279) or T-07 Dual ($379)                   |
| 151–180cm | T-07 Dual ($379) only                                    |
| > 180cm   | Invalid — `tooLong`, show `StopNotice` with contact link |

- Top cost: `(length/100) × (depth/100) × $220/m²`
- Assembly: $60 standard, $120 two-person (length ≥ 151cm)
- Grommet: $9.90 (20cm Black), $19.90 (any other size/colour)

### L-Shape Desk

- Frame: $609 (all materials)
- MFC/MDF/Solid Wood area: `a1 + a2 - (w2 × w1)` — deduct shared corner
- Assembly: $60 standard (MFC/MDF, L1 < 151cm), $120 always for Solid Wood
- MDF: L2 length fixed at 90cm, both widths fixed at 50cm

### Solid Wood Species Rates ($/m²)

Red Oak 310 · Smoked Red Oak 375 · Cherry 400 · Ash 430 · Hard Maple 450 · White Oak 470 · Black Walnut 650

## Changing Business Values

All in `src/constants/config.js`:

- `CONTACT_URL` — contact page link
- `UNIDESK_PRICE` — set to `null` to show "Contact us" button instead of price
- `SLANTED_DESK_NAME` / `GAMING_DESK_NAME` — coming-soon desk names

Colour lists: marked with `🔴 CHANGE BELOW` in `rectDesk.js` and `lshapeDesk.js`.

## Adding a New Desk Type

1. Add entry to `TYPES` in `src/constants/deskTypes.js`
2. Create `src/components/calculators/MyNewDesk.jsx`
3. Add `{type === "newid" && <MyNewDesk />}` in `App.jsx`

## Test Coverage

Tests live in `src/test/`. Run with `npm run test:run`. All 77 tests must pass before merging.

Test files:

- `helpers.test.js` — `fmt` and `clamp` unit tests
- `pricing.test.js` — constants integrity + pricing formula tests (no component rendering)
- `components/Card.test.jsx` — render + style prop tests
- `components/CheckOption.test.jsx` — toggle behaviour + price formatting
- `components/PillSelect.test.jsx` — option rendering + selection callback
- `components/RectCalculator.test.jsx` — full pricing scenarios via rendered component

## Do Not

- Add PropTypes — project deliberately uses no type system
- Add CSS classes or a CSS framework — inline styles only
- Extract pricing logic to `pricing.js` — leave it in `useMemo` inside components
- Remove `key={material}` from `LShapeMaterialPanel` — breaks material-switch state reset
- Change the `useEffect` dep array in `RectCalculator` from `[length]` — intentional
- Commit with lint errors (`npm run lint` must exit 0)
