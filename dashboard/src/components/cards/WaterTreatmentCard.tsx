import { Droplets, Activity, Cpu, AlertCircle } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { waterTreatmentMetrics } from '../../data/mockData'
import { formatNumber, formatPercent } from '../../lib/utils'

interface WaterTreatmentCardProps {
  delay?: number
}

export function WaterTreatmentCard({ delay = 0 }: WaterTreatmentCardProps) {
  return (
    <Card delay={delay}>
      <CardHeader
        icon={Droplets}
        title="Tratamento de Água"
        subtitle="IoT — Métricas operacionais"
        iconColor="var(--accent)"
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Droplets size={12} style={{ color: 'var(--accent)' }} />
            <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Volume (m³)</span>
          </div>
          <div className="font-mono text-base font-bold" style={{ color: 'var(--neutral-900)' }}>
            {formatNumber(waterTreatmentMetrics.volumeProcessed)}
          </div>
        </div>

        <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Activity size={12} style={{ color: 'var(--success)' }} />
            <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Eficiência</span>
          </div>
          <div className="font-mono text-base font-bold" style={{ color: 'var(--success)' }}>
            {formatPercent(waterTreatmentMetrics.efficiency)}
          </div>
        </div>

        <div className="p-2.5 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Cpu size={12} style={{ color: 'var(--secondary)' }} />
            <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Unidades IoT</span>
          </div>
          <div className="font-mono text-base font-bold" style={{ color: 'var(--neutral-900)' }}>
            {waterTreatmentMetrics.activeUnits}
          </div>
        </div>

        <div className="p-2.5 rounded-lg" style={{ backgroundColor: waterTreatmentMetrics.alerts > 0 ? '#FFEBEE' : 'var(--neutral-50)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <AlertCircle size={12} style={{ color: waterTreatmentMetrics.alerts > 0 ? 'var(--danger)' : 'var(--neutral-500)' }} />
            <span className="text-[11px]" style={{ color: 'var(--neutral-500)' }}>Alertas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-base font-bold" style={{ color: waterTreatmentMetrics.alerts > 0 ? 'var(--danger)' : 'var(--neutral-900)' }}>
              {waterTreatmentMetrics.alerts}
            </span>
            {waterTreatmentMetrics.alerts > 0 && (
              <Badge variant="danger">Atenção</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Volume trend */}
      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={waterTreatmentMetrics.monthlyVolume}>
            <defs>
              <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#62B6CB" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#62B6CB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: 'var(--neutral-500)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid var(--neutral-200)',
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontFamily: 'JetBrains Mono',
                fontSize: 12,
              }}
              formatter={(value?: number) => [`${formatNumber(value ?? 0)} m³`, 'Volume']}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#62B6CB"
              strokeWidth={2}
              fill="url(#waterGradient)"
              animationDuration={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
