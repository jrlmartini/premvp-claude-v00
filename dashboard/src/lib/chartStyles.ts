// Shared chart styles per design system spec

export const tooltipStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '0.5px solid var(--str-default)',
  borderRadius: 12,
  color: 'var(--txt-main)',
  fontFamily: "'Outfit', sans-serif",
  fontSize: 12,
}

export const tooltipProps = {
  contentStyle: tooltipStyle,
  itemStyle: { color: 'var(--txt-main)' },
  labelStyle: { color: 'var(--txt-secondary)' },
}

export const chartColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
  'var(--chart-7)',
  'var(--chart-other)',
] as const

export const axisTickStyle = {
  fontSize: 11,
  fill: 'var(--txt-secondary)',
  fontFamily: "'Outfit', sans-serif",
}

export const axisValueTickStyle = {
  fontSize: 11,
  fill: 'var(--txt-secondary)',
  fontFamily: "'Outfit', sans-serif",
}

export const gridStyle = {
  stroke: 'var(--str-default)',
  strokeOpacity: 0.5,
}
