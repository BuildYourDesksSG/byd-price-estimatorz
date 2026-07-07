import { T } from '../../constants/tokens'

export default function TypeCard({ active, onClick, title, subtitle }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        border: `1.5px solid ${active ? T.brand : T.border}`,
        background: active ? T.brandTint : T.bgCard,
        borderRadius: 14,
        padding: '16px 14px',
        transition: 'all 0.18s',
        textAlign: 'center',
        boxShadow: active
          ? `0 0 0 1px ${T.brand}30, 0 4px 16px rgba(0,0,0,0.3)`
          : '0 1px 4px rgba(0,0,0,0.25)',
      }}
    >
      <div
        style={{
          fontSize: 13.5,
          fontWeight: 600,
          color: active ? T.brand : T.text,
          fontFamily: T.font,
          lineHeight: 1.3,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 11,
          color: T.textMute,
          marginTop: 4,
          fontFamily: T.font,
        }}
      >
        {subtitle}
      </div>
    </div>
  )
}
