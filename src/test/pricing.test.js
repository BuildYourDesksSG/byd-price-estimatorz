import { describe, it, expect } from 'vitest'
import {
  RECT_FRAMES,
  RECT_MIN_LEN,
  GROMMET_RECT_BASE_PRICE,
  GROMMET_RECT_30CM_PRICE,
  GROMMET_RECT_SIZES,
  GROMMET_ROUND_BLACK_PRICE,
  GROMMET_ROUND_OTHER_PRICE,
  grommetRectPrice,
  grommetRoundPrice,
} from '../constants/rectDesk'
import {
  LSHAPE_FRAME_PRICE,
  LSHAPE_L1_MIN,
  LSHAPE_L2_MIN,
  LSHAPE_L2_MAX,
  LSHAPE_WIDTH_MIN,
  LSHAPE_WIDTH_MAX,
  LSHAPE_MATERIALS,
  SOLID_WOOD_SPECIES,
  SOLID_WOOD_EDGE_STYLES,
} from '../constants/lshapeDesk'
import { TOP_RATE, ASSEMBLY_STANDARD, ASSEMBLY_TWO_PERSON } from '../constants/assembly'
import {
  ACCESSORY_CABLE_TRAY,
  ACCESSORY_DRAWER,
  ACCESSORY_RETRACT_SOCKET,
  ACCESSORY_SLIDING_SOCKET,
  ACCESSORY_CASTOR_4PCS,
  ACCESSORY_CASTOR_6PCS,
  ACCESSORY_RISER_SMALL,
  ACCESSORY_RISER_LARGE,
} from '../constants/accessories'

describe('Rectangular desk pricing constants', () => {
  it('minimum length is 90cm (T-03 Single lower bound)', () => {
    expect(RECT_MIN_LEN).toBe(90)
  })

  it('T-03 Single frame within correct bounds', () => {
    expect(RECT_FRAMES.single.price).toBe(279)
    expect(RECT_FRAMES.single.maxLen).toBe(160)
  })

  it('T-07 Dual frame within correct bounds', () => {
    expect(RECT_FRAMES.dual.price).toBe(379)
    expect(RECT_FRAMES.dual.maxLen).toBe(180)
  })

  it('dual frame costs more than single', () => {
    expect(RECT_FRAMES.dual.price).toBeGreaterThan(RECT_FRAMES.single.price)
  })

  it('dual frame supports longer desks than single', () => {
    expect(RECT_FRAMES.dual.maxLen).toBeGreaterThan(RECT_FRAMES.single.maxLen)
  })
})

describe('grommetRectPrice', () => {
  it('returns base price ($19.90) for standard sizes', () => {
    expect(grommetRectPrice('9cm')).toBe(GROMMET_RECT_BASE_PRICE)
    expect(grommetRectPrice('13cm')).toBe(GROMMET_RECT_BASE_PRICE)
    expect(grommetRectPrice('20cm')).toBe(GROMMET_RECT_BASE_PRICE)
    expect(grommetRectPrice('20cm')).toBe(19.9)
  })

  it('returns $29.90 for the 30cm size', () => {
    expect(grommetRectPrice('30cm')).toBe(GROMMET_RECT_30CM_PRICE)
    expect(grommetRectPrice('30cm')).toBe(29.9)
  })

  it('30cm is more expensive than the base price', () => {
    expect(GROMMET_RECT_30CM_PRICE).toBeGreaterThan(GROMMET_RECT_BASE_PRICE)
  })

  it('includes 9cm as a valid size', () => {
    expect(GROMMET_RECT_SIZES).toContain('9cm')
    expect(GROMMET_RECT_SIZES).toHaveLength(4)
  })
})

