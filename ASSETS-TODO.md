# Assets & Decisions still needed from BuildYourDesks

The code wiring is in place for everything below; these are the inputs only BYD can provide.

## 1. New Add-On product images (#14, #23, #24)
DONE — all eight supplied by client and processed into uniform white-background PNGs
(240×160) in `public/images/accessories/`: `monitor-arm-single.png`, `monitor-arm-dual.png`,
`cpu-mount.png`, `cable-organiser.png`, `ergo-chair.png`, `warranty.png`,
`frame-stabilizer.png`, `anti-wobble.png`.

## 2. Beech wood (#7)
In `src/constants/lshapeDesk.js`, the `beech` species has a **placeholder rate of 330**.
Replace it with the confirmed $/m², and add a swatch at `public/images/swatches/wood-beech.jpg`.

## 3. MDF swatch grain orientation (#21)
The MDF colour swatches in `public/images/swatches/mdf-*.jpg` should be re-exported/rotated so
the grain runs **horizontal**. This is image-file work, not code — replace the files in place
(keep the same filenames) once the corrected images are ready.

## 4. Cable routing offset (#9)
Client to confirm the actual measured Left/Right offset (currently the note says 25cm). If it
changes, update `GROMMET_POSITION_NOTE` in `src/constants/rectDesk.js`.

## 5. Assembly / cable tray bundling (#12)
Confirm intended behaviour: the Assembly option is now labeled "…(Free Cable Tray Worth $49)",
but the separate **Cable Tray** add-on still charges $49. If the tray should be auto-included
free when Assembly is chosen, that's a small follow-up logic change — say the word.
