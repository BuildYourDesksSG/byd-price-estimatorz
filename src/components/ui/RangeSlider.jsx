import { T } from '../../constants/tokens'

export default function RangeSlider({ label, value, set, min, max, suffix = 'cm' }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 12.5, color: T.textMute, fontWeight: 500, fontFamily: T.font }}>
          {label}
        </span>
        <span style={{ fontSize: 17, color: T.brand, fontWeight: 700, fontFamily: T.font }}>
          {value}
          {suffix}
        </span>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={(e) => set(+e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: T.textMute, fontFamily: T.font }}>
          {min}
          {suffix}
        </span>
        <span style={{ fontSize: 11, color: T.textMute, fontFamily: T.font }}>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  )
}
