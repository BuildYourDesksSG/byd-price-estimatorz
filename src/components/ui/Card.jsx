import { T } from '../../constants/tokens'

export default function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: T.bgCard,
        border: `1px solid ${T.border}`,
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.25)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
