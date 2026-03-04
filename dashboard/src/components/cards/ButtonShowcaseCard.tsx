import { SlidersHorizontal, Target, TrendingUp, Users } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader } from '../ui/Card'
import { Button } from '../ui/Button'
import { quickActionsInsights } from '../../data/mockData'
import { formatCompactBRL, formatCompactNumber, formatPercent } from '../../lib/utils'

interface ButtonShowcaseCardProps {
  delay?: number
}

export function ButtonShowcaseCard({ delay = 0 }: ButtonShowcaseCardProps) {
  return (
    <Card delay={delay}>
      <CardHeader
        icon={SlidersHorizontal}
        title="Ações rápidas"
        subtitle="Prévia de estilos de botão"
        iconColor="var(--chart-3)"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12, marginBottom: 16 }}>
        <Button variant="primary">Primário</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destrutivo</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--txt-secondary)' }}>Sparklines de validação</div>

        <div style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--bg-main)', border: '0.5px solid var(--str-default)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <div className="flex items-center" style={{ gap: 6 }}>
              <Target size={14} strokeWidth={1.5} style={{ color: 'var(--chart-6)' }} />
              <span style={{ fontSize: 12, color: 'var(--txt-secondary)' }}>Amplitude da meta</span>
            </div>
            <span className="font-mono" style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt-main)' }}>
              {formatPercent(quickActionsInsights.goalProgress)}
            </span>
          </div>
          <div style={{ width: '100%', height: 8, borderRadius: 4, backgroundColor: 'var(--str-default)' }}>
            <div
              style={{
                width: `${Math.min(quickActionsInsights.goalProgress, 100)}%`,
                height: '100%',
                borderRadius: 4,
                backgroundColor: 'var(--chart-2)',
              }}
            />
          </div>
        </div>

        <div style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--bg-main)', border: '0.5px solid var(--str-default)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <div className="flex items-center" style={{ gap: 6 }}>
              <TrendingUp size={14} strokeWidth={1.5} style={{ color: 'var(--chart-1)' }} />
              <span style={{ fontSize: 12, color: 'var(--txt-secondary)' }}>Vendas no ano</span>
            </div>
            <span className="font-mono" style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt-main)' }}>
              {formatCompactBRL(quickActionsInsights.salesSeries[quickActionsInsights.salesSeries.length - 1]?.value ?? 0)}
            </span>
          </div>
          <div style={{ height: 56 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quickActionsInsights.salesSeries}>
                <Line type="monotone" dataKey="value" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--bg-main)', border: '0.5px solid var(--str-default)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <div className="flex items-center" style={{ gap: 6 }}>
              <Users size={14} strokeWidth={1.5} style={{ color: 'var(--chart-4)' }} />
              <span style={{ fontSize: 12, color: 'var(--txt-secondary)' }}>Clientes por mês</span>
            </div>
            <span className="font-mono" style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt-main)' }}>
              {formatCompactNumber(quickActionsInsights.customersSeries[quickActionsInsights.customersSeries.length - 1]?.value ?? 0)}
            </span>
          </div>
          <div style={{ height: 56 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quickActionsInsights.customersSeries}>
                <Bar dataKey="value" fill="var(--chart-4)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  )
}
