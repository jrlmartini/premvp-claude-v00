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

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--neutral-50)' }}>
      <Sidebar />

      {/* Main content area */}
      <div className="ml-[260px] transition-all duration-300">
        <Header />

        <main className="p-5">
          {/* Dashboard Grid */}
          <div className="grid grid-cols-4 gap-5 max-w-[1440px] mx-auto">
            {/* Row 1: Revenue (2 cols) + Cash Position + Cashflow */}
            <RevenueCard delay={0} />
            <CashPositionCard delay={80} />
            <CashflowCard delay={160} />

            {/* Row 2: EBITDA (2 cols) + Contracts + Water Treatment */}
            <EbitdaCard delay={240} />
            <ContractsCard delay={320} />
            <WaterTreatmentCard delay={400} />

            {/* Row 3: Top Customers (2 cols) + RFM Heatmap (2 cols) */}
            <TopCustomersCard delay={480} />
            <RfmHeatmapCard delay={560} />

            {/* Row 4: AR Aging (full width via single card spanning) */}
            <div className="col-span-4">
              <ArAgingCard delay={640} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-5 py-4 text-center" style={{ borderTop: '1px solid var(--neutral-200)' }}>
          <span className="text-xs" style={{ color: 'var(--neutral-500)' }}>
            Conatus Environmental Technologies &copy; {new Date().getFullYear()} — Painel Executivo v1.0
          </span>
        </footer>
      </div>
    </div>
  )
}

export default App
