interface BadgeProps {
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  children: React.ReactNode
}

const variants = {
  success: { bg: '#E8F5E9', color: 'var(--success)' },
  warning: { bg: '#FFF3E0', color: 'var(--warning)' },
  danger: { bg: '#FFEBEE', color: 'var(--danger)' },
  info: { bg: '#E0F4F8', color: 'var(--info)' },
  neutral: { bg: 'var(--neutral-100)', color: 'var(--neutral-500)' },
}

export function Badge({ variant, children }: BadgeProps) {
  const style = variants[variant]
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {children}
    </span>
  )
}