describe('grommetRoundPrice (circle, 6cm)', () => {
  it('returns $9.90 for Black', () => {
    expect(grommetRoundPrice('Black')).toBe(GROMMET_ROUND_BLACK_PRICE)
    expect(grommetRoundPrice('Black')).toBe(9.9)
  })

  it('returns $9.90 for Other colours', () => {
    expect(grommetRoundPrice('Other')).toBe(GROMMET_ROUND_OTHER_PRICE)
    expect(grommetRoundPrice('Other')).toBe(9.9)
  })

  it('circle fee is a flat $9.90 regardless of colour', () => {
    expect(GROMMET_ROUND_OTHER_PRICE).toBe(GROMMET_ROUND_BLACK_PRICE)
  })
})

describe('Assembly pricing', () => {
  it('standard assembly is $60', () => {
    expect(ASSEMBLY_STANDARD).toBe(60)
  })

  it('two-person assembly is $120', () => {
    expect(ASSEMBLY_TWO_PERSON).toBe(120)
  })

  it('two-person assembly costs more than standard', () => {
    expect(ASSEMBLY_TWO_PERSON).toBeGreaterThan(ASSEMBLY_STANDARD)
  })
})

describe('Accessories pricing', () => {
  it('cable tray costs $49', () => {
    expect(ACCESSORY_CABLE_TRAY).toBe(49)
  })

  it('drawer costs $39', () => {
    expect(ACCESSORY_DRAWER).toBe(39)
  })

  it('retract socket costs $129', () => {
    expect(ACCESSORY_RETRACT_SOCKET).toBe(129)
  })

  it('sliding socket costs $149', () => {
    expect(ACCESSORY_SLIDING_SOCKET).toBe(149)
  })

  it('4-piece castors cost $39.90', () => {
    expect(ACCESSORY_CASTOR_4PCS).toBe(39.9)
  })

  it('6-piece castors cost more than 4-piece', () => {
    expect(ACCESSORY_CASTOR_6PCS).toBeGreaterThan(ACCESSORY_CASTOR_4PCS)
    expect(ACCESSORY_CASTOR_6PCS).toBe(59.9)
  })

  it('small riser costs $69', () => {
    expect(ACCESSORY_RISER_SMALL).toBe(69)
  })

  it('large riser costs $89', () => {
    expect(ACCESSORY_RISER_LARGE).toBe(89)
  })

  it('large riser costs more than small riser', () => {
    expect(ACCESSORY_RISER_LARGE).toBeGreaterThan(ACCESSORY_RISER_SMALL)
  })
})

describe('Rectangular desk pricing formula', () => {
  it('calculates top cost correctly for 140x70cm desk', () => {
    const length = 140
    const depth = 70
    const area = (length / 100) * (depth / 100) // 0.98 m²
    const topPrice = area * TOP_RATE
    expect(area).toBeCloseTo(0.98, 2)
    expect(topPrice).toBeCloseTo(215.6, 1)
  })

  it('calculates total for 140x70cm dual-motor desk with no accessories (assembly optional)', () => {
    const area = (140 / 100) * (70 / 100)
    const framePrice = RECT_FRAMES.dual.price // 379
    const topPrice = area * TOP_RATE // 215.60
    // Assembly is now optional — default off
    const total = framePrice + topPrice
    expect(total).toBeCloseTo(594.6, 1)
  })

  it('assembly adds $60 when selected', () => {
    const area = (140 / 100) * (70 / 100)
    const framePrice = RECT_FRAMES.dual.price
    const topPrice = area * TOP_RATE
    const total = framePrice + topPrice + ASSEMBLY_STANDARD
    expect(total).toBeCloseTo(654.6, 1)
  })
})

