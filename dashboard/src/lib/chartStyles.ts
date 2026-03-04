// Shared chart styles per design system spec

export const tooltipStyle: React.CSSProperties = {
  backgroundColor: 'white',
  border: '1px solid var(--neutral-200)',
  borderRadius: 12,
  boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 12,
}

// Design system chart color sequence
export const chartColors = [
  '#0B6E4F', // primary
  '#1B4965', // secondary
  '#62B6CB', // accent
  '#14A676', // primary-light
  '#F4A261', // accent-warm
  '#2D6A8F', // secondary-light
] as const

export const axisTickStyle = {
  fontSize: 11,
  fill: 'var(--neutral-500)',
  fontFamily: "'Inter', sans-serif",
}

export const axisValueTickStyle = {
  fontSize: 11,
  fill: 'var(--neutral-500)',
  fontFamily: "'JetBrains Mono', monospace",
}

export const gridStyle = {
  stroke: 'var(--neutral-200)',
  strokeDasharray: '3 3',
}
