import { T } from '../../constants/tokens'

export default function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 10.5,
        fontWeight: 600,
        color: T.brand,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        marginBottom: 14,
        fontFamily: T.font,
      }}
    >
      {children}
    </div>
  )
}
