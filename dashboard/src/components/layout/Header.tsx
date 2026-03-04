import { Bell, Search, User, Calendar, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const formattedDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header
      className="flex items-center justify-between"
      style={{ height: 64, padding: '0 24px', borderBottom: '0.5px solid var(--str-default)', backgroundColor: 'var(--bg-main)' }}
    >
      <div className="flex items-center" style={{ gap: 16 }}>
        <button
          onClick={onMenuToggle}
          className="md:hidden flex items-center justify-center"
          style={{ width: 44, height: 44, borderRadius: 8, border: '0.5px solid var(--str-default)', background: 'var(--bg-card)', cursor: 'pointer' }}
          aria-label="Abrir menu"
        >
          <Menu size={24} strokeWidth={1.5} style={{ color: 'var(--txt-main)' }} />
        </button>

        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: 'var(--txt-main)', margin: 0 }}>Painel executivo</h1>
          <div className="flex items-center" style={{ gap: 6, marginTop: 2 }}>
            <Calendar size={12} strokeWidth={1.5} style={{ color: 'var(--txt-secondary)' }} />
            <span className="capitalize" style={{ fontSize: 12, fontWeight: 400, color: 'var(--txt-secondary)' }}>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center" style={{ gap: 16 }}>
        <div className="hidden sm:flex items-center" style={{ gap: 8, padding: '6px 12px', borderRadius: 8, border: '0.5px solid var(--str-default)', backgroundColor: 'var(--bg-card)' }}>
          <Search size={16} strokeWidth={1.5} style={{ color: 'var(--txt-secondary)' }} />
          <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none" style={{ fontSize: 14, color: 'var(--txt-main)', width: 192 }} />
        </div>

        <button
          className="relative flex items-center justify-center"
          style={{ width: 44, height: 44, borderRadius: 8, border: '0.5px solid var(--str-default)', backgroundColor: 'var(--bg-card)', cursor: 'pointer' }}
          aria-label="Notificações"
        >
          <Bell size={20} strokeWidth={1.5} style={{ color: 'var(--txt-secondary)' }} />
          <span className="absolute" style={{ top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--st-danger)' }} />
        </button>

        <div className="flex items-center" style={{ gap: 8 }}>
          <div className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--bg-button)', color: 'var(--txt-main)' }}>
            <User size={16} strokeWidth={1.5} />
          </div>
          <div className="hidden md:block" style={{ fontSize: 14, fontWeight: 500, color: 'var(--txt-main)' }}>Admin</div>
        </div>
      </div>
    </header>
  )
}
