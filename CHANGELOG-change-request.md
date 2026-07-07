# Change Request — Implementation Log

All edits below were made to the `byd-price-estimator-refactor` source (the build that
matches the live site). Each edited file was syntax-checked. The app was **not** built or
run in this environment (no network for `npm install`), so please run locally to verify:

```
npm install
npm test       # vitest — suite updated to match the changes below
npm run dev    # visual check, especially the items marked [visual]
npm run build
```

## Implemented

| # | Change | Where |
|---|--------|-------|
| 1 | Removed UniDesk, Slanted, Gaming desk types | `constants/deskTypes.js`, `App.jsx` |
| 2 | "Custom Desk" → "Build Your Desks™" | `constants/deskTypes.js` |
| 3 | "Custom L-Shape" → "Build Your Desks™ (L-Shape)" | `constants/deskTypes.js` |
| 4 | Dropped "MDF" from L-Shape subtitle → "MFC or Solid Wood" | `constants/deskTypes.js` |
| 5 | L2 now an adjustable **90–120cm** range (was fixed at 120) | `constants/lshapeDesk.js`, `LShapeMaterialPanel.jsx` |
| 6 | Edge-style cards now show an SVG preview of each profile [visual] | `RectCalculator.jsx` (`EdgeThumb`) |
| 7 | Added **European Beech** to wood species — **rate is a placeholder ($330)** | `constants/lshapeDesk.js` |
| 8 | Circle grommet: diameter 5cm → **6cm**, fee $4.90 → **$9.90** | `constants/rectDesk.js`, `GrommetOptions.jsx`, `SpecSheet.jsx` |
| 10 | Rectangular grommet: flat **$19.90**, **30cm $29.90** (old 20cm/Black $9.90 tier removed) | `constants/rectDesk.js` |
| 11 | Removed **Square** grommet (hole types + L-shape cable routing) | `constants/rectDesk.js`, `constants/lshapeDesk.js` |
| 12 | Assembly relabeled "Assembly Service (Free Cable Tray Worth $49)" | `RectCalculator.jsx`, `LShapeMaterialPanel.jsx`, `SpecSheet.jsx` |
| 13 | Caster wheels confirmed at $39.90 (already correct) | `constants/accessories.js` |
| 14 | "Accessories" → **"Add-Ons"**; added Single/Dual Monitor Arm, CPU Mount, Cable Organiser, Extended Warranty, Ergo Chair | `constants/accessories.js`, both calculators, `SpecSheet.jsx` |
| 15 | Edges renamed "Waterfall™ Edge" / "Waterfall™ Curve" | `constants/rectDesk.js` |
| 16 | Waterfall curve lengthened (15cm straight each side) + full-width dotted line [visual] | `RectDiagram.jsx` |
| 18 | Free cup + headphone holder note (worth $39.90) on Lite/Pro | `RectCalculator.jsx` |
| 19 | Frames renamed: T-03 → "Build Your Desks™ Lite", T-07 → "Build Your Desks™ Pro" | `constants/rectDesk.js` |
| 20 | Frame Colour (Black / White) selector added | `constants/rectDesk.js`, `RectCalculator.jsx`, `SpecSheet.jsx` |
| 22 | Desk diagram now horizontally centered [visual] | `RectDiagram.jsx` |
| 23 | Frame Stabilizer ($69.90) add-on | `constants/accessories.js` |
| 24 | Anti-Wobble Stabilizer 3D-printed ($14.90) add-on | `constants/accessories.js` |

Tests in `src/test/` were updated to match the new labels, the new grommet pricing
rule, the circle fee, the L2 range, and the added Beech species.

## Needs input / assets before going live (see ASSETS-TODO.md)

- **#7** Beech: confirmed $/m² rate + a swatch image
- **#14 / #23 / #24** New add-on product photos (uniform white-bg PNGs)
- **#9** The 25cm Left/Right offset: client to confirm the measured value
- **#21** MDF swatch images re-shot/rotated so grain runs horizontal (image-asset work)
- **#12** Confirm whether the cable tray should become *free/bundled* when Assembly is
  selected, or whether the new label text is sufficient (currently label-only; the
  separate Cable Tray add-on still charges $49)

---

## Round 2 — corrections (from "Mistakes" list)

1. **Edge style: text only** — removed the SVG preview thumbnails from the Waterfall Edge/Curve cards; they now show text only, as requested. (`RectCalculator.jsx`)
2. **Depth label was clipped** — the "Depth: NNcm" label was being cut off at longer lengths. Widened the diagram's right gutter (symmetric, so the desk stays centered) and nudged the label font so it always renders in full. (`RectDiagram.jsx`)
3–5. **"Where are the images?"** — root cause: swatch/add-on/accessory images used **absolute** paths (`/images/...`) while the (working) logo used a **relative** path (`images/...`). Absolute paths don't resolve unless the app is served from the domain root, so they showed blank. Converted all 61 image paths to relative, matching the logo. MDF colours, Add-Ons, and Wood Species images now load. (constants + both calculators)

Note: `wood-beech.jpg` and the 8 new add-on PNGs still need to be supplied (see ASSETS-TODO.md); those correctly fall back to a plain swatch / hide until the files are added.
