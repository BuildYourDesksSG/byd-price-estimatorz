import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SpecSheet from '../../components/SpecSheet'
import RectCalculator from '../../components/calculators/RectCalculator'

vi.mock('react-to-print', () => ({
  useReactToPrint: () => vi.fn(),
}))

const RECT_SPEC_BASE = {
  type: 'rect',
  material: 'mdf',
  length: 140,
  depth: 70,
  motorLabel: 'T-07 Dual',
  colourName: 'Warm Oak',
  edgeName: 'Ergo Curve',
  drawer: false,
  retractSocket: false,
  castors: false,
  cableTray: false,
  slidingSocket: false,
  riserSmall: false,
  riserLarge: false,
  flat: false,
  frameName: 'T-07 Dual',
  framePrice: 379,
  area: 0.98,
  topPrice: 215.6,
  assembly: true,
  assemblyFee: 60,
  holeType: 'None',
  grommetAddon: false,
  accCost: 0,
  total: 654.6,
}

const RECT_FLAT_SPEC = {
  type: 'rect',
  material: 'mfc',
  length: 85,
  depth: 70,
  motorLabel: 'T-03 Mini',
  colourName: 'Warm Oak',
  edgeName: null,
  drawer: false,
  retractSocket: false,
  castors: false,
  cableTray: false,
  slidingSocket: false,
  riserSmall: false,
  riserLarge: false,
  flat: true,
  frameName: null,
  framePrice: null,
  area: null,
  topPrice: null,
  assembly: false,
  assemblyFee: 0,
  holeType: 'None',
  grommetAddon: false,
  accCost: 0,
  total: 349,
}

const LSHAPE_MFC_BASE = {
  type: 'lshape',
  materialLabel: 'MFC',
  materialKey: 'mfc',
  l1: 140,
  w1: 65,
  l2: 120,
  w2: 60,
  orientation: 'Left',
  speciesOrColourName: 'Natural Oak',
  rate: 220,
  holeType: 'None',
  position: 'Middle',
  grommet: null,
  drawer: false,
  retractSocket: false,
  castors: false,
  cableTray: false,
  slidingSocket: false,
  riserSmall: false,
  riserLarge: false,
  a1: 0.91,
  a2: 0.72,
  area: 1.24,
  topPrice: 272.8,
  assembly: true,
  assemblyFee: 60,
  grommetCost: 0,
  accCost: 0,
  total: 941.8,
}

const LSHAPE_MFC_GROMMET = {
  ...LSHAPE_MFC_BASE,
  holeType: 'Rectangular',
  position: 'Middle',
  grommet: { holeType: 'rectangular', size: '20cm', addon: true, colour: 'Black' },
  grommetCost: 9.9,
  total: 951.7,
}

const LSHAPE_SOLID_SPEC = {
  type: 'lshape',
  materialLabel: 'Solid Wood',
  materialKey: 'solid',
  l1: 150,
  w1: 65,
  l2: 120,
  w2: 60,
  orientation: 'Left',
  speciesOrColourName: 'American Red Oak',
  rate: 310,
  routing: 'Concave Slot',
  position: 'Middle',
  grommet: null,
  drawer: false,
  retractSocket: false,
  castors: false,
  cableTray: false,
  slidingSocket: false,
  riserSmall: false,
  riserLarge: false,
  a1: 0.975,
  a2: 0.72,
  area: 1.695,
  topPrice: 525.45,
  assembly: true,
  assemblyFee: 120,
  grommetCost: 0,
  accCost: 0,
  total: 1254.45,
}

const UNI_SPEC_PRICE = {
  type: 'uni',
  size: '140 × 80cm',
  legColour: 'Black',
  price: 799,
}