describe('L-shape pricing constants', () => {
  it('L-shape frame costs $609', () => {
    expect(LSHAPE_FRAME_PRICE).toBe(609)
  })

  it('L-shape L1 min is 120cm', () => {
    expect(LSHAPE_L1_MIN).toBe(120)
  })

  it('L-shape L2 ranges from 90cm to 120cm', () => {
    expect(LSHAPE_L2_MIN).toBe(90)
    expect(LSHAPE_L2_MAX).toBe(120)
    expect(LSHAPE_L2_MAX).toBeGreaterThan(LSHAPE_L2_MIN)
  })

  it('L-shape width range is 30–80cm', () => {
    expect(LSHAPE_WIDTH_MIN).toBe(30)
    expect(LSHAPE_WIDTH_MAX).toBe(80)
  })

  it('MFC uses TOP_RATE for pricing', () => {
    expect(LSHAPE_MATERIALS.mfc.rate).toBe(TOP_RATE)
  })

  it('Solid Wood uses species-based pricing', () => {
    expect(LSHAPE_MATERIALS.solid.rateType).toBe('species')
  })

  it('MFC L1 max is 180cm', () => {
    expect(LSHAPE_MATERIALS.mfc.l1max).toBe(180)
  })

  it('Solid Wood L1 max is 180cm', () => {
    expect(LSHAPE_MATERIALS.solid.l1max).toBe(180)
  })

  it('MDF is not a valid L-shape material', () => {
    expect(LSHAPE_MATERIALS).not.toHaveProperty('mdf')
  })

  it('only MFC and Solid Wood are available for L-shape', () => {
    expect(Object.keys(LSHAPE_MATERIALS)).toEqual(['mfc', 'solid'])
  })
})

describe('Solid Wood edge styles', () => {
  it('has 5 edge styles (01, 03, 04, 05, 06)', () => {
    expect(SOLID_WOOD_EDGE_STYLES).toHaveLength(5)
    expect(SOLID_WOOD_EDGE_STYLES).toContain('01')
    expect(SOLID_WOOD_EDGE_STYLES).toContain('03')
    expect(SOLID_WOOD_EDGE_STYLES).not.toContain('02')
  })
})

describe('Solid wood species rates', () => {
  it('has 8 species defined (incl. Beech)', () => {
    expect(SOLID_WOOD_SPECIES).toHaveLength(8)
  })

  it('includes European Beech', () => {
    expect(SOLID_WOOD_SPECIES.some((s) => s.id === 'beech')).toBe(true)
  })

  it('American Red Oak is the cheapest species', () => {
    const cheapest = SOLID_WOOD_SPECIES.reduce((a, b) => (a.rate < b.rate ? a : b))
    expect(cheapest.id).toBe('redoak')
    expect(cheapest.rate).toBe(310)
  })

  it('American Black Walnut is the most expensive species', () => {
    const priciest = SOLID_WOOD_SPECIES.reduce((a, b) => (a.rate > b.rate ? a : b))
    expect(priciest.id).toBe('walnut')
    expect(priciest.rate).toBe(650)
  })

  it('all species have required fields including image', () => {
    for (const species of SOLID_WOOD_SPECIES) {
      expect(species).toHaveProperty('id')
      expect(species).toHaveProperty('name')
      expect(species).toHaveProperty('rate')
      expect(species).toHaveProperty('hex')
      expect(species).toHaveProperty('image')
      expect(species.rate).toBeGreaterThan(0)
    }
  })
})

describe('L-shape area calculation', () => {
  it('MFC deducts shared corner overlap', () => {
    const l1 = 140,
      w1 = 60,
      l2 = 120,
      w2 = 55
    const a1 = (l1 / 100) * (w1 / 100)
    const a2 = (l2 / 100) * (w2 / 100)
    const overlap = (w2 / 100) * (w1 / 100)
    const area = a1 + a2 - overlap
    expect(area).toBeCloseTo(1.17, 2)
  })

  it('Solid wood deducts shared corner overlap (same as MFC)', () => {
    const l1 = 160,
      w1 = 70,
      l2 = 120,
      w2 = 70
    const a1 = (l1 / 100) * (w1 / 100)
    const a2 = (l2 / 100) * (w2 / 100)
    const overlap = (w2 / 100) * (w1 / 100)
    const area = a1 + a2 - overlap
    expect(area).toBeCloseTo(1.47, 2)
  })
})
