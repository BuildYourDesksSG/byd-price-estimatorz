import { T } from '../../constants/tokens'

export default function PillSelect({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((opt) => {
        const active = value === opt
        return (
          <div
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              cursor: 'pointer',
              padding: '7px 16px',
              borderRadius: 20,
              border: `1.5px solid ${active ? T.brand : T.border}`,
              background: active ? T.brand : T.bg,
              color: active ? '#fff' : T.text,
              fontSize: 12.5,
              fontWeight: active ? 600 : 400,
              transition: 'all 0.15s',
              fontFamily: T.font,
            }}
          >
            {opt}
          </div>
        )
      })}
    </div>
  )
}
