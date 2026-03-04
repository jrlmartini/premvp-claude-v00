import { Bell, Search, User, Calendar } from 'lucide-react'

export function Header() {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header
      className="h-16 flex items-center justify-between px-6 bg-white"
      style={{
        borderBottom: '1px solid var(--neutral-200)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <div>
        <h1
          className="text-xl font-bold"
          style={{ color: 'var(--neutral-900)' }}
        >
          Painel Executivo
        </h1>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Calendar size={12} style={{ color: 'var(--neutral-500)' }} />
          <span className="text-xs capitalize" style={{ color: 'var(--neutral-500)' }}>
            {formattedDate}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{
            backgroundColor: 'var(--neutral-100)',
            border: '1px solid var(--neutral-200)',
          }}
        >
          <Search size={14} style={{ color: 'var(--neutral-500)' }} />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent border-none outline-none text-sm w-48"
            style={{ color: 'var(--neutral-700)' }}
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={20} style={{ color: 'var(--neutral-500)' }} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--danger)' }}
          />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
          >
            <User size={16} />
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium" style={{ color: 'var(--neutral-900)' }}>
              Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
