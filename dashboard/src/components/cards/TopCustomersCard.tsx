import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { topCustomers } from '../../data/mockData'
import { formatCompactBRL, formatPercent } from '../../lib/utils'

interface TopCustomersCardProps {
  delay?: number
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
}

const trendColors = {
  up: 'var(--st-success)',
  down: 'var(--st-danger)',
  stable: 'var(--txt-secondary)',
}

export function TopCustomersCard({ delay = 0 }: TopCustomersCardProps) {
  const totalRevenue = topCustomers.reduce((sum, c) => sum + c.revenue, 0)

  return (
    <Card className="col-span-2 md:col-span-2 sm:col-span-1" delay={delay}>
      <CardHeader
        icon={Users}
        title="Top 10 Clientes"
        subtitle="Receita acumulada YTD"
        iconColor="var(--chart-2)"
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
                    color: 'var(--txt-secondary)',
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
                    backgroundColor: i % 2 === 0 ? 'var(--bg-main)' : 'var(--bg-card)',
                    borderBottom: '0.5px solid var(--str-default)',
                    borderLeft: '0.5px solid transparent',
                    borderRight: '0.5px solid transparent',
                    height: 44,
                    transition: 'border-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderLeft = '1px solid var(--str-hover)'
                    e.currentTarget.style.borderRight = '1px solid var(--str-hover)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeft = '0.5px solid transparent'
                    e.currentTarget.style.borderRight = '0.5px solid transparent'
                  }}
                >
                  <td style={{ padding: '0 8px', fontSize: 12, fontWeight: 500, color: 'var(--txt-secondary)' }}>
                    {customer.rank}
                  </td>
                  <td style={{ padding: '0 8px', fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--txt-main)' }}>
                    {customer.name}
                  </td>
                  <td className="font-mono" style={{ padding: '0 8px', fontSize: 14, textAlign: 'right', color: 'var(--txt-main)' }}>
                    {formatCompactBRL(customer.revenue)}
                  </td>
                  <td className="font-mono" style={{ padding: '0 8px', fontSize: 12, textAlign: 'right', color: 'var(--txt-secondary)' }}>
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
            <tr style={{ borderTop: '2px solid var(--str-default)', height: 44 }}>
              <td colSpan={2} style={{ padding: '0 8px', fontSize: 14, fontWeight: 600, color: 'var(--txt-main)' }}>
                Total Top 10
              </td>
              <td className="font-mono" style={{ padding: '0 8px', fontSize: 14, fontWeight: 700, textAlign: 'right', color: 'var(--txt-main)' }}>
                {formatCompactBRL(totalRevenue)}
              </td>
              <td className="font-mono" style={{ padding: '0 8px', fontSize: 12, textAlign: 'right', color: 'var(--txt-secondary)' }}>
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
