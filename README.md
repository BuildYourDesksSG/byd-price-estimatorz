# BYD Price Estimator

Instant price calculator for custom standing desks by [Build Your Desks](https://buildyourdesks.com). Customers configure size, material, finish, and accessories to get a live price estimate before ordering.

## Stack

- **React 18** + **Vite 5**
- Plain JavaScript (no TypeScript)
- Inline styles with design tokens (no CSS framework)
- **Vitest** + **Testing Library** for tests
- **ESLint 9** (flat config) + **Prettier** for code quality

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start dev server with HMR        |
| `npm run build`        | Production build → `dist/`       |
| `npm run preview`      | Preview production build locally |
| `npm run lint`         | ESLint — must exit clean         |
| `npm run lint:fix`     | Auto-fix lint issues             |
| `npm run format`       | Prettier write all files         |
| `npm run format:check` | Prettier check (CI)              |
| `npm run test`         | Vitest in watch mode             |
| `npm run test:run`     | Run all tests once (CI)          |

## Desk Types

| Type           | Material               | Status      |
| -------------- | ---------------------- | ----------- |
| Custom Desk    | MDF                    | Live        |
| Custom L-Shape | MFC / MDF / Solid Wood | Live        |
| UniDesk        | MDF fixed size         | Price TBD   |
| Slanted Desk   | TBD                    | Coming soon |
| Gaming Desk    | TBD                    | Coming soon |

## Project Structure

```
src/
  App.jsx                   Root component — desk type selection
  constants/
    config.js               🔴 Business config (contact URL, prices, names)
    tokens.js               Design tokens (colours, font)
    assembly.js             Shared pricing: TOP_RATE, assembly costs
    accessories.js          Accessory prices
    rectDesk.js             Rectangular desk data
    lshapeDesk.js           L-shape desk data
    deskTypes.js            Desk type selector entries
  utils/helpers.js          fmt(), clamp()
  components/
    ui/                     Stateless primitives
    calculators/            Feature calculators
  test/                     Vitest test files
```

## Updating Business Values

All configurable values are in `src/constants/config.js`:

```js
export const CONTACT_URL = 'https://buildyourdesks.com/contact-us/'
export const UNIDESK_PRICE = null // null = show "Contact us" instead of price
export const SLANTED_DESK_NAME = 'Slanted Desk'
export const GAMING_DESK_NAME = 'Gaming Desk'
```

Colour lists are in `src/constants/rectDesk.js` (MFC/MDF) and `src/constants/lshapeDesk.js` (Solid Wood species), each marked with `🔴 CHANGE BELOW`.

## Pricing Summary

**Rectangular:** frame + `area × $220/m²` + assembly + accessories. 80–99cm uses a flat $349 tier.

**L-Shape:** $609 frame + `net area × rate/m²` + assembly + accessories. MFC/MDF deduct the shared corner from area; Solid Wood adds both board areas in full.

See `CLAUDE.md` for complete pricing rules.

## Tests

```bash
npm run test:run
# 77 tests across 6 suites — must all pass
```

Tests cover: `fmt`/`clamp` helpers, all pricing constants, grommet price logic, area calculations, and component rendering scenarios (flat tier, validation notices, accessory cost addition, frame selection).
