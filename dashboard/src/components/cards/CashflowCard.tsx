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
        iconColor="var(--accent)"
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="text-xs mb-1" style={{ color: 'var(--neutral-500)' }}>Geração MTD</div>
          <div className="font-mono text-base font-bold flex items-center gap-1" style={{ color: 'var(--success)' }}>
            <ArrowUpRight size={14} />
            {formatBRL(operationalCashflow.mtd.net)}
          </div>
        </div>
        <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="text-xs mb-1" style={{ color: 'var(--neutral-500)' }}>Geração YTD</div>
          <div className="font-mono text-base font-bold flex items-center gap-1" style={{ color: 'var(--success)' }}>
            <ArrowUpRight size={14} />
            {formatBRL(operationalCashflow.ytd.net)}
          </div>
        </div>
      </div>

      {/* Inflow / Outflow detail */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs">
          <ArrowUpRight size={12} style={{ color: 'var(--success)' }} />
          <span style={{ color: 'var(--neutral-500)' }}>Entradas MTD:</span>
          <span className="font-mono font-medium" style={{ color: 'var(--neutral-700)' }}>
            {formatBRL(operationalCashflow.mtd.inflow)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <ArrowDownRight size={12} style={{ color: 'var(--danger)' }} />
          <span style={{ color: 'var(--neutral-500)' }}>Saídas MTD:</span>
          <span className="font-mono font-medium" style={{ color: 'var(--neutral-700)' }}>
            {formatBRL(operationalCashflow.mtd.outflow)}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={operationalCashflow.monthly}>
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
            <Bar dataKey="inflow" fill="#14A676" radius={[4, 4, 0, 0]} animationDuration={600} />
            <Bar dataKey="outflow" fill="#E63946" radius={[4, 4, 0, 0]} animationDuration={600} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
