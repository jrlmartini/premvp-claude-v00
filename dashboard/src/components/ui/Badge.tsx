interface BadgeProps {
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  children: React.ReactNode
}

const variants = {
  success: { bg: 'var(--st-success)', color: 'var(--txt-modal)' },
  warning: { bg: 'var(--st-warning)', color: 'var(--txt-modal)' },
  danger: { bg: 'var(--st-danger)', color: 'var(--txt-modal)' },
  info: { bg: 'var(--chart-3)', color: 'var(--txt-modal)' },
  neutral: { bg: 'var(--bg-modal)', color: 'var(--txt-main)' },
}

export function Badge({ variant, children }: BadgeProps) {
  const s = variants[variant]
  return (
    <span
      className="inline-flex items-center"
      style={{
        backgroundColor: s.bg,
        color: s.color,
        borderRadius: 8,
        padding: '2px 8px',
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  )
}
