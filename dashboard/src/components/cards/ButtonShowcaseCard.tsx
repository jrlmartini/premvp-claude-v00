import { SlidersHorizontal } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { Button } from '../ui/Button'

interface ButtonShowcaseCardProps {
  delay?: number
}

export function ButtonShowcaseCard({ delay = 0 }: ButtonShowcaseCardProps) {
  return (
    <Card delay={delay}>
      <CardHeader
        icon={SlidersHorizontal}
        title="Ações rápidas"
        subtitle="Prévia de estilos de botão"
        iconColor="var(--chart-3)"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
        <Button variant="primary">Primário</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destrutivo</Button>
      </div>
    </Card>
  )
}
