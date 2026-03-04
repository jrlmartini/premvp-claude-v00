import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Card({ children, className = '', delay = 0 }: CardProps) {
  return (
    <div
      className={`animate-fade-in-up bg-white rounded-xl p-5 transition-shadow duration-200 hover:shadow-lg ${className}`}
      style={{
        border: '1px solid var(--neutral-200)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        animationDelay: `${delay}ms`,
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
    <div className="flex items-start justify-between pb-4">
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon size={18} style={{ color: iconColor }} />
        </div>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--neutral-900)' }}>
            {title}
          </h3>
          {subtitle && (
            <span className="text-xs" style={{ color: 'var(--neutral-500)' }}>
              {subtitle}
            </span>
          )}
        </div>
      </div>
      {action}
    </div>
  )
}
