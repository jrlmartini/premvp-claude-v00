import { BarChart3, Target } from 'lucide-react'
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Card, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { ebitdaData } from '../../data/mockData'
import { formatBRL, formatPercent } from '../../lib/utils'

interface EbitdaCardProps {
  delay?: number
}

export function EbitdaCard({ delay = 0 }: EbitdaCardProps) {
  const ytdPct = ((ebitdaData.ytdAccrued / ebitdaData.ytdGoal) * 100) - 100
  const progressPct = (ebitdaData.ytdAccrued / ebitdaData.ytdGoal) * 100

  return (
    <Card className="col-span-2" delay={delay}>
      <CardHeader
        icon={BarChart3}
        title="EBITDA Acumulado YTD"
        subtitle="Cálculo mensal"
        iconColor="var(--primary)"
        action={
          <div className="flex items-center gap-1.5">
            <Target size={12} style={{ color: 'var(--neutral-500)' }} />
            <span className="text-xs" style={{ color: 'var(--neutral-500)' }}>
              Meta: {formatBRL(ebitdaData.ytdGoal)}
            </span>
          </div>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--neutral-500)' }}>
            EBITDA Acumulado
          </div>
          <div className="font-mono text-xl font-bold" style={{ color: 'var(--neutral-900)' }}>
            {formatBRL(ebitdaData.ytdAccrued)}
          </div>
          <Badge variant={ytdPct >= 0 ? 'success' : 'danger'}>
            {formatPercent(ytdPct)} vs meta
          </Badge>
        </div>

        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--neutral-500)' }}>
            Margem EBITDA
          </div>
          <div className="font-mono text-xl font-bold" style={{ color: 'var(--primary)' }}>
            {formatPercent(ebitdaData.margin)}
          </div>
          <Badge variant="info">Margem operacional</Badge>
        </div>

        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--neutral-500)' }}>
            Progresso vs Meta
          </div>
          <div className="font-mono text-xl font-bold" style={{ color: 'var(--neutral-900)' }}>
            {progressPct.toFixed(1)}%
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--neutral-200)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.min(progressPct, 100)}%`,
                backgroundColor: progressPct >= 100 ? 'var(--success)' : 'var(--primary)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={ebitdaData.trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--neutral-200)" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: 'var(--neutral-500)' }}
              axisLine={{ stroke: 'var(--neutral-200)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--neutral-500)', fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
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
              formatter={(value?: number) => [formatBRL(value ?? 0), 'EBITDA']}
            />
            <Bar dataKey="value" fill="#0B6E4F" radius={[4, 4, 0, 0]} opacity={0.8} animationDuration={600} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1B4965"
              strokeWidth={2}
              dot={{ fill: '#1B4965', r: 3 }}
              animationDuration={600}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
