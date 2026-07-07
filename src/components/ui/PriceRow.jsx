import { T } from '../../constants/tokens'

export default function PriceRow({ label, value, bold, accent, muted }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '8px 0',
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <span
        style={{
          fontSize: 13.5,
          color: muted ? T.textMute : T.text,
          fontWeight: bold ? 600 : 400,
          fontFamily: T.font,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: bold ? 16 : 13.5,
          color: accent ? T.good : T.text,
          fontWeight: bold ? 700 : 500,
          fontFamily: T.font,
        }}
      >
        {value}
      </span>
    </div>
  )
}
