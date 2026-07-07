import { T } from '../../constants/tokens'

function roundedPolygonPath(points, r) {
  const n = points.length
  const entries = []

  for (let i = 0; i < n; i++) {
    const curr = points[i]
    const prev = points[(i - 1 + n) % n]
    const next = points[(i + 1) % n]

    const dx1 = curr[0] - prev[0]
    const dy1 = curr[1] - prev[1]
    const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)

    const dx2 = next[0] - curr[0]
    const dy2 = next[1] - curr[1]
    const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

    const rr = Math.min(r, len1 / 2, len2 / 2)

    const ex = curr[0] - rr * (dx1 / len1)
    const ey = curr[1] - rr * (dy1 / len1)
    const fx = curr[0] + rr * (dx2 / len2)
    const fy = curr[1] + rr * (dy2 / len2)

    entries.push({ ex, ey, ctrl: curr, fx, fy })
  }

  let d = `M ${entries[0].ex} ${entries[0].ey}`
  for (let i = 0; i < n; i++) {
    const e = entries[i]
    d += ` Q ${e.ctrl[0]} ${e.ctrl[1]} ${e.fx} ${e.fy}`
    const nxt = entries[(i + 1) % n]
    d += ` L ${nxt.ex} ${nxt.ey}`
  }
  return d + ' Z'
}

export default function LShapeDiagram({ l1, w1, l2, w2, orientation = 'Left', l1max = 180 }) {
  const DRAW = 190
  const PAD_L = 78,
    PAD_R = 80,
    PAD_T = 30,
    PAD_B = 46
  const W = PAD_L + DRAW + PAD_R
  const H = PAD_T + DRAW + PAD_B
  const scale = DRAW / Math.max(l1max, l2)
  const isRight = orientation === 'Right'

  const mirrorX = (x) => (isRight ? l1 - x : x)
  const cmPts = [
    [mirrorX(0), 0],
    [mirrorX(l1), 0],
    [mirrorX(l1), w1],
    [mirrorX(w2), w1],
    [mirrorX(w2), l2],
    [mirrorX(0), l2],
  ]
  const svgX = (cm) => PAD_L + cm * scale
  const svgY = (cm) => PAD_T + cm * scale
  const pxPts = cmPts.map(([x, y]) => [svgX(x), svgY(y)])

  // R30 = 3cm radius; minimum 4px so corners are always visible
  const cornerR = Math.max(4, 3 * scale)
  const pathD = roundedPolygonPath(pxPts, cornerR)

  const l1LabelX = (svgX(mirrorX(0)) + svgX(mirrorX(l1))) / 2
  const w1Side = isRight ? 'end' : 'start'
  const w1LabelX = isRight ? svgX(mirrorX(l1)) - 8 : svgX(mirrorX(l1)) + 8
  const l2Side = isRight ? 'start' : 'end'
  const l2LabelX = isRight ? svgX(mirrorX(0)) + 10 : svgX(mirrorX(0)) - 10
  const w2LabelX = (svgX(mirrorX(0)) + svgX(mirrorX(w2))) / 2

  return (
    <svg
      width='100%'
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', margin: '0 auto', maxWidth: 340 }}
    >
      <path d={pathD} fill={T.brandTint} stroke={T.brand} strokeWidth='2.5' />
      <text
        x={l1LabelX}
        y={svgY(0) - 12}
        textAnchor='middle'
        fontSize='12'
        fontWeight='700'
        fill={T.brand}
        fontFamily={T.font}
      >
        L1: {l1}cm
      </text>
      <text
        x={w1LabelX}
        y={(svgY(0) + svgY(w1)) / 2}
        textAnchor={w1Side}
        fontSize='10.5'
        fill={T.textMute}
        fontFamily={T.font}
      >
        W1: {w1}cm
      </text>
      <text
        x={l2LabelX}
        y={(svgY(0) + svgY(l2)) / 2}
        textAnchor={l2Side}
        fontSize='12'
        fontWeight='700'
        fill={T.brand}
        fontFamily={T.font}
      >
        L2: {l2}cm
      </text>
      <text
        x={w2LabelX}
        y={svgY(l2) + 22}
        textAnchor='middle'
        fontSize='10.5'
        fill={T.textMute}
        fontFamily={T.font}
      >
        W2: {w2}cm
      </text>
    </svg>
  )
}
