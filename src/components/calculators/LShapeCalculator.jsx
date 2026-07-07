import { useState } from 'react'
import { T } from '../../constants/tokens'
import { LSHAPE_MATERIALS } from '../../constants/lshapeDesk'
import LShapeMaterialPanel from './LShapeMaterialPanel'

export default function LShapeCalculator() {
  const [material, setMaterial] = useState('mfc')
  const keys = Object.keys(LSHAPE_MATERIALS)

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${keys.length},1fr)`, gap: 10 }}>
        {keys.map((k) => {
          const m = LSHAPE_MATERIALS[k]
          const active = material === k
          return (
            <div
              key={k}
              onClick={() => setMaterial(k)}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: '14px 10px',
                borderRadius: 12,
                border: `1.5px solid ${active ? T.brand : T.border}`,
                background: active ? T.brandTint : T.bg,
                transition: 'all 0.15s',
                boxShadow: active ? `0 0 0 1px ${T.brand}25` : 'none',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 14, color: active ? T.brand : T.text }}>
                {m.label}
              </div>
              <div style={{ fontSize: 11, color: T.textMute, marginTop: 2 }}>{m.tag}</div>
            </div>
          )
        })}
      </div>
      {/* key={material} resets all LShapeMaterialPanel state when material switches */}
      <LShapeMaterialPanel key={material} materialKey={material} />
    </div>
  )
}
