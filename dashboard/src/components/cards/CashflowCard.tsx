import { ArrowDownUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Card, CardHeader } from '../ui/Card'
import { operationalCashflow } from '../../data/mockData'
import { formatBRL } from '../../lib/utils'
import { tooltipStyle, axisTickStyle, axisValueTickStyle } from '../../lib/chartStyles'

interface CashflowCardProps {
  delay?: number
}

export function CashflowCard({ delay = 0 }: CashflowCardProps) {
  return (
    <Card delay={delay}>
      <CardHeader
        icon={ArrowDownUp}
        title="Fluxo de Caixa Operacional"
        subtitle="MTD e YTD"
        iconColor="var(--chart-3)"
      />

      {/* KPIs */}
      <div className="grid grid-cols-2" style={{ gap: 12, marginBottom: 16 }}>
        <div style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)', marginBottom: 4 }}>
            Geração MTD
          </div>
          <div className="font-mono flex items-center" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: 'var(--st-success)', gap: 4 }}>
            <ArrowUpRight size={16} strokeWidth={1.5} />
            {formatBRL(operationalCashflow.mtd.net)}
          </div>
        </div>
        <div style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)', marginBottom: 4 }}>
            Geração YTD
          </div>
          <div className="font-mono flex items-center" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: 'var(--st-success)', gap: 4 }}>
            <ArrowUpRight size={16} strokeWidth={1.5} />
            {formatBRL(operationalCashflow.ytd.net)}
          </div>
        </div>
      </div>

      {/* Inflow / Outflow detail */}
      <div className="grid grid-cols-2" style={{ gap: 12, marginBottom: 16 }}>
        <div className="flex items-center" style={{ gap: 8 }}>
          <ArrowUpRight size={16} strokeWidth={1.5} style={{ color: 'var(--st-success)' }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--txt-secondary)' }}>Entradas:</span>
          <span className="font-mono" style={{ fontSize: 13, fontWeight: 500, color: 'var(--txt-main)' }}>
            {formatBRL(operationalCashflow.mtd.inflow)}
          </span>
        </div>
        <div className="flex items-center" style={{ gap: 8 }}>
          <ArrowDownRight size={16} strokeWidth={1.5} style={{ color: 'var(--st-danger)' }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--txt-secondary)' }}>Saídas:</span>
          <span className="font-mono" style={{ fontSize: 13, fontWeight: 500, color: 'var(--txt-main)' }}>
            {formatBRL(operationalCashflow.mtd.outflow)}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={operationalCashflow.monthly}>
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
              tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value?: number, name?: string) => [
                formatBRL(value ?? 0),
                name === 'inflow' ? 'Entradas' : name === 'outflow' ? 'Saídas' : 'Líquido',
              ]}
            />
            <Legend
              formatter={(value: string) =>
                value === 'inflow' ? 'Entradas' : value === 'outflow' ? 'Saídas' : 'Líquido'
              }
              wrapperStyle={{ fontSize: 11 }}
            />
            <Bar dataKey="inflow" fill="var(--chart-4)" radius={[4, 4, 0, 0]} animationDuration={600} animationEasing="ease-in-out" />
            <Bar dataKey="outflow" fill="var(--chart-7)" radius={[4, 4, 0, 0]} animationDuration={600} animationEasing="ease-in-out" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
