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
import { tooltipStyle, axisValueTickStyle, axisTickStyle } from '../../lib/chartStyles'

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
        iconColor="var(--chart-6)"
      />

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)' }}>Total a Receber</div>
        <div className="font-mono" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1, color: 'var(--txt-main)' }}>
          {formatBRL(total)}
        </div>
      </div>

      {/* Stacked horizontal bar */}
      <div className="flex overflow-hidden" style={{ height: 16, borderRadius: 8, marginBottom: 16, backgroundColor: 'var(--str-default)' }}>
        {arAgingData.map((item) => (
          <div
            key={item.range}
            style={{
              height: '100%',
              width: `${(item.value / total) * 100}%`,
              backgroundColor: item.color,
              transition: 'width 0.5s ease-out',
            }}
            title={`${item.range}: ${formatBRL(item.value)}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        {arAgingData.map((item) => (
          <div key={item.range} className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.color }} />
              <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--txt-main)' }}>{item.range}</span>
            </div>
            <span className="font-mono" style={{ fontSize: 12, fontWeight: 500, color: 'var(--txt-main)' }}>
              {formatBRL(item.value)}
            </span>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ height: 128 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={arAgingData} layout="vertical">
            <XAxis
              type="number"
              tick={axisValueTickStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`}
            />
            <YAxis
              type="category"
              dataKey="range"
              tick={axisTickStyle}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value?: number) => [formatBRL(value ?? 0), 'Valor']}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} animationDuration={600} animationEasing="ease-in-out">
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
