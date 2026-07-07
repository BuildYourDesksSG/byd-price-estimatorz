import { useState } from 'react'
import { T } from './constants/tokens'
import { CONTACT_URL } from './constants/config'
import { TYPES } from './constants/deskTypes'
import TypeSelector from './components/TypeSelector'
import RectCalculator from './components/calculators/RectCalculator'
import LShapeCalculator from './components/calculators/LShapeCalculator'

export default function App() {
  const [type, setType] = useState('rect')

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 20px 40px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        {/* Logo mark */}
        <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
          <img
            src='images/Design-Your-Desk3-1-300x300.png'
            alt='Build Your Desks'
            width={72}
            height={72}
            style={{ display: 'block' }}
          />
        </div>

        {/* Brand label */}
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            color: T.brand,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: 16,
            fontFamily: T.font,
          }}
        >
          Build Your Desks
        </div>

        {/* Heading */}
        <div
          style={{
            fontFamily: T.fontSerif,
            fontSize: 42,
            fontWeight: 700,
            fontStyle: 'italic',
            color: T.text,
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Price Estimator
        </div>

        <div
          style={{
            fontSize: 14.5,
            color: T.textMute,
            maxWidth: 440,
            margin: '0 auto',
            lineHeight: 1.75,
            fontFamily: T.font,
          }}
        >
          Pick a desk, dial in your size and finish, and see an instant estimate.
        </div>
      </div>

      {/* Type selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))',
          gap: 10,
          marginBottom: 28,
        }}
      >
        <TypeSelector types={TYPES} activeId={type} onSelect={setType} />
      </div>

      {/* Active calculator */}
      {type === 'rect' && <RectCalculator />}
      {type === 'lshape' && <LShapeCalculator />}

      {/* Footer */}
      <div
        style={{
          marginTop: 32,
          paddingTop: 16,
          borderTop: `1px solid ${T.border}`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 12.5,
            color: T.textMute,
            lineHeight: 1.8,
            maxWidth: 420,
            margin: '0 auto 14px',
          }}
        >
          Prices shown are estimates and may be subject to final confirmation by our team.
        </div>
        <a
          href={CONTACT_URL}
          style={{
            display: 'inline-block',
            fontSize: 13.5,
            fontWeight: 600,
            color: T.brand,
            textDecoration: 'none',
            border: `1.5px solid ${T.brand}`,
            borderRadius: 8,
            padding: '10px 24px',
            background: 'transparent',
            transition: 'all 0.18s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = T.brand
            e.currentTarget.style.color = T.textOnDark
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = T.brand
          }}
        >
          Have a question? Get in touch →
        </a>
        <div style={{ marginTop: 12 }}>
          <a
            href='https://buildyourdesks.com'
            style={{
              fontSize: 12.5,
              color: T.textMute,
              textDecoration: 'none',
              fontFamily: T.font,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = T.brand
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = T.textMute
            }}
          >
            buildyourdesks.com
          </a>
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 11.5,
            color: T.textMute,
            fontFamily: T.font,
            opacity: 0.7,
          }}
        >
          &copy; 2026 Build Your Desks. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}
