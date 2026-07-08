import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RectCalculator from '../../components/calculators/RectCalculator'

// Default state: material=mdf, length=140, depth=70, motor=dual, assembly=off
// frame.price=379, area=0.98m², top=215.60, assembly=0, total=594.60

describe('RectCalculator — default render', () => {
  it('renders size fields', () => {
    render(<RectCalculator />)
    expect(screen.getByDisplayValue('140')).toBeInTheDocument()
    expect(screen.getByDisplayValue('70')).toBeInTheDocument()
  })

  it('shows dual frame selected by default at 140cm', () => {
    render(<RectCalculator />)
    expect(screen.getByText('Build Your Desks\u2122 Pro')).toBeInTheDocument()
  })

  it('shows price estimate at default dimensions (no assembly)', () => {
    render(<RectCalculator />)
    expect(screen.getByText('$594.60')).toBeInTheDocument()
  })

  it('shows MDF colour swatches by default', () => {
    render(<RectCalculator />)
    expect(screen.getByText('MDF Colour')).toBeInTheDocument()
  })

  it('shows edge style section by default', () => {
    render(<RectCalculator />)
    expect(screen.getByText('Edge Style')).toBeInTheDocument()
    expect(screen.getByText('Waterfall\u2122 Edge')).toBeInTheDocument()
    expect(screen.getByText('Waterfall\u2122 Curve')).toBeInTheDocument()
  })

  it('shows grommet hole cut-out section', () => {
    render(<RectCalculator />)
    expect(screen.getByText('Grommet Hole Cut-out')).toBeInTheDocument()
  })

  it('shows assembly option', () => {
    render(<RectCalculator />)
    expect(screen.getAllByText('Assembly').length).toBeGreaterThanOrEqual(1)
  })

  it('shows accessory options', () => {
    render(<RectCalculator />)
    expect(screen.getByText('Slim Drawer Black/White')).toBeInTheDocument()
    expect(screen.getByText('Retractable Socket Black/White')).toBeInTheDocument()
    expect(screen.getByText('Sliding Socket Black/Silver')).toBeInTheDocument()
    expect(screen.getByText('Cable Tray Black/White')).toBeInTheDocument()
  })
})

describe('RectCalculator — accessories add to total', () => {
  it('adding drawer increases total by $39.00', async () => {
    render(<RectCalculator />)
    // Default total: $594.60
    const drawer = screen.getByText('Slim Drawer Black/White')
    fireEvent.click(drawer.closest('div[style]'))
    await waitFor(() => {
      expect(screen.getByText('$633.60')).toBeInTheDocument()
    })
  })

  it('adding assembly increases total by $60.00', async () => {
    render(<RectCalculator />)
    fireEvent.click(
      screen.getByText('Assembly Service (Free Cable Tray Worth $49)').closest('div[style]'),
    )
    await waitFor(() => {
      expect(screen.getByText('$654.60')).toBeInTheDocument()
    })
  })

  it('drawer line item appears in estimate when selected', async () => {
    render(<RectCalculator />)
    fireEvent.click(screen.getByText('Slim Drawer Black/White').closest('div[style]'))
    await waitFor(() => {
      const rows = screen.getAllByText('Slim Drawer')
      expect(rows.length).toBeGreaterThan(0)
    })
  })
})

describe('RectCalculator — frame selection', () => {
  it('shows only T-03 Single when length is 90–99cm', async () => {
    render(<RectCalculator />)
    fireEvent.change(screen.getByDisplayValue('140'), { target: { value: '95' } })
    await waitFor(() => {
      expect(screen.getByText('Build Your Desks\u2122 Lite')).toBeInTheDocument()
      expect(screen.queryByText('Build Your Desks\u2122 Pro')).not.toBeInTheDocument()
    })
  })

  it('shows both frames when length is 100–160cm', async () => {
    render(<RectCalculator />)
    fireEvent.change(screen.getByDisplayValue('140'), { target: { value: '120' } })
    await waitFor(() => {
      expect(screen.getByText('Build Your Desks\u2122 Lite')).toBeInTheDocument()
      expect(screen.getByText('Build Your Desks\u2122 Pro')).toBeInTheDocument()
    })
  })

  it('shows only dual frame when length is 161–180cm', async () => {
    render(<RectCalculator />)
    fireEvent.change(screen.getByDisplayValue('140'), { target: { value: '165' } })
    await waitFor(() => {
      expect(screen.queryByText('Build Your Desks\u2122 Lite')).not.toBeInTheDocument()
      expect(screen.getByText('Build Your Desks\u2122 Pro')).toBeInTheDocument()
    })
  })
})
