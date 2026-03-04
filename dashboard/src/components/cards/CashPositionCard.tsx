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
import { formatBRL, formatPercent } from '../../lib/utils'

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
        iconColor="var(--secondary)"
      />

      <div className="mb-4">
        <div className="font-mono text-2xl font-bold" style={{ color: 'var(--neutral-900)' }}>
          {formatBRL(cashPosition.current)}
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <TrendingUp size={14} style={{ color: 'var(--success)' }} />
          <Badge variant="success">
            +{formatPercent(cashPosition.change)} vs mês anterior
          </Badge>
        </div>
      </div>

      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashPosition.history}>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: 'var(--neutral-500)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--neutral-500)', fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--neutral-200)',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontFamily: 'JetBrains Mono',
                fontSize: 12,
              }}
              formatter={(value?: number) => [formatBRL(value ?? 0), 'Saldo']}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={600}>
              {cashPosition.history.map((_, index) => (
                <Cell
                  key={index}
                  fill={index === cashPosition.history.length - 1 ? '#0B6E4F' : '#62B6CB'}
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
