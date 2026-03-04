import { Clock } from 'lucide-react'
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
import { arAgingData } from '../../data/mockData'
import { formatBRL } from '../../lib/utils'

interface ArAgingCardProps {
  delay?: number
}

export function ArAgingCard({ delay = 0 }: ArAgingCardProps) {
  const total = arAgingData.reduce((sum, d) => sum + d.value, 0)

  return (
    <Card delay={delay}>
      <CardHeader
        icon={Clock}
        title="Aging de Recebíveis"
        subtitle="Contas a receber por faixa"
        iconColor="var(--accent-warm)"
      />

      <div className="mb-3">
        <div className="text-xs" style={{ color: 'var(--neutral-500)' }}>Total a Receber</div>
        <div className="font-mono text-xl font-bold" style={{ color: 'var(--neutral-900)' }}>
          {formatBRL(total)}
        </div>
      </div>

      {/* Stacked horizontal bar */}
      <div className="flex h-4 rounded-full overflow-hidden mb-4" style={{ backgroundColor: 'var(--neutral-200)' }}>
        {arAgingData.map((item) => (
          <div
            key={item.range}
            className="h-full transition-all duration-500"
            style={{
              width: `${(item.value / total) * 100}%`,
              backgroundColor: item.color,
            }}
            title={`${item.range}: ${formatBRL(item.value)}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-2 mb-4">
        {arAgingData.map((item) => (
          <div key={item.range} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs" style={{ color: 'var(--neutral-700)' }}>{item.range}</span>
            </div>
            <span className="font-mono text-xs font-medium" style={{ color: 'var(--neutral-900)' }}>
              {formatBRL(item.value)}
            </span>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={arAgingData} layout="vertical">
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: 'var(--neutral-500)', fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`}
            />
            <YAxis
              type="category"
              dataKey="range"
              tick={{ fontSize: 10, fill: 'var(--neutral-500)' }}
              axisLine={false}
              tickLine={false}
              width={70}
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
              formatter={(value?: number) => [formatBRL(value ?? 0), 'Valor']}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={600}>
              {arAgingData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
