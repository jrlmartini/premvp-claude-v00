import { useState, useEffect, useCallback } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { RevenueCard } from './components/cards/RevenueCard'
import { TopCustomersCard } from './components/cards/TopCustomersCard'
import { CashPositionCard } from './components/cards/CashPositionCard'
import { CashflowCard } from './components/cards/CashflowCard'
import { EbitdaCard } from './components/cards/EbitdaCard'
import { RfmHeatmapCard } from './components/cards/RfmHeatmapCard'
import { ContractsCard } from './components/cards/ContractsCard'
import { WaterTreatmentCard } from './components/cards/WaterTreatmentCard'
import { ArAgingCard } from './components/cards/ArAgingCard'
import { ButtonShowcaseCard } from './components/cards/ButtonShowcaseCard'

// Responsive breakpoints per design system:
// xl ≥1440px — Full grid, sidebar expanded
// lg ≥1024px — Sidebar collapsed
// md ≥768px  — 2-column grid, sidebar hidden (mobile drawer)
// sm <768px  — Single column, sidebar hidden (mobile drawer)

function useBreakpoint() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (width >= 1440) return 'xl' as const
  if (width >= 1024) return 'lg' as const
  if (width >= 768) return 'md' as const
  return 'sm' as const
}

function App() {
  const bp = useBreakpoint()
  const isMobile = bp === 'sm' || bp === 'md'

  const [userCollapsed, setUserCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isKioskMode, setIsKioskMode] = useState(false)

  useEffect(() => {
    const syncFullscreenState = () => {
      setIsKioskMode(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', syncFullscreenState)
    return () => document.removeEventListener('fullscreenchange', syncFullscreenState)
  }, [])

  const handleToggleKioskMode = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error('Não foi possível alternar o modo kiosk.', error)
    }
  }, [])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        void handleToggleKioskMode()
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [handleToggleKioskMode])

  // lg: auto-collapse, md/sm: hidden
  const collapsed = isMobile || bp === 'lg' || userCollapsed
  const sidebarWidth = isMobile || isKioskMode ? 0 : (collapsed ? 72 : 260)

  const handleToggle = useCallback(() => {
    if (isMobile || isKioskMode) {
      setMobileOpen((p) => !p)
    } else {
      setUserCollapsed((p) => !p)
    }
  }, [isMobile, isKioskMode])

  // Grid columns: xl/lg=4, md=2, sm=1
  const cols = bp === 'sm' ? 1 : bp === 'md' ? 2 : 4
  const span2 = cols >= 2 ? 'span 2' : 'span 1'

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-main)' }}>
      {!isKioskMode && (
        <Sidebar
          collapsed={isMobile ? false : collapsed}
          onToggle={handleToggle}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
      )}

      <div style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.3s ease' }}>
        <Header
          onMenuToggle={handleToggle}
          isKioskMode={isKioskMode}
          onToggleKioskMode={() => void handleToggleKioskMode()}
        />

        <main style={{ padding: 24 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 24,
              maxWidth: isKioskMode ? '100%' : 1440,
              margin: '0 auto',
            }}
          >
            {/* Revenue (2 cols) + Cash Position + Cashflow */}
            <div style={{ gridColumn: span2 }}><RevenueCard delay={0} /></div>
            <CashPositionCard delay={80} />
            <CashflowCard delay={160} />

            {/* EBITDA (2 cols) + Contracts + Water Treatment */}
            <div style={{ gridColumn: span2 }}><EbitdaCard delay={240} /></div>
            <ContractsCard delay={320} />
            <WaterTreatmentCard delay={400} />
            <ButtonShowcaseCard delay={440} />

            {/* Top Customers (2 cols) + RFM (2 cols) */}
            <div style={{ gridColumn: span2 }}><TopCustomersCard delay={480} /></div>
            <div style={{ gridColumn: span2 }}><RfmHeatmapCard delay={560} /></div>

            {/* AR Aging (full width) */}
            <div style={{ gridColumn: `span ${cols}` }}><ArAgingCard delay={640} /></div>
          </div>
        </main>

        {!isKioskMode && (
          <footer
            className="text-center"
            style={{ padding: '16px 20px', borderTop: '0.5px solid var(--str-default)' }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: 'var(--txt-secondary)' }}>
              Conatus Environmental Technologies &copy; {new Date().getFullYear()} — Painel Executivo v1.0
            </span>
          </footer>
        )}
      </div>
    </div>
  )
}

export default App
