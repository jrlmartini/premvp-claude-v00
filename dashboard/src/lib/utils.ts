import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function formatCompactBase(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  const formatWithSuffix = (divisor: number, suffix: 'M' | 'k') => {
    const compactValue = abs / divisor
    const formatted = compactValue.toLocaleString('pt-BR', {
      minimumFractionDigits: compactValue >= 100 ? 0 : 1,
      maximumFractionDigits: compactValue >= 100 ? 0 : 1,
    })
    return `${sign}${formatted}${suffix}`
  }

  if (abs >= 1_000_000) {
    return formatWithSuffix(1_000_000, 'M')
  }

  if (abs >= 1_000) {
    return formatWithSuffix(1_000, 'k')
  }

  const formatted = abs.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return `${sign}${formatted}`
}

export function formatBRL(value: number): string {
  const formatted = value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `R$ ${formatted}`
}

export function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR')
}

export function formatCompactNumber(value: number): string {
  return formatCompactBase(value)
}

export function formatCompactBRL(value: number): string {
  return `R$ ${formatCompactBase(value)}`
}

export function formatPercent(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }) + '%'
}
