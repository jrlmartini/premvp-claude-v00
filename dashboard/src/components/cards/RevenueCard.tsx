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

interface RevenueCardProps {
  delay?: number
}

export function RevenueCard({ delay = 0 }: RevenueCardProps) {
  const mtdPct = ((revenueData.mtd.actual / revenueData.mtd.goal) * 100) - 100
  const ytdPct = ((revenueData.ytd.actual / revenueData.ytd.goal) * 100) - 100
  const mtdVsAvg = ((revenueData.mtd.actual / revenueData.mtd.average) * 100) - 100

  return (
    <Card className="col-span-2" delay={delay}>
      <CardHeader
        icon={DollarSign}
        title="Receita"
        subtitle="MTD e YTD vs. Meta Runrate"
        iconColor="var(--primary)"
      />

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* MTD */}
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--neutral-500)' }}>
            Receita MTD
          </div>
          <div className="font-mono text-lg font-bold" style={{ color: 'var(--neutral-900)' }}>
            {formatBRL(revenueData.mtd.actual)}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {mtdPct >= 0 ? (
              <TrendingUp size={12} style={{ color: 'var(--success)' }} />
            ) : (
              <TrendingDown size={12} style={{ color: 'var(--danger)' }} />
            )}
            <Badge variant={mtdPct >= 0 ? 'success' : 'danger'}>
              {formatPercent(mtdPct)} vs meta
            </Badge>
          </div>
        </div>

        {/* YTD */}
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--neutral-500)' }}>
            Receita YTD
          </div>
          <div className="font-mono text-lg font-bold" style={{ color: 'var(--neutral-900)' }}>
            {formatBRL(revenueData.ytd.actual)}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {ytdPct >= 0 ? (
              <TrendingUp size={12} style={{ color: 'var(--success)' }} />
            ) : (
              <TrendingDown size={12} style={{ color: 'var(--danger)' }} />
            )}
            <Badge variant={ytdPct >= 0 ? 'success' : 'danger'}>
              {formatPercent(ytdPct)} vs meta
            </Badge>
          </div>
        </div>

        {/* Average */}
        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--neutral-500)' }}>
            Média Mensal
          </div>
          <div className="font-mono text-lg font-bold" style={{ color: 'var(--neutral-900)' }}>
            {formatBRL(revenueData.mtd.average)}
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Badge variant={mtdVsAvg >= 0 ? 'success' : 'warning'}>
              {formatPercent(mtdVsAvg)} vs média
            </Badge>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData.dailyMTD}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B6E4F" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0B6E4F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--neutral-200)" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: 'var(--neutral-500)' }}
              axisLine={{ stroke: 'var(--neutral-200)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--neutral-500)', fontFamily: 'JetBrains Mono' }}
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
