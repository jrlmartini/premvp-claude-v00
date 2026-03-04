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

      <div className="space-y-3">
        {/* Active contracts */}
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center gap-2">
            <FileCheck size={16} style={{ color: 'var(--primary)' }} />
            <span className="text-sm" style={{ color: 'var(--neutral-700)' }}>Ativos</span>
          </div>
          <span className="font-mono text-lg font-bold" style={{ color: 'var(--neutral-900)' }}>
            {contractsData.active}
          </span>
        </div>

        {/* Expiring soon */}
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FFF3E0' }}>
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} style={{ color: 'var(--warning)' }} />
            <span className="text-sm" style={{ color: 'var(--neutral-700)' }}>Vencendo em 30 dias</span>
          </div>
          <Badge variant="warning">{contractsData.expiringSoon}</Badge>
        </div>

        {/* New */}
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center gap-2">
            <Plus size={16} style={{ color: 'var(--success)' }} />
            <span className="text-sm" style={{ color: 'var(--neutral-700)' }}>Novos este mês</span>
          </div>
          <Badge variant="success">{contractsData.newThisMonth}</Badge>
        </div>

        {/* Renewal rate */}
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="flex items-center gap-2">
            <RefreshCw size={16} style={{ color: 'var(--info)' }} />
            <span className="text-sm" style={{ color: 'var(--neutral-700)' }}>Taxa de Renovação</span>
          </div>
          <span className="font-mono font-bold" style={{ color: 'var(--primary)' }}>
            {formatPercent(contractsData.renewalRate)}
          </span>
        </div>

        {/* Churn */}
        <div className="pt-2" style={{ borderTop: '1px solid var(--neutral-200)' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--neutral-500)' }}>Churn Rate</span>
            <span className="font-mono text-sm font-medium" style={{ color: 'var(--danger)' }}>
              {formatPercent(contractsData.churnRate)}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full mt-2" style={{ backgroundColor: 'var(--neutral-200)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${contractsData.churnRate * 10}%`,
                backgroundColor: 'var(--danger)',
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
