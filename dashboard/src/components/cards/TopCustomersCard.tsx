import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { topCustomers } from '../../data/mockData'
import { formatBRL, formatPercent } from '../../lib/utils'

interface TopCustomersCardProps {
  delay?: number
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
}

const trendColors = {
  up: 'var(--success)',
  down: 'var(--danger)',
  stable: 'var(--neutral-500)',
}

export function TopCustomersCard({ delay = 0 }: TopCustomersCardProps) {
  const totalRevenue = topCustomers.reduce((sum, c) => sum + c.revenue, 0)

  return (
    <Card className="col-span-2" delay={delay}>
      <CardHeader
        icon={Users}
        title="Top 10 Clientes"
        subtitle="Receita acumulada YTD"
        iconColor="var(--secondary)"
      />

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-xs font-medium uppercase tracking-wide pb-2 px-2" style={{ color: 'var(--neutral-500)' }}>#</th>
              <th className="text-left text-xs font-medium uppercase tracking-wide pb-2 px-2" style={{ color: 'var(--neutral-500)' }}>Cliente</th>
              <th className="text-right text-xs font-medium uppercase tracking-wide pb-2 px-2" style={{ color: 'var(--neutral-500)' }}>Receita</th>
              <th className="text-right text-xs font-medium uppercase tracking-wide pb-2 px-2" style={{ color: 'var(--neutral-500)' }}>Part.</th>
              <th className="text-center text-xs font-medium uppercase tracking-wide pb-2 px-2" style={{ color: 'var(--neutral-500)' }}>Trend</th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((customer, i) => {
              const TrendIcon = trendIcons[customer.trend]
              return (
                <tr
                  key={customer.rank}
                  className="transition-colors duration-150 hover:bg-[var(--neutral-100)]"
                  style={{
                    backgroundColor: i % 2 === 0 ? 'var(--neutral-50)' : 'white',
                    borderBottom: '1px solid var(--neutral-200)',
                  }}
                >
                  <td className="py-2.5 px-2 text-xs font-medium" style={{ color: 'var(--neutral-500)' }}>
                    {customer.rank}
                  </td>
                  <td className="py-2.5 px-2 text-sm" style={{ color: 'var(--neutral-700)' }}>
                    {customer.name}
                  </td>
                  <td className="py-2.5 px-2 text-sm text-right font-mono" style={{ color: 'var(--neutral-900)' }}>
                    {formatBRL(customer.revenue)}
                  </td>
                  <td className="py-2.5 px-2 text-xs text-right font-mono" style={{ color: 'var(--neutral-500)' }}>
                    {formatPercent(customer.share)}
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <TrendIcon size={14} style={{ color: trendColors[customer.trend], margin: '0 auto' }} />
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid var(--neutral-200)' }}>
              <td colSpan={2} className="py-2.5 px-2 text-sm font-semibold" style={{ color: 'var(--neutral-900)' }}>
                Total Top 10
              </td>
              <td className="py-2.5 px-2 text-sm text-right font-mono font-bold" style={{ color: 'var(--neutral-900)' }}>
                {formatBRL(totalRevenue)}
              </td>
              <td className="py-2.5 px-2 text-xs text-right font-mono" style={{ color: 'var(--neutral-500)' }}>
                {formatPercent(topCustomers.reduce((s, c) => s + c.share, 0))}
              </td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  )
}
