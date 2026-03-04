import { Landmark, TrendingUp } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Card, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { cashPosition } from '../../data/mockData'
import { formatCompactBRL, formatCompactNumber, formatPercent } from '../../lib/utils'
import { tooltipProps, axisTickStyle, axisValueTickStyle } from '../../lib/chartStyles'

interface CashPositionCardProps {
  delay?: number
}

export function CashPositionCard({ delay = 0 }: CashPositionCardProps) {
  return (
    <Card delay={delay}>
      <CardHeader
        icon={Landmark}
        title="Posição de Caixa"
        subtitle="Saldo em BRL"
        iconColor="var(--chart-2)"
      />

      <div className="kpi-tile" style={{ marginBottom: 16 }}>
        <div className="font-mono kpi-display" style={{ color: 'var(--txt-main)' }}>
          {formatCompactBRL(cashPosition.current)}
        </div>
        <div className="flex items-center" style={{ gap: 6, marginTop: 8 }}>
          <TrendingUp size={16} strokeWidth={1.5} style={{ color: 'var(--st-success)' }} className="animate-pulse-soft" />
          <Badge variant="success">
            +{formatPercent(cashPosition.change)} vs mês anterior
          </Badge>
        </div>
      </div>

      <div style={{ height: 144 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashPosition.history}>
            <XAxis
              dataKey="month"
              tick={axisTickStyle}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={axisValueTickStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => formatCompactNumber(v)}
            />
            <Tooltip
              {...tooltipProps}
              formatter={(value?: number) => [formatCompactBRL(value ?? 0), 'Saldo']}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={600} animationEasing="ease-in-out">
              {cashPosition.history.map((_, index) => (
                <Cell
                  key={index}
                  fill={index === cashPosition.history.length - 1 ? 'var(--chart-1)' : 'var(--chart-3)'}
                  opacity={index === cashPosition.history.length - 1 ? 1 : 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
