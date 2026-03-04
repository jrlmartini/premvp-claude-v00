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
import { tooltipStyle, axisTickStyle } from '../../lib/chartStyles'

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

      <div className="grid grid-cols-2" style={{ gap: 12, marginBottom: 16 }}>
        <div style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
            <Droplets size={16} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-500)' }}>Volume (m³)</span>
          </div>
          <div className="font-mono" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: 'var(--neutral-900)' }}>
            {formatNumber(waterTreatmentMetrics.volumeProcessed)}
          </div>
        </div>

        <div style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
            <Activity size={16} strokeWidth={1.5} style={{ color: 'var(--success)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-500)' }}>Eficiência</span>
          </div>
          <div className="font-mono" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: 'var(--success)' }}>
            {formatPercent(waterTreatmentMetrics.efficiency)}
          </div>
        </div>

        <div style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
            <Cpu size={16} strokeWidth={1.5} style={{ color: 'var(--secondary)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-500)' }}>Unidades IoT</span>
          </div>
          <div className="font-mono" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: 'var(--neutral-900)' }}>
            {waterTreatmentMetrics.activeUnits}
          </div>
        </div>

        <div style={{ padding: 10, borderRadius: 8, backgroundColor: waterTreatmentMetrics.alerts > 0 ? '#FFEBEE' : 'var(--neutral-50)' }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
            <AlertCircle size={16} strokeWidth={1.5} style={{ color: waterTreatmentMetrics.alerts > 0 ? 'var(--danger)' : 'var(--neutral-500)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-500)' }}>Alertas</span>
          </div>
          <div className="flex items-center" style={{ gap: 6 }}>
            <span className="font-mono" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: waterTreatmentMetrics.alerts > 0 ? 'var(--danger)' : 'var(--neutral-900)' }}>
              {waterTreatmentMetrics.alerts}
            </span>
            {waterTreatmentMetrics.alerts > 0 && (
              <Badge variant="danger">Atenção</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Volume trend — mini chart 48px per spec, but slightly taller for readability */}
      <div style={{ height: 80 }}>
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
              tick={axisTickStyle}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value?: number) => [`${formatNumber(value ?? 0)} m³`, 'Volume']}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#62B6CB"
              strokeWidth={2}
              fill="url(#waterGradient)"
              animationDuration={600}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
