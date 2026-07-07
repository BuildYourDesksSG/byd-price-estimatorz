import { T } from '../../constants/tokens'

export default function ColourSwatchGrid({ colours, selected, onSelect, showRate }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(88px,1fr))',
        gap: 10,
      }}
    >
      {colours.map((c) => {
        const isSel = selected === c.id
        return (
          <div
            key={c.id}
            onClick={() => onSelect(c.id)}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: 12,
                background: c.hex,
                border: isSel ? `2.5px solid ${T.brand}` : `1.5px solid ${T.border}`,
                boxShadow: isSel
                  ? `0 0 0 3px ${T.brand}25, 0 4px 12px rgba(0,0,0,0.3)`
                  : '0 2px 6px rgba(0,0,0,0.2)',
                transition: 'all 0.15s',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {c.image && (
                <img
                  src={c.image}
                  alt={c.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 10,
                  }}
                />
              )}
            </div>
            <div
              style={{
                fontSize: 11,
                color: isSel ? T.brand : T.textMute,
                marginTop: 6,
                fontWeight: isSel ? 600 : 400,
                lineHeight: 1.3,
                fontFamily: T.font,
              }}
            >
              {c.name}
            </div>
            {showRate && (
              <div
                style={{
                  fontSize: 10.5,
                  color: isSel ? T.brand : T.textMute,
                  fontWeight: isSel ? 600 : 400,
                  fontFamily: T.font,
                }}
              >
                ${c.rate}/m²
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
