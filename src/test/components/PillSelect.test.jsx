import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PillSelect from '../../components/ui/PillSelect'

const OPTIONS = ['Left', 'Middle', 'Right']

describe('PillSelect', () => {
  it('renders all options', () => {
    render(<PillSelect options={OPTIONS} value='Middle' onChange={() => {}} />)
    expect(screen.getByText('Left')).toBeInTheDocument()
    expect(screen.getByText('Middle')).toBeInTheDocument()
    expect(screen.getByText('Right')).toBeInTheDocument()
  })

  it('highlights the active option with brand background', () => {
    render(<PillSelect options={OPTIONS} value='Middle' onChange={() => {}} />)
    const active = screen.getByText('Middle')
    // Active pill has white text on brand background
    expect(active.style.color).toBe('rgb(255, 255, 255)')
  })

  it('calls onChange with selected option value', () => {
    const onChange = vi.fn()
    render(<PillSelect options={OPTIONS} value='Middle' onChange={onChange} />)
    fireEvent.click(screen.getByText('Left'))
    expect(onChange).toHaveBeenCalledWith('Left')
  })

  it('calls onChange when clicking already-selected option', () => {
    const onChange = vi.fn()
    render(<PillSelect options={OPTIONS} value='Middle' onChange={onChange} />)
    fireEvent.click(screen.getByText('Middle'))
    expect(onChange).toHaveBeenCalledWith('Middle')
  })

  it('renders single option', () => {
    render(<PillSelect options={['Single']} value='Single' onChange={() => {}} />)
    expect(screen.getByText('Single')).toBeInTheDocument()
  })
})
