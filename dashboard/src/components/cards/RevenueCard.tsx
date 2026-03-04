import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { Card, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { revenueData } from '../../data/mockData'
import { formatBRL, formatPercent } from '../../lib/utils'
import { tooltipProps, axisTickStyle, axisValueTickStyle, gridStyle } from '../../lib/chartStyles'

interface RevenueCardProps {
  delay?: number
}

export function RevenueCard({ delay = 0 }: RevenueCardProps) {
  const mtdPct = ((revenueData.mtd.actual / revenueData.mtd.goal) * 100) - 100
  const ytdPct = ((revenueData.ytd.actual / revenueData.ytd.goal) * 100) - 100
  const mtdVsAvg = ((revenueData.mtd.actual / revenueData.mtd.average) * 100) - 100

  return (
    <Card className="col-span-2 md:col-span-2 sm:col-span-1" delay={delay}>
      <CardHeader
        icon={DollarSign}
        title="Receita"
        subtitle="MTD e YTD vs. Meta Runrate"
        iconColor="var(--chart-1)"
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16, marginBottom: 16 }}>
        {/* MTD */}
        <div className="kpi-tile" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)', marginBottom: 4 }}>
            Receita MTD
          </div>
          <div className="font-mono kpi-display" style={{ color: 'var(--txt-main)' }}>
            {formatBRL(revenueData.mtd.actual)}
          </div>
          <div className="flex items-center" style={{ gap: 4, marginTop: 8 }}>
            {mtdPct >= 0 ? (
              <TrendingUp size={16} strokeWidth={1.5} style={{ color: 'var(--st-success)' }} className="animate-pulse-soft" />
            ) : (
              <TrendingDown size={16} strokeWidth={1.5} style={{ color: 'var(--st-danger)' }} />
            )}
            <Badge variant={mtdPct >= 0 ? 'success' : 'danger'}>
              {formatPercent(mtdPct)} vs meta
            </Badge>
          </div>
        </div>

        {/* YTD */}
        <div className="kpi-tile" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)', marginBottom: 4 }}>
            Receita YTD
          </div>
          <div className="font-mono kpi-display" style={{ color: 'var(--txt-main)' }}>
            {formatBRL(revenueData.ytd.actual)}
          </div>
          <div className="flex items-center" style={{ gap: 4, marginTop: 8 }}>
            {ytdPct >= 0 ? (
              <TrendingUp size={16} strokeWidth={1.5} style={{ color: 'var(--st-success)' }} className="animate-pulse-soft" />
            ) : (
              <TrendingDown size={16} strokeWidth={1.5} style={{ color: 'var(--st-danger)' }} />
            )}
            <Badge variant={ytdPct >= 0 ? 'success' : 'danger'}>
              {formatPercent(ytdPct)} vs meta
            </Badge>
          </div>
        </div>

        {/* Average */}
        <div className="kpi-tile" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)', marginBottom: 4 }}>
            Média Mensal
          </div>
          <div className="font-mono kpi-value" style={{ color: 'var(--txt-main)' }}>
            {formatBRL(revenueData.mtd.average)}
          </div>
          <div className="flex items-center" style={{ gap: 4, marginTop: 8 }}>
            <Badge variant={mtdVsAvg >= 0 ? 'success' : 'warning'}>
              {formatPercent(mtdVsAvg)} vs média
            </Badge>
          </div>
        </div>
      </div>

      {/* Chart — mini chart height 48px per spec, but for this rich chart we use more */}
      <div style={{ height: 192 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData.dailyMTD}>
            <CartesianGrid {...gridStyle} />
            <XAxis
              dataKey="day"
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
              formatter={(value?: number) => [formatBRL(value ?? 0), 'Receita']}
            />
            <ReferenceLine
              y={revenueData.mtd.goal / 22}
              stroke="var(--chart-6)"
              strokeDasharray="4 4"
              label={{
                value: 'Meta/dia',
                position: 'right',
                fill: 'var(--chart-6)',
                fontSize: 10,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="var(--chart-1)" fillOpacity={0.15}
              animationDuration={600}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
