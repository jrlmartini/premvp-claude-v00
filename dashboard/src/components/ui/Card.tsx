import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <div
      className={`animate-fade-in-up bg-white ${className}`}
      style={{
        padding: 20,
        borderRadius: 12,
        border: '1px solid var(--neutral-200)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        transition: 'all 0.2s ease',
        animationDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)'
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

export function CardHeader({ icon: Icon, title, subtitle, iconColor = 'var(--primary)', action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between" style={{ paddingBottom: 16 }}>
      <div className="flex items-center" style={{ gap: 10 }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: `${iconColor}15`,
          }}
        >
          <Icon size={20} strokeWidth={1.5} style={{ color: iconColor }} />
        </div>
        <div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              lineHeight: 1.3,
              color: 'var(--neutral-900)',
              margin: 0,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--neutral-500)',
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>
      {action}
    </div>
  )
}
