import { T } from '../../constants/tokens'

export default function StopNotice({ children }) {
  return (
    <div
      style={{
        background: '#FBEEEC',
        border: `1px solid ${T.warn}`,
        borderRadius: 10,
        padding: '14px 16px',
        fontSize: 13.5,
        color: T.warn,
        lineHeight: 1.6,
        fontFamily: T.font,
      }}
    >
      {children}
    </div>
  )
}
