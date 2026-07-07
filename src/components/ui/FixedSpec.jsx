import { T } from '../../constants/tokens'

export default function FixedSpec({ label, value, suffix = 'cm', note }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 12.5, color: T.textMute, fontWeight: 500, fontFamily: T.font }}>
          {label}
        </span>
        <span style={{ fontSize: 16, color: T.text, fontWeight: 700, fontFamily: T.font }}>
          {value}
          {suffix}
        </span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: T.border }} />
      <div style={{ fontSize: 11, color: T.textMute, marginTop: 5, fontFamily: T.font }}>
        {note || 'Fixed size for this material'}
      </div>
    </div>
  )
}
