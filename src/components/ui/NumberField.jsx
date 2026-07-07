import { useState } from 'react'
import { T } from '../../constants/tokens'

export default function NumberField({ label, value, set, min, max, suffix = 'cm' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          color: T.textMute,
          marginBottom: 7,
          fontWeight: 500,
          letterSpacing: '0.02em',
          fontFamily: T.font,
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type='number'
          value={value}
          min={min}
          max={max}
          onChange={(e) => set(Math.max(0, +e.target.value))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: `1.5px solid ${focused ? T.brand : T.border}`,
            borderRadius: 10,
            padding: '10px 12px',
            fontSize: 15,
            color: T.text,
            fontWeight: 600,
            background: T.bgCard,
            transition: 'border-color 0.15s',
            fontFamily: T.font,
          }}
        />
        <span style={{ fontSize: 13, color: T.textMute, fontFamily: T.font }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 11, color: T.textMute, marginTop: 4, fontFamily: T.font }}>
        {min}–{max}
        {suffix}
      </div>
    </div>
  )
}
