import { Grid3X3 } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { rfmData } from '../../data/mockData'

interface RfmHeatmapCardProps {
  delay?: number
}

function getCellColor(value: number, max: number): string {
  const ratio = value / max
  if (ratio < 0.15) return '#EEF2F5'
  if (ratio < 0.3) return '#B8DDE8'
  if (ratio < 0.5) return '#62B6CB'
  if (ratio < 0.7) return '#2D6A8F'
  if (ratio < 0.85) return '#1B4965'
  return '#0B6E4F'
}

function getTextColor(value: number, max: number): string {
  const ratio = value / max
  return ratio >= 0.3 ? 'white' : 'var(--neutral-700)'
}

export function RfmHeatmapCard({ delay = 0 }: RfmHeatmapCardProps) {
  const allValues = rfmData.matrix.flat()
  const maxValue = Math.max(...allValues)

  return (
    <Card className="col-span-2" delay={delay}>
      <CardHeader
        icon={Grid3X3}
        title="Análise RFM"
        subtitle="Recência × Frequência × Monetário"
        iconColor="var(--secondary)"
      />

      <div className="flex gap-6">
        {/* Heatmap */}
        <div className="flex-1">
          <div className="flex items-end mb-2">
            <div className="w-16" />
            <div className="flex-1 text-center text-xs font-medium" style={{ color: 'var(--neutral-500)' }}>
              Recência →
            </div>
          </div>

          {/* Column labels */}
          <div className="flex items-center mb-1">
            <div className="w-16" />
            <div className="flex-1 grid grid-cols-5 gap-1">
              {rfmData.recencyLabels.map((label) => (
                <div
                  key={label}
                  className="text-center text-[10px] font-medium truncate"
                  style={{ color: 'var(--neutral-500)' }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Matrix rows */}
          <div className="flex">
            {/* Row labels */}
            <div className="w-16 flex flex-col gap-1 pr-2">
              {rfmData.frequencyLabels.map((label) => (
                <div
                  key={label}
                  className="h-12 flex items-center justify-end text-[10px] font-medium"
                  style={{ color: 'var(--neutral-500)' }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex-1 grid grid-rows-5 gap-1">
              {rfmData.matrix.map((row, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-5 gap-1">
                  {row.map((value, colIdx) => (
                    <div
                      key={colIdx}
                      className="h-12 rounded-md flex items-center justify-center text-xs font-medium transition-all duration-200 hover:scale-105 cursor-default"
                      style={{
                        backgroundColor: getCellColor(value, maxValue),
                        color: getTextColor(value, maxValue),
                      }}
                      title={`R${colIdx + 1} × F${5 - rowIdx}: ${value} clientes`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Y-axis label */}
          <div className="flex items-center mt-1">
            <div className="w-16 text-right pr-2 text-xs font-medium" style={{ color: 'var(--neutral-500)' }}>
              ↑ Freq.
            </div>
          </div>
        </div>

        {/* Segment Summary */}
        <div className="w-48 space-y-2">
          <div className="text-xs font-semibold mb-3" style={{ color: 'var(--neutral-900)' }}>
            Segmentos
          </div>
          {Object.entries(rfmData.segments).map(([key, segment]) => {
            const colors: Record<string, string> = {
              champions: 'var(--primary)',
              loyal: 'var(--primary-light)',
              atRisk: 'var(--warning)',
              lost: 'var(--danger)',
              newCustomers: 'var(--info)',
            }
            return (
              <div
                key={key}
                className="p-2.5 rounded-lg transition-colors duration-150 hover:bg-[var(--neutral-100)]"
                style={{ backgroundColor: 'var(--neutral-50)' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: colors[key] }}
                  />
                  <span className="text-xs font-medium" style={{ color: 'var(--neutral-900)' }}>
                    {segment.label}
                  </span>
                </div>
                <div className="flex justify-between text-[11px]" style={{ color: 'var(--neutral-500)' }}>
                  <span>{segment.count} clientes</span>
                  <span className="font-mono">
                    {(segment.revenue / 1_000_000).toFixed(1)}M
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 pt-3" style={{ borderTop: '1px solid var(--neutral-200)' }}>
        <span className="text-[10px]" style={{ color: 'var(--neutral-500)' }}>Menor</span>
        <div className="flex gap-0.5">
          {['#EEF2F5', '#B8DDE8', '#62B6CB', '#2D6A8F', '#1B4965', '#0B6E4F'].map((color) => (
            <div
              key={color}
              className="w-6 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-[10px]" style={{ color: 'var(--neutral-500)' }}>Maior</span>
      </div>
    </Card>
  )
}
