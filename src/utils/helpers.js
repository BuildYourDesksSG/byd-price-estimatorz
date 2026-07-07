export const fmt = (v) =>
  `$${Number(v).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
export const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
