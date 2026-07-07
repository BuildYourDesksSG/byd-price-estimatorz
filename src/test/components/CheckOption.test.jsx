import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CheckOption from '../../components/ui/CheckOption'

describe('CheckOption', () => {
  it('renders label and formatted price', () => {
    render(<CheckOption label='Slim Drawer' price={39} checked={false} onChange={() => {}} />)
    expect(screen.getByText('Slim Drawer')).toBeInTheDocument()
    expect(screen.getByText('+$39.00')).toBeInTheDocument()
  })

  it('shows checkmark when checked', () => {
    const { container } = render(
      <CheckOption label='Drawer' price={39} checked={true} onChange={() => {}} />
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('hides checkmark when unchecked', () => {
    const { container } = render(
      <CheckOption label='Drawer' price={39} checked={false} onChange={() => {}} />
    )
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('calls onChange with toggled value on click', () => {
    const onChange = vi.fn()
    render(<CheckOption label='Drawer' price={39} checked={false} onChange={onChange} />)
    fireEvent.click(screen.getByText('Drawer').closest('div[style]'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('calls onChange with false when unchecking', () => {
    const onChange = vi.fn()
    render(<CheckOption label='Drawer' price={39} checked={true} onChange={onChange} />)
    fireEvent.click(screen.getByText('Drawer').closest('div[style]'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('formats decimal accessory prices correctly', () => {
    render(<CheckOption label='Castors' price={39.9} checked={false} onChange={() => {}} />)
    expect(screen.getByText('+$39.90')).toBeInTheDocument()
  })
})
