import { FileCheck, AlertTriangle, Plus, RefreshCw } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { contractsData } from '../../data/mockData'
import { formatPercent } from '../../lib/utils'

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
        iconColor="var(--primary-light)"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Active contracts */}
        <div className="flex items-center justify-between" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <FileCheck size={16} strokeWidth={1.5} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--neutral-700)' }}>Ativos</span>
          </div>
          <span className="font-mono" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.1, color: 'var(--neutral-900)' }}>
            {contractsData.active}
          </span>
        </div>

        {/* Expiring soon */}
        <div className="flex items-center justify-between" style={{ padding: 12, borderRadius: 8, backgroundColor: '#FFF3E0' }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <AlertTriangle size={16} strokeWidth={1.5} style={{ color: 'var(--warning)' }} />
            <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--neutral-700)' }}>Vencendo em 30 dias</span>
          </div>
          <Badge variant="warning">{contractsData.expiringSoon}</Badge>
        </div>

        {/* New */}
        <div className="flex items-center justify-between" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <Plus size={16} strokeWidth={1.5} style={{ color: 'var(--success)' }} />
            <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--neutral-700)' }}>Novos este mês</span>
          </div>
          <Badge variant="success">{contractsData.newThisMonth}</Badge>
        </div>

        {/* Renewal rate */}
        <div className="flex items-center justify-between" style={{ padding: 12, borderRadius: 8, backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <RefreshCw size={16} strokeWidth={1.5} style={{ color: 'var(--info)' }} />
            <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: 'var(--neutral-700)' }}>Taxa de Renovação</span>
          </div>
          <span className="font-mono" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2, color: 'var(--primary)' }}>
            {formatPercent(contractsData.renewalRate)}
          </span>
        </div>

        {/* Churn */}
        <div style={{ paddingTop: 8, borderTop: '1px solid var(--neutral-200)' }}>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-500)' }}>Churn Rate</span>
            <span className="font-mono" style={{ fontSize: 14, fontWeight: 500, color: 'var(--danger)' }}>
              {formatPercent(contractsData.churnRate)}
            </span>
          </div>
          <div style={{ width: '100%', height: 6, borderRadius: 3, marginTop: 8, backgroundColor: 'var(--neutral-200)' }}>
            <div
              style={{
                height: '100%',
                borderRadius: 3,
                width: `${contractsData.churnRate * 10}%`,
                backgroundColor: 'var(--danger)',
                transition: 'width 1s ease-out',
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