describe('SpecSheet — rect non-flat', () => {
  it('shows frame and table top rows', () => {
    render(<SpecSheet spec={RECT_SPEC_BASE} />)
    expect(screen.getByText(/Frame \(T-07 Dual\)/)).toBeInTheDocument()
    expect(screen.getByText(/Table top/)).toBeInTheDocument()
    expect(screen.getByText(/Assembly/)).toBeInTheDocument()
  })

  it('shows desk type badge', () => {
    render(<SpecSheet spec={RECT_SPEC_BASE} />)
    expect(screen.getByText('Rectangular Standing Desk')).toBeInTheDocument()
  })

  it('shows dimensions', () => {
    render(<SpecSheet spec={RECT_SPEC_BASE} />)
    expect(screen.getByText('140 cm')).toBeInTheDocument()
    expect(screen.getByText('70 cm')).toBeInTheDocument()
  })

  it('shows total', () => {
    render(<SpecSheet spec={RECT_SPEC_BASE} />)
    expect(screen.getByText('$654.60')).toBeInTheDocument()
  })
})

describe('SpecSheet — rect flat tier', () => {
  it('shows flat tier line', () => {
    render(<SpecSheet spec={RECT_FLAT_SPEC} />)
    expect(screen.getByText('T-03 Mini, complete')).toBeInTheDocument()
  })

  it('does not show frame/area/assembly rows', () => {
    render(<SpecSheet spec={RECT_FLAT_SPEC} />)
    expect(screen.queryByText(/Frame \(/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Table top \(/)).not.toBeInTheDocument()
  })

  it('shows flat tier total', () => {
    render(<SpecSheet spec={RECT_FLAT_SPEC} />)
    expect(screen.getAllByText('$349.00').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Estimated Total')).toBeInTheDocument()
  })
})

describe('SpecSheet — lshape MFC no grommet', () => {
  it('shows delivery as free', () => {
    render(<SpecSheet spec={LSHAPE_MFC_BASE} />)
    expect(screen.getByText('Delivery')).toBeInTheDocument()
    const freeValues = screen.getAllByText('Free')
    expect(freeValues.length).toBeGreaterThan(0)
  })

  it('does not show grommet hole or cap lines', () => {
    render(<SpecSheet spec={LSHAPE_MFC_BASE} />)
    expect(screen.queryByText(/Grommet hole/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Grommet cap/)).not.toBeInTheDocument()
  })
})

describe('SpecSheet — lshape MFC with grommet', () => {
  it('shows grommet hole as free and cap with price', () => {
    render(<SpecSheet spec={LSHAPE_MFC_GROMMET} />)
    expect(screen.getByText(/Grommet hole cut-out/)).toBeInTheDocument()
    expect(screen.getByText(/Grommet cap/)).toBeInTheDocument()
    expect(screen.getByText('$9.90')).toBeInTheDocument()
  })
})

describe('SpecSheet — lshape solid wood', () => {
  it('shows two-part area row', () => {
    render(<SpecSheet spec={LSHAPE_SOLID_SPEC} />)
    expect(screen.getByText(/L1 area.*L2 area/)).toBeInTheDocument()
  })

  it('shows solid wood species label', () => {
    render(<SpecSheet spec={LSHAPE_SOLID_SPEC} />)
    expect(screen.getByText('Wood Species')).toBeInTheDocument()
    expect(screen.getByText('American Red Oak')).toBeInTheDocument()
  })
})

describe('SpecSheet — UniDesk', () => {
  it('shows formatted price', () => {
    render(<SpecSheet spec={UNI_SPEC_PRICE} />)
    expect(screen.getByText('$799.00')).toBeInTheDocument()
  })

  it('shows estimated total label', () => {
    render(<SpecSheet spec={UNI_SPEC_PRICE} />)
    expect(screen.getByText('Estimated Total')).toBeInTheDocument()
  })
})

describe('RectCalculator — print button visibility', () => {
  it('shows print button when config is valid', () => {
    render(<RectCalculator />)
    expect(screen.getByText('Print / Save as PDF')).toBeInTheDocument()
  })
})
