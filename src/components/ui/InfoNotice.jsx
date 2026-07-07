import { T } from '../../constants/tokens'

export default function InfoNotice({ children }) {
  return (
    <div
      style={{
        background: T.brandTint,
        border: `1px solid ${T.brand}30`,
        borderRadius: 10,
        padding: '12px 16px',
        fontSize: 13,
        color: T.brandSoft,
        lineHeight: 1.6,
        fontFamily: T.font,
      }}
    >
      {children}
    </div>
  )
}
