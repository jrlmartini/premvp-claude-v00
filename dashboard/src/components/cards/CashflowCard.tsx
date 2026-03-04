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
import { formatCompactBRL, formatCompactNumber } from '../../lib/utils'
import { tooltipProps, axisTickStyle, axisValueTickStyle } from '../../lib/chartStyles'

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
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 12, marginBottom: 16 }}>
        <div className="kpi-tile" style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)', marginBottom: 4 }}>
            Geração MTD
          </div>
          <div className="flex items-center" style={{ color: 'var(--st-success)', gap: 4, minWidth: 0 }}>
            <ArrowUpRight size={16} strokeWidth={1.5} className="kpi-icon" />
            <span className="font-mono kpi-value" style={{ color: 'var(--st-success)' }}>
              {formatCompactBRL(operationalCashflow.mtd.net)}
            </span>
          </div>
        </div>
        <div className="kpi-tile" style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)', marginBottom: 4 }}>
            Geração YTD
          </div>
          <div className="flex items-center" style={{ color: 'var(--st-success)', gap: 4, minWidth: 0 }}>
            <ArrowUpRight size={16} strokeWidth={1.5} className="kpi-icon" />
            <span className="font-mono kpi-value" style={{ color: 'var(--st-success)' }}>
              {formatCompactBRL(operationalCashflow.ytd.net)}
            </span>
          </div>
        </div>
      </div>

      {/* Inflow / Outflow detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 12, marginBottom: 16 }}>
        <div className="flex items-center justify-between" style={{ gap: 8, minWidth: 0 }}>
          <div className="flex items-center" style={{ gap: 8, minWidth: 0 }}>
            <ArrowUpRight size={16} strokeWidth={1.5} className="kpi-icon" style={{ color: 'var(--st-success)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--txt-secondary)' }}>Entradas:</span>
          </div>
          <span className="font-mono kpi-inline" style={{ color: 'var(--txt-main)', marginLeft: 'auto' }}>
            {formatCompactBRL(operationalCashflow.mtd.inflow)}
          </span>
        </div>
        <div className="flex items-center justify-between" style={{ gap: 8, minWidth: 0 }}>
          <div className="flex items-center" style={{ gap: 8, minWidth: 0 }}>
            <ArrowDownRight size={16} strokeWidth={1.5} className="kpi-icon" style={{ color: 'var(--st-danger)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--txt-secondary)' }}>Saídas:</span>
          </div>
          <span className="font-mono kpi-inline" style={{ color: 'var(--txt-main)', marginLeft: 'auto' }}>
            {formatCompactBRL(operationalCashflow.mtd.outflow)}
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
              tickFormatter={(v: number) => formatCompactNumber(v)}
            />
            <Tooltip
              {...tooltipProps}
              formatter={(value?: number, name?: string) => [
                formatCompactBRL(value ?? 0),
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
