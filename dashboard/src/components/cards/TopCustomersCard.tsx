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
    <Card className="col-span-2 md:col-span-2 sm:col-span-1" delay={delay}>
      <CardHeader
        icon={Users}
        title="Top 10 Clientes"
        subtitle="Receita acumulada YTD"
        iconColor="var(--secondary)"
      />

      <div className="overflow-x-auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['#', 'Cliente', 'Receita', 'Part.', 'Trend'].map((header, i) => (
                <th
                  key={header}
                  style={{
                    textAlign: i >= 2 ? (i === 4 ? 'center' : 'right') : 'left',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1.4,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--neutral-500)',
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((customer, i) => {
              const TrendIcon = trendIcons[customer.trend]
              return (
                <tr
                  key={customer.rank}
                  style={{
                    backgroundColor: i % 2 === 0 ? 'var(--neutral-50)' : '#FFFFFF',
                    borderBottom: '1px solid var(--neutral-200)',
                    height: 44,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--neutral-100)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 0 ? 'var(--neutral-50)' : '#FFFFFF' }}
                >
                  <td style={{ padding: '0 8px', fontSize: 12, fontWeight: 500, color: 'var(--neutral-500)' }}>
                    {customer.rank}
                  </td>
                  <td style={{ padding: '0 8px', fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--neutral-700)' }}>
                    {customer.name}
                  </td>
                  <td className="font-mono" style={{ padding: '0 8px', fontSize: 14, textAlign: 'right', color: 'var(--neutral-900)' }}>
                    {formatBRL(customer.revenue)}
                  </td>
                  <td className="font-mono" style={{ padding: '0 8px', fontSize: 12, textAlign: 'right', color: 'var(--neutral-500)' }}>
                    {formatPercent(customer.share)}
                  </td>
                  <td style={{ padding: '0 8px', textAlign: 'center' }}>
                    <TrendIcon size={16} strokeWidth={1.5} style={{ color: trendColors[customer.trend], display: 'inline-block' }} />
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid var(--neutral-200)', height: 44 }}>
              <td colSpan={2} style={{ padding: '0 8px', fontSize: 14, fontWeight: 600, color: 'var(--neutral-900)' }}>
                Total Top 10
              </td>
              <td className="font-mono" style={{ padding: '0 8px', fontSize: 14, fontWeight: 700, textAlign: 'right', color: 'var(--neutral-900)' }}>
                {formatBRL(totalRevenue)}
              </td>
              <td className="font-mono" style={{ padding: '0 8px', fontSize: 12, textAlign: 'right', color: 'var(--neutral-500)' }}>
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
