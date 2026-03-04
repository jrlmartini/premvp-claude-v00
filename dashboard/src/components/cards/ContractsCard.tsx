import { FileCheck, AlertTriangle, Plus, RefreshCw } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { contractsData } from '../../data/mockData'
import { formatCompactNumber, formatPercent } from '../../lib/utils'

interface ContractsCardProps {
  delay?: number
}

export function ContractsCard({ delay = 0 }: ContractsCardProps) {
  return (
    <Card delay={delay}>
      <CardHeader
        icon={FileCheck}
        title="Contratos"
        subtitle="Visão geral"
        iconColor="var(--chart-2)"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Active contracts */}
        <div className="flex items-center justify-between kpi-tile" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <FileCheck size={16} strokeWidth={1.5} style={{ color: 'var(--chart-1)' }} />
            <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--txt-main)' }}>Ativos</span>
          </div>
          <span className="font-mono kpi-display" style={{ color: 'var(--txt-main)' }}>
            {formatCompactNumber(contractsData.active)}
          </span>
        </div>

        {/* Expiring soon */}
        <div className="flex items-center justify-between" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-modal)' }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <AlertTriangle size={16} strokeWidth={1.5} style={{ color: 'var(--st-warning)' }} />
            <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--txt-main)' }}>Vencendo em 30 dias</span>
          </div>
          <Badge variant="warning">{formatCompactNumber(contractsData.expiringSoon)}</Badge>
        </div>

        {/* New */}
        <div className="flex items-center justify-between kpi-tile" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <Plus size={16} strokeWidth={1.5} style={{ color: 'var(--st-success)' }} />
            <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--txt-main)' }}>Novos este mês</span>
          </div>
          <Badge variant="success">{formatCompactNumber(contractsData.newThisMonth)}</Badge>
        </div>

        {/* Renewal rate */}
        <div className="flex items-center justify-between kpi-tile" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-main)' }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <RefreshCw size={16} strokeWidth={1.5} style={{ color: 'var(--chart-3)' }} />
            <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--txt-main)' }}>Taxa de Renovação</span>
          </div>
          <span className="font-mono kpi-value" style={{ color: 'var(--chart-1)' }}>
            {formatPercent(contractsData.renewalRate)}
          </span>
        </div>

        {/* Churn */}
        <div style={{ paddingTop: 8, borderTop: '0.5px solid var(--str-default)' }}>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)' }}>Churn Rate</span>
            <span className="font-mono" style={{ fontSize: 14, fontWeight: 500, color: 'var(--st-danger)' }}>
              {formatPercent(contractsData.churnRate)}
            </span>
          </div>
          <div style={{ width: '100%', height: 6, borderRadius: 3, marginTop: 8, backgroundColor: 'var(--str-default)' }}>
            <div
              style={{
                height: '100%',
                borderRadius: 3,
                width: `${contractsData.churnRate * 10}%`,
                backgroundColor: 'var(--st-danger)',
                transition: 'width 1s ease-out',
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
