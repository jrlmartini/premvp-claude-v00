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
import { tooltipProps, axisTickStyle, axisValueTickStyle, gridStyle } from '../../lib/chartStyles'

interface EbitdaCardProps {
  delay?: number
}

export function EbitdaCard({ delay = 0 }: EbitdaCardProps) {
  const ytdPct = ((ebitdaData.ytdAccrued / ebitdaData.ytdGoal) * 100) - 100
  const progressPct = (ebitdaData.ytdAccrued / ebitdaData.ytdGoal) * 100

  return (
    <Card className="col-span-2 md:col-span-2 sm:col-span-1" delay={delay}>
      <CardHeader
        icon={BarChart3}
        title="EBITDA Acumulado YTD"
        subtitle="Cálculo mensal"
        iconColor="var(--chart-1)"
        action={
          <div className="flex items-center" style={{ gap: 6 }}>
            <Target size={16} strokeWidth={1.5} style={{ color: 'var(--txt-secondary)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)' }}>
              Meta: {formatBRL(ebitdaData.ytdGoal)}
            </span>
          </div>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16, marginBottom: 16 }}>
        <div className="kpi-tile" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)', marginBottom: 4 }}>
            EBITDA Acumulado
          </div>
          <div className="font-mono kpi-display" style={{ color: 'var(--txt-main)' }}>
            {formatBRL(ebitdaData.ytdAccrued)}
          </div>
          <div style={{ marginTop: 8 }}>
            <Badge variant={ytdPct >= 0 ? 'success' : 'danger'}>
              {formatPercent(ytdPct)} vs meta
            </Badge>
          </div>
        </div>

        <div className="kpi-tile" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)', marginBottom: 4 }}>
            Margem EBITDA
          </div>
          <div className="font-mono kpi-display" style={{ color: 'var(--chart-1)' }}>
            {formatPercent(ebitdaData.margin)}
          </div>
          <div style={{ marginTop: 8 }}>
            <Badge variant="info">Margem operacional</Badge>
          </div>
        </div>

        <div className="kpi-tile" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)', marginBottom: 4 }}>
            Progresso vs Meta
          </div>
          <div className="font-mono kpi-display" style={{ color: 'var(--txt-main)' }}>
            {progressPct.toFixed(1)}%
          </div>
          <div style={{ width: '100%', height: 8, borderRadius: 4, marginTop: 8, backgroundColor: 'var(--str-default)' }}>
            <div
              style={{
                height: '100%',
                borderRadius: 4,
                width: `${Math.min(progressPct, 100)}%`,
                backgroundColor: progressPct >= 100 ? 'var(--st-success)' : 'var(--chart-1)',
                transition: 'width 1s ease-out',
              }}
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 192 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={ebitdaData.trend}>
            <CartesianGrid {...gridStyle} />
            <XAxis
              dataKey="month"
              tick={axisTickStyle}
              axisLine={{ stroke: 'var(--str-default)' }}
              tickLine={false}
            />
            <YAxis
              tick={axisValueTickStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              {...tooltipProps}
              formatter={(value?: number) => [formatBRL(value ?? 0), 'EBITDA']}
            />
            <Bar dataKey="value" fill="var(--chart-1)" radius={[4, 4, 0, 0]} opacity={0.8} animationDuration={600} animationEasing="ease-in-out" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={{ fill: 'var(--chart-2)', r: 3 }}
              animationDuration={600}
              animationEasing="ease-in-out"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
