import { useState, useRef, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'
import { T } from '../../constants/tokens'
import { UNIDESK_SIZES, UNIDESK_LEG_COLOURS } from '../../constants/config'
import { fmt } from '../../utils/helpers'
import Card from '../ui/Card'
import SectionLabel from '../ui/SectionLabel'
import SpecSheet, { PAGE_STYLE } from '../SpecSheet'

export default function UniDeskCard() {
  const [sizeIdx, setSizeIdx] = useState(0)
  const [leg, setLeg] = useState(UNIDESK_LEG_COLOURS[0])
  const [isPrinting, setIsPrinting] = useState(false)

  const printRef = useRef(null)
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: PAGE_STYLE,
    onAfterPrint: () => setIsPrinting(false),
  })

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isPrinting && printRef.current) {
      handlePrint()
    }
  }, [isPrinting])
  /* eslint-enable react-hooks/exhaustive-deps */

  const selected = UNIDESK_SIZES[sizeIdx]
  const uniSpec = { type: 'uni', size: selected.label, legColour: leg, price: selected.price }

  return (
    <>
      {isPrinting && (
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            <SpecSheet spec={uniSpec} />
          </div>
        </div>
      )}
      <Card>
        <SectionLabel>UniDesk — Fixed Sizes</SectionLabel>
        <div style={{ fontSize: 14, color: T.text, marginBottom: 16, lineHeight: 1.7 }}>
          A ready-to-go height-adjustable desk in fixed sizes. Black &amp; Grey frame included. 4–6
          weeks lead time.
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 13, color: T.textMute, marginBottom: 8, fontWeight: 500 }}>
            Size
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {UNIDESK_SIZES.map((s, i) => (
              <div
                key={s.label}
                onClick={() => setSizeIdx(i)}
                style={{
                  cursor: 'pointer',
                  padding: '9px 18px',
                  borderRadius: 10,
                  border: `1.5px solid ${sizeIdx === i ? T.brand : T.border}`,
                  background: sizeIdx === i ? T.brandTint : T.bg,
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: sizeIdx === i ? T.brand : T.text,
                  transition: 'all 0.15s',
                  boxShadow: sizeIdx === i ? `0 0 0 1px ${T.brand}25` : 'none',
                }}
              >
                {s.label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 13, color: T.textMute, marginBottom: 8, fontWeight: 500 }}>
            Frame Colour
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {UNIDESK_LEG_COLOURS.map((c) => (
              <div
                key={c}
                onClick={() => setLeg(c)}
                style={{
                  cursor: 'pointer',
                  padding: '9px 18px',
                  borderRadius: 10,
                  border: `1.5px solid ${leg === c ? T.brand : T.border}`,
                  background: leg === c ? T.brandTint : T.bg,
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: leg === c ? T.brand : T.text,
                  transition: 'all 0.15s',
                  boxShadow: leg === c ? `0 0 0 1px ${T.brand}25` : 'none',
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: T.brandSoft,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Price
            </span>
            <span
              style={{ fontSize: 30, fontWeight: 700, color: T.brand, letterSpacing: '-0.02em' }}
            >
              {fmt(selected.price)}
            </span>
          </div>
        </div>
      </Card>
      <div
        style={{
          background: T.brandTint,
          border: `1px solid ${T.brand}30`,
          borderRadius: 12,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginTop: 8,
        }}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 3 }}>
            Save or print your estimate
          </div>
          <div style={{ fontSize: 12, color: T.textMute, lineHeight: 1.5 }}>
            Click the button, then choose &ldquo;Save as PDF&rdquo; or select a printer. Send the
            PDF or a printed copy to the BuildYourDesks team.
          </div>
        </div>
        <button
          onClick={() => setIsPrinting(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 22px',
            background: T.brand,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            flexShrink: 0,
          }}
        >
          Print / Save as PDF
        </button>
      </div>
    </>
  )
}
