import { Grid3X3 } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { rfmData } from '../../data/mockData'
import { formatCompactBRL } from '../../lib/utils'

interface RfmHeatmapCardProps {
  delay?: number
}

// Heatmap follows canonical dashboard chart tokens from lower to higher intensity
function getCellColor(value: number, max: number): string {
  const ratio = value / max
  if (ratio < 0.2) return 'var(--chart-other)'
  if (ratio < 0.4) return 'var(--chart-3)'
  if (ratio < 0.6) return 'var(--chart-2)'
  if (ratio < 0.8) return 'var(--chart-1)'
  return 'var(--chart-4)'
}

function getTextColor(value: number, max: number): string {
  const ratio = value / max
  return ratio < 0.4 ? 'var(--txt-modal)' : 'var(--txt-main)'
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
        iconColor="var(--chart-2)"
      />

      <div className="flex flex-col lg:flex-row" style={{ gap: 24 }}>
        {/* Heatmap */}
        <div className="flex-1 min-w-0">
          {/* Column axis label */}
          <div className="flex items-end" style={{ marginBottom: 8 }}>
            <div style={{ width: 64 }} />
            <div
              className="flex-1 text-center"
              style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)' }}
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
                  style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)' }}
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
                    color: 'var(--txt-secondary)',
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
                        borderRadius: 8,
                        backgroundColor: getCellColor(value, maxValue),
                        color: getTextColor(value, maxValue),
                        fontSize: 13,
                        fontWeight: 400,
                        lineHeight: 1.5,
                        border: '0.5px solid var(--str-default)',
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
          <div className="flex items-center" style={{ marginTop: 4 }}>
            <div
              style={{
                width: 64,
                textAlign: 'right',
                paddingRight: 8,
                fontSize: 12,
                fontWeight: 500,
                lineHeight: 1.4,
                color: 'var(--txt-secondary)',
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
              color: 'var(--txt-main)',
              marginBottom: 12,
            }}
          >
            Segmentos
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(rfmData.segments).map(([key, segment]) => {
              const colors: Record<string, string> = {
                champions: 'var(--chart-1)',
                loyal: 'var(--chart-2)',
                atRisk: 'var(--st-warning)',
                lost: 'var(--st-danger)',
                newCustomers: 'var(--chart-3)',
              }
              return (
                <div
                  key={key}
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    backgroundColor: 'var(--bg-main)',
                    transition: 'background-color 0.15s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-main)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-main)' }}
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
                    <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-main)' }}>
                      {segment.label}
                    </span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: 12, fontWeight: 500, color: 'var(--txt-secondary)' }}>
                    <span>{segment.count} clientes</span>
                    <span className="font-mono">
                      {formatCompactBRL(segment.revenue)}
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
          borderTop: '0.5px solid var(--str-default)',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--txt-secondary)' }}>Menor</span>
        <div className="flex" style={{ gap: 2 }}>
          {['var(--chart-other)', 'var(--chart-3)', 'var(--chart-2)', 'var(--chart-1)', 'var(--chart-4)'].map((color) => (
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
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--txt-secondary)' }}>Maior</span>
      </div>
    </Card>
  )
}
