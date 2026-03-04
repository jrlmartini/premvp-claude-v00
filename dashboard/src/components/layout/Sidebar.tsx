import { useState } from 'react'
import {
  LayoutDashboard,
  DollarSign,
  Users,
  Droplets,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from 'lucide-react'

interface NavItem {
  icon: React.ElementType
  label: string
  active?: boolean
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Painel Executivo', active: true },
  { icon: DollarSign, label: 'Financeiro' },
  { icon: Users, label: 'Clientes' },
  { icon: Droplets, label: 'Operações' },
  { icon: BarChart3, label: 'Análises' },
  { icon: FileText, label: 'Relatórios' },
  { icon: Settings, label: 'Configurações' },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-50 transition-all duration-300"
      style={{
        width: collapsed ? 72 : 260,
        backgroundColor: 'var(--secondary-dark)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <Leaf size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div className="animate-slide-in-right">
            <div className="text-white font-semibold text-sm leading-tight">Conatus</div>
            <div className="text-white/50 text-xs leading-tight">Environmental Tech</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative"
            style={{
              backgroundColor: item.active ? 'var(--primary)' : 'transparent',
              borderLeft: item.active ? '4px solid white' : '4px solid transparent',
            }}
            title={collapsed ? item.label : undefined}
          >
            <item.icon
              size={20}
              className="flex-shrink-0"
              style={{
                color: 'white',
                opacity: item.active ? 1 : 0.7,
              }}
            />
            {!collapsed && (
              <span
                className="text-sm animate-slide-in-right"
                style={{
                  color: 'white',
                  opacity: item.active ? 1 : 0.7,
                  fontWeight: item.active ? 500 : 400,
                }}
              >
                {item.label}
              </span>
            )}
            {!item.active && (
              <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
            )}
          </button>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-white/10 transition-colors hover:bg-white/5"
      >
        {collapsed ? (
          <ChevronRight size={18} className="text-white/60" />
        ) : (
          <ChevronLeft size={18} className="text-white/60" />
        )}
      </button>
    </aside>
  )
}
