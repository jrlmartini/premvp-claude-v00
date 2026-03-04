import { Grid3X3 } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { rfmData } from '../../data/mockData'

interface RfmHeatmapCardProps {
  delay?: number
}

// Design system heatmap gradient: #EEF2F5 → #62B6CB → #1B4965 → #0B6E4F → #084C37
function getCellColor(value: number, max: number): string {
  const ratio = value / max
  if (ratio < 0.2) return '#EEF2F5'
  if (ratio < 0.4) return '#62B6CB'
  if (ratio < 0.6) return '#1B4965'
  if (ratio < 0.8) return '#0B6E4F'
  return '#084C37'
}

function getTextColor(value: number, max: number): string {
  const ratio = value / max
  return ratio >= 0.2 ? 'white' : 'var(--neutral-700)'
}

export function RfmHeatmapCard({ delay = 0 }: RfmHeatmapCardProps) {
  const allValues = rfmData.matrix.flat()
  const maxValue = Math.max(...allValues)

  return (
    <Card className="col-span-2 md:col-span-2 sm:col-span-1" delay={delay}>
      <CardHeader
        icon={Grid3X3}
        title="Análise RFM"
        subtitle="Recência x Frequência x Monetário"
        iconColor="var(--secondary)"
      />

      <div className="flex flex-col lg:flex-row" style={{ gap: 24 }}>
        {/* Heatmap */}
        <div className="flex-1 min-w-0">
          {/* Column axis label */}
          <div className="flex items-end" style={{ marginBottom: 8 }}>
            <div style={{ width: 64 }} />
            <div
              className="flex-1 text-center"
              style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-500)' }}
            >
              Recência →
            </div>
          </div>

          {/* Column labels */}
          <div className="flex items-center" style={{ marginBottom: 4 }}>
            <div style={{ width: 64 }} />
            <div className="flex-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3 }}>
              {rfmData.recencyLabels.map((label) => (
                <div
                  key={label}
                  className="text-center truncate"
                  style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-500)' }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Matrix rows */}
          <div className="flex">
            {/* Row labels */}
            <div style={{ width: 64, display: 'flex', flexDirection: 'column', gap: 3, paddingRight: 8 }}>
              {rfmData.frequencyLabels.map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-end"
                  style={{
                    minHeight: 48,
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: 'var(--neutral-500)',
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex-1" style={{ display: 'grid', gridTemplateRows: 'repeat(5, 1fr)', gap: 3 }}>
              {rfmData.matrix.map((row, rowIdx) => (
                <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3 }}>
                  {row.map((value, colIdx) => (
                    <div
                      key={colIdx}
                      className="flex items-center justify-center cursor-default"
                      style={{
                        minHeight: 48,
                        borderRadius: 6,
                        backgroundColor: getCellColor(value, maxValue),
                        color: getTextColor(value, maxValue),
                        fontSize: 13,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        transition: 'transform 0.2s ease',
                      }}
                      title={`R${colIdx + 1} × F${5 - rowIdx}: ${value} clientes`}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Y-axis label */}
          <div className="flex items-center" style={{ marginTop: 4 }}>
            <div
              style={{
                width: 64,
                textAlign: 'right',
                paddingRight: 8,
                fontSize: 12,
                fontWeight: 500,
                lineHeight: 1.4,
                color: 'var(--neutral-500)',
              }}
            >
              ↑ Freq.
            </div>
          </div>
        </div>

        {/* Segment Summary */}
        <div style={{ width: 192, flexShrink: 0 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              lineHeight: 1.4,
              color: 'var(--neutral-900)',
              marginBottom: 12,
            }}
          >
            Segmentos
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: 'var(--neutral-50)',
                    transition: 'background-color 0.15s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--neutral-100)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--neutral-50)' }}
                >
                  <div className="flex items-center" style={{ gap: 8, marginBottom: 4 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: colors[key],
                      }}
                    />
                    <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--neutral-900)' }}>
                      {segment.label}
                    </span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: 12, fontWeight: 500, color: 'var(--neutral-500)' }}>
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
      </div>

      {/* Legend */}
      <div
        className="flex items-center"
        style={{
          gap: 8,
          marginTop: 16,
          paddingTop: 12,
          borderTop: '1px solid var(--neutral-200)',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--neutral-500)' }}>Menor</span>
        <div className="flex" style={{ gap: 2 }}>
          {['#EEF2F5', '#62B6CB', '#1B4965', '#0B6E4F', '#084C37'].map((color) => (
            <div
              key={color}
              style={{
                width: 24,
                height: 12,
                borderRadius: 3,
                backgroundColor: color,
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--neutral-500)' }}>Maior</span>
      </div>
    </Card>
  )
}
