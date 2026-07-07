import { T } from '../../constants/tokens'
import { fmt } from '../../utils/helpers'

export default function CheckOption({ label, price, checked, onChange, image }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: image ? '6px 12px 6px 6px' : '13px 16px',
        borderRadius: 12,
        border: `1.5px solid ${checked ? T.brand : T.border}`,
        background: checked ? T.brandTint : T.bg,
        transition: 'all 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {image && (
          <img
            src={image}
            alt=''
            width={72}
            height={48}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
            style={{
              width: 72,
              height: 48,
              borderRadius: 8,
              objectFit: 'cover',
              flexShrink: 0,
              border: `1px solid ${T.border}`,
            }}
          />
        )}
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 5,
            flexShrink: 0,
            border: `2px solid ${checked ? T.brand : T.border}`,
            background: checked ? T.brand : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
          }}
        >
          {checked && (
            <svg width='10' height='8' viewBox='0 0 10 8' fill='none'>
              <path
                d='M1 4L3.5 6.5L9 1'
                stroke='#0C0C0E'
                strokeWidth='1.8'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          )}
        </div>
        <span style={{ fontSize: 13.5, color: T.text, fontWeight: 500, fontFamily: T.font }}>
          {label}
        </span>
      </div>
      <span style={{ fontSize: 13, color: T.brand, fontWeight: 600, fontFamily: T.font }}>
        +{fmt(price)}
      </span>
    </div>
  )
}
