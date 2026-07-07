import { describe, it, expect } from 'vitest'
import { fmt, clamp } from '../utils/helpers'

describe('fmt', () => {
  it('formats whole number with two decimal places', () => {
    expect(fmt(349)).toBe('$349.00')
  })

  it('formats zero', () => {
    expect(fmt(0)).toBe('$0.00')
  })

  it('pads single decimal digit', () => {
    expect(fmt(9.9)).toBe('$9.90')
  })

  it('formats value with two decimal places', () => {
    expect(fmt(9.905)).toBe('$9.91')
  })

  it('handles large amounts', () => {
    expect(fmt(1234.56)).toBe('$1,234.56')
  })

  it('formats accessory prices correctly', () => {
    expect(fmt(39)).toBe('$39.00')
    expect(fmt(129)).toBe('$129.00')
    expect(fmt(39.9)).toBe('$39.90')
    expect(fmt(59.9)).toBe('$59.90')
  })
})

describe('clamp', () => {
  it('returns min when value is below range', () => {
    expect(clamp(5, 10, 100)).toBe(10)
  })

  it('returns max when value is above range', () => {
    expect(clamp(150, 10, 100)).toBe(100)
  })

  it('returns value when within range', () => {
    expect(clamp(50, 10, 100)).toBe(50)
  })

  it('returns min when value equals min', () => {
    expect(clamp(10, 10, 100)).toBe(10)
  })

  it('returns max when value equals max', () => {
    expect(clamp(100, 10, 100)).toBe(100)
  })

  it('clamps L-shape dimension defaults correctly', () => {
    // clamp(140, 120, 150) → 140 (in range for MFC/MDF)
    expect(clamp(140, 120, 150)).toBe(140)
    // clamp(140, 120, 180) → 140 (in range for solid wood)
    expect(clamp(140, 120, 180)).toBe(140)
    // clamp(120, 50, 90) → 90 (MDF L2 max is 90)
    expect(clamp(120, 50, 90)).toBe(90)
  })
})
