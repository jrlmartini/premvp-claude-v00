import { Bell, Search, User, Calendar, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuToggle: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header
      className="flex items-center justify-between bg-white"
      style={{
        height: 64,
        padding: '0 24px',
        borderBottom: '1px solid var(--neutral-200)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-center" style={{ gap: 16 }}>
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="md:hidden flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
          aria-label="Abrir menu"
        >
          <Menu size={24} strokeWidth={1.5} style={{ color: 'var(--neutral-700)' }} />
        </button>

        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.3,
              color: 'var(--neutral-900)',
              margin: 0,
            }}
          >
            Painel Executivo
          </h1>
          <div className="flex items-center" style={{ gap: 6, marginTop: 2 }}>
            <Calendar size={12} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
            <span
              className="capitalize"
              style={{
                fontSize: 12,
                fontWeight: 500,
                lineHeight: 1.4,
                color: 'var(--neutral-500)',
              }}
            >
              {formattedDate}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center" style={{ gap: 16 }}>
        {/* Search */}
        <div
          className="hidden sm:flex items-center"
          style={{
            gap: 8,
            padding: '6px 12px',
            borderRadius: 8,
            backgroundColor: 'var(--neutral-100)',
            border: '1px solid var(--neutral-200)',
          }}
        >
          <Search size={16} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none"
            style={{
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'var(--neutral-700)',
              width: 192,
            }}
          />
        </div>

        {/* Notifications */}
        <button
          className="relative flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
          aria-label="Notificações"
        >
          <Bell size={20} strokeWidth={1.5} style={{ color: 'var(--neutral-500)' }} />
          <span
            className="absolute"
            style={{
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'var(--danger)',
            }}
          />
        </button>

        {/* User */}
        <div className="flex items-center" style={{ gap: 8 }}>
          <div
            className="flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: 'white',
            }}
          >
            <User size={16} strokeWidth={1.5} />
          </div>
          <div className="hidden md:block">
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--neutral-900)',
              }}
            >
              Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
