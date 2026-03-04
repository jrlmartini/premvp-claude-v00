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
import { formatCompactNumber, formatPercent } from '../../lib/utils'
import { tooltipProps, axisTickStyle } from '../../lib/chartStyles'

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
        iconColor="var(--chart-3)"
      />

      <div className="grid grid-cols-2" style={{ gap: 12, marginBottom: 16 }}>
        <div className="kpi-tile" style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
            <Droplets size={16} strokeWidth={1.5} style={{ color: 'var(--chart-3)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)' }}>Volume (m³)</span>
          </div>
          <div className="font-mono kpi-value" style={{ color: 'var(--txt-main)' }}>
            {formatCompactNumber(waterTreatmentMetrics.volumeProcessed)}
          </div>
        </div>

        <div className="kpi-tile" style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
            <Activity size={16} strokeWidth={1.5} style={{ color: 'var(--st-success)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)' }}>Eficiência</span>
          </div>
          <div className="font-mono kpi-value" style={{ color: 'var(--st-success)' }}>
            {formatPercent(waterTreatmentMetrics.efficiency)}
          </div>
        </div>

        <div className="kpi-tile" style={{ padding: 10, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
            <Cpu size={16} strokeWidth={1.5} style={{ color: 'var(--chart-2)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)' }}>Unidades IoT</span>
          </div>
          <div className="font-mono kpi-value" style={{ color: 'var(--txt-main)' }}>
            {waterTreatmentMetrics.activeUnits}
          </div>
        </div>

        <div style={{ padding: 10, borderRadius: 8, backgroundColor: waterTreatmentMetrics.alerts > 0 ? 'var(--bg-destructive)' : 'var(--bg-main)', border: waterTreatmentMetrics.alerts > 0 ? '0.5px solid var(--str-destructive)' : '0.5px solid var(--str-default)' }}>
          <div className="flex items-center" style={{ gap: 6, marginBottom: 4 }}>
            <AlertCircle size={16} strokeWidth={1.5} style={{ color: waterTreatmentMetrics.alerts > 0 ? 'var(--st-danger)' : 'var(--txt-secondary)' }} />
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: waterTreatmentMetrics.alerts > 0 ? 'var(--txt-modal)' : 'var(--txt-secondary)' }}>Alertas</span>
          </div>
          <div className="flex items-center" style={{ gap: 6 }}>
            <span className="font-mono kpi-value" style={{ color: waterTreatmentMetrics.alerts > 0 ? 'var(--txt-modal)' : 'var(--txt-main)' }}>
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
            <XAxis
              dataKey="month"
              tick={axisTickStyle}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              {...tooltipProps}
              formatter={(value?: number) => [`${formatCompactNumber(value ?? 0)} m³`, 'Volume']}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="var(--chart-3)"
              strokeWidth={2}
              fill="var(--chart-3)" fillOpacity={0.18}
              animationDuration={600}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
