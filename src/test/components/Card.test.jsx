import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '../../components/ui/Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Hello world</Card>)
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('applies default styles', () => {
    const { container } = render(<Card>content</Card>)
    const div = container.firstChild
    expect(div.style.borderRadius).toBe('16px')
    expect(div.style.padding).toBe('24px')
  })

  it('merges custom style prop', () => {
    const { container } = render(<Card style={{ background: 'red' }}>content</Card>)
    const div = container.firstChild
    expect(div.style.background).toBe('red')
  })

  it('renders nested children', () => {
    render(
      <Card>
        <span data-testid='child-1'>first</span>
        <span data-testid='child-2'>second</span>
      </Card>
    )
    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })
})
