import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <div
      className={`animate-fade-in-up ${className}`}
      style={{
        padding: 24,
        borderRadius: 12,
        border: '0.5px solid var(--str-default)',
        backgroundColor: 'var(--bg-card)',
        transition: 'border-color 0.15s ease',
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '1px solid var(--str-hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '0.5px solid var(--str-default)'
      }}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  icon: React.ElementType
  title: string
  subtitle?: string
  iconColor?: string
  action?: ReactNode
}

export function CardHeader({ icon: Icon, title, subtitle, iconColor = 'var(--chart-1)', action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between" style={{ paddingBottom: 16 }}>
      <div className="flex items-center" style={{ gap: 8 }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: '0.5px solid var(--str-default)',
          }}
        >
          <Icon size={20} strokeWidth={1.5} style={{ color: iconColor }} />
        </div>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--txt-main)', margin: 0, lineHeight: 1.2 }}>{title}</h3>
          {subtitle && <span style={{ fontSize: 16, color: 'var(--txt-secondary)' }}>{subtitle}</span>}
        </div>
      </div>
      {action}
    </div>
  )
}
