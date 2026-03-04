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
import { tooltipStyle, axisTickStyle, axisValueTickStyle, gridStyle } from '../../lib/chartStyles'

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
        iconColor="var(--primary)"
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16, marginBottom: 16 }}>
        {/* MTD */}
        <div style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--neutral-50)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-500)', marginBottom: 4 }}>
            Receita MTD
          </div>
          <div className="font-mono" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1, color: 'var(--neutral-900)' }}>
            {formatBRL(revenueData.mtd.actual)}
          </div>
          <div className="flex items-center" style={{ gap: 4, marginTop: 8 }}>
            {mtdPct >= 0 ? (
              <TrendingUp size={16} strokeWidth={1.5} style={{ color: 'var(--success)' }} className="animate-pulse-soft" />
            ) : (
              <TrendingDown size={16} strokeWidth={1.5} style={{ color: 'var(--danger)' }} />
            )}
            <Badge variant={mtdPct >= 0 ? 'success' : 'danger'}>
              {formatPercent(mtdPct)} vs meta
            </Badge>
          </div>
        </div>

        {/* YTD */}
        <div style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--neutral-50)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-500)', marginBottom: 4 }}>
            Receita YTD
          </div>
          <div className="font-mono" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1, color: 'var(--neutral-900)' }}>
            {formatBRL(revenueData.ytd.actual)}
          </div>
          <div className="flex items-center" style={{ gap: 4, marginTop: 8 }}>
            {ytdPct >= 0 ? (
              <TrendingUp size={16} strokeWidth={1.5} style={{ color: 'var(--success)' }} className="animate-pulse-soft" />
            ) : (
              <TrendingDown size={16} strokeWidth={1.5} style={{ color: 'var(--danger)' }} />
            )}
            <Badge variant={ytdPct >= 0 ? 'success' : 'danger'}>
              {formatPercent(ytdPct)} vs meta
            </Badge>
          </div>
        </div>

        {/* Average */}
        <div style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--neutral-50)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-500)', marginBottom: 4 }}>
            Média Mensal
          </div>
          <div className="font-mono" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: 'var(--neutral-900)' }}>
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
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B6E4F" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0B6E4F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridStyle} />
            <XAxis
              dataKey="day"
              tick={axisTickStyle}
              axisLine={{ stroke: 'var(--neutral-200)' }}
              tickLine={false}
            />
            <YAxis
              tick={axisValueTickStyle}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value?: number) => [formatBRL(value ?? 0), 'Receita']}
            />
            <ReferenceLine
              y={revenueData.mtd.goal / 22}
              stroke="var(--accent-warm)"
              strokeDasharray="4 4"
              label={{
                value: 'Meta/dia',
                position: 'right',
                fill: 'var(--accent-warm)',
                fontSize: 10,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0B6E4F"
              strokeWidth={2}
              fill="url(#revenueGradient)"
              animationDuration={600}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
