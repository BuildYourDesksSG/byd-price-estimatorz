import { T } from '../../constants/tokens'
import { CONTACT_URL } from '../../constants/config'
import Card from '../ui/Card'

export default function ComingSoonCard({ name }) {
  return (
    <Card style={{ textAlign: 'center', padding: 48 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: T.text, marginBottom: 8 }}>{name}</div>
      <div style={{ fontSize: 14, color: T.textMute, marginBottom: 20 }}>
        This desk is on its way. Check back soon, or get in touch to be notified when it launches.
      </div>
      <a
        href={CONTACT_URL}
        style={{
          display: 'inline-block',
          background: T.brand,
          color: '#fff',
          padding: '11px 26px',
          borderRadius: 9,
          fontSize: 14,
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: '0.01em',
        }}
      >
        Notify Me
      </a>
    </Card>
  )
}
