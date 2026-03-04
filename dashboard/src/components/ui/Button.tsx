import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const variantStyles: Record<Variant, CSSProperties> = {
  primary: {
    backgroundColor: 'var(--bg-button)',
    color: 'var(--txt-main)',
    border: '0.5px solid transparent',
  },
  secondary: {
    backgroundColor: 'var(--bg-card)',
    color: 'var(--txt-main)',
    border: '0.5px solid var(--str-default)',
  },
  ghost: {
    backgroundColor: 'var(--bg-card)',
    color: 'var(--txt-secondary)',
    border: '0.5px solid var(--str-disabled)',
  },
  destructive: {
    backgroundColor: 'var(--bg-destructive)',
    color: 'var(--txt-main)',
    border: '0.5px solid transparent',
  },
}

export function Button({ variant = 'primary', children, style, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        minHeight: 40,
        padding: '0 14px',
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'border-color 0.15s ease, color 0.15s ease',
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (variant === 'primary' || variant === 'secondary') {
          e.currentTarget.style.border = '1px solid var(--str-hover)'
        }
        if (variant === 'ghost') {
          e.currentTarget.style.border = '1px solid var(--str-disabled)'
          e.currentTarget.style.color = 'var(--txt-main)'
        }
        if (variant === 'destructive') {
          e.currentTarget.style.border = '1px solid var(--str-destructive)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = variantStyles[variant].border as string
        if (variant === 'ghost') {
          e.currentTarget.style.color = 'var(--txt-secondary)'
        }
      }}
    >
      {children}
    </button>
  )
}
