import { T } from '../../constants/tokens'
import { clamp } from '../../utils/helpers'
import { RECT_FRAMES, RECT_DEPTH_MAX } from '../../constants/rectDesk'

export default function RectDiagram({ length, depth, edge }) {
  const DRAW_W = 190,
    DRAW_H = 120
  // Symmetric horizontal padding — keeps the desk centred (#22) while leaving
  // enough right-hand gutter for the "Depth: NNcm" label to render fully (fix:
  // depth label was being clipped at long lengths).
  const PAD_X = 72
  const PAD_T = 28,
    PAD_B = 12
  const W = PAD_X + DRAW_W + PAD_X
  const H = PAD_T + DRAW_H + PAD_B

  // Fixed equal scale from max bounds — correct aspect ratio, stable when sliders move
  const scale = Math.min(DRAW_W / RECT_FRAMES.dual.maxLen, DRAW_H / RECT_DEPTH_MAX)
  const shapeW = length * scale
  const shapeH = depth * scale
  // Centre the shape across the full width (#22)
  const x = (W - shapeW) / 2
  const y = PAD_T + (DRAW_H - shapeH) / 2
  // Corner radius: spec R = 30mm = 3cm
  const r = Math.max(4, 3 * scale)

  const isErgoCurve = edge === 'ergo-curve'
  const isErgoSlope = edge === 'ergo-slope'

  // Spec: curveDepth = depth × 6%, clamped 35–50mm (3.5–5cm)
  const cdPx = clamp(depth * 0.06, 3.5, 5.0) * scale

  // #16: leave a fixed 15cm straight on each side; the Waterfall curve fills
  // the middle (much longer than the old 30%/70% split). Clamp so the two
  // straight segments never exceed the available width.
  const straight = clamp(15 * scale, r, shapeW * 0.5 - 6)
  const curveStartX = x + straight
  const curveEndX = x + shapeW - straight
  const curveMidX = x + shapeW / 2
  // Control-point inset for a smooth symmetric arch across the middle span.
  const half = (curveEndX - curveStartX) / 2
  const ctrl = half / 3

  const ergoCurvePath = [
    `M ${x + r} ${y}`,
    `L ${x + shapeW - r} ${y}`,
    `Q ${x + shapeW} ${y} ${x + shapeW} ${y + r}`,
    `L ${x + shapeW} ${y + shapeH - r}`,
    `Q ${x + shapeW} ${y + shapeH} ${x + shapeW - r} ${y + shapeH}`,
    `L ${curveEndX} ${y + shapeH}`,
    `C ${curveEndX - ctrl} ${y + shapeH} ${curveMidX + ctrl} ${y + shapeH - cdPx} ${curveMidX} ${y + shapeH - cdPx}`,
    `C ${curveMidX - ctrl} ${y + shapeH - cdPx} ${curveStartX + ctrl} ${y + shapeH} ${curveStartX} ${y + shapeH}`,
    `L ${x + r} ${y + shapeH}`,
    `Q ${x} ${y + shapeH} ${x} ${y + shapeH - r}`,
    `L ${x} ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    'Z',
  ].join(' ')

  return (
    <svg
      width='100%'
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', margin: '0 auto', maxWidth: 360 }}
    >
      {isErgoCurve ? (
        <path d={ergoCurvePath} fill={T.brandTint} stroke={T.brand} strokeWidth='2.5' />
      ) : (
        <rect
          x={x}
          y={y}
          width={shapeW}
          height={shapeH}
          rx={r}
          fill={T.brandTint}
          stroke={T.brand}
          strokeWidth='2.5'
        />
      )}
      {/* #16: full-width dotted guide line, left edge all the way to the right,
          shown for both the Slope and the Curve. */}
      {(isErgoSlope || isErgoCurve) && (
        <line
          x1={x + r}
          y1={y + shapeH - 8}
          x2={x + shapeW - r}
          y2={y + shapeH - 8}
          stroke={T.brand}
          strokeWidth='1'
          strokeOpacity='0.4'
          strokeDasharray='4 3'
        />
      )}
      <text
        x={x + shapeW / 2}
        y={y - 12}
        textAnchor='middle'
        fontSize='12'
        fontWeight='700'
        fill={T.brand}
        fontFamily={T.font}
      >
        Length: {length}cm
      </text>
      <text
        x={x + shapeW + 8}
        y={y + shapeH / 2}
        textAnchor='start'
        fontSize='9.5'
        fill={T.textMute}
        fontFamily={T.font}
        dominantBaseline='middle'
      >
        Depth: {depth}cm
      </text>
    </svg>
  )
}
