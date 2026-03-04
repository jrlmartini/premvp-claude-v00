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
  { icon: LayoutDashboard, label: 'Painel executivo', active: true },
  { icon: DollarSign, label: 'Financeiro' },
  { icon: Users, label: 'Clientes' },
  { icon: Droplets, label: 'Operações' },
  { icon: BarChart3, label: 'Análises' },
  { icon: FileText, label: 'Relatórios' },
  { icon: Settings, label: 'Configurações' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const sidebarWidth = collapsed ? 72 : 260

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 z-40 md:hidden" style={{ backgroundColor: 'rgb(33 64 88 / 70%)' }} onClick={onMobileClose} />}

      <aside
        className={`fixed left-0 top-0 h-screen flex flex-col z-50 ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}` }
        style={{
          width: sidebarWidth,
          backgroundColor: 'var(--bg-card)',
          borderRight: '0.5px solid var(--str-default)',
          transition: 'width 0.3s ease, transform 0.3s ease',
        }}
      >
        <div className="flex items-center" style={{ height: 64, padding: '0 16px', gap: 12, borderBottom: '0.5px solid var(--str-default)' }}>
          <div className="flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'var(--bg-button)' }}>
            <Leaf size={20} strokeWidth={1.5} style={{ color: 'var(--txt-main)' }} />
          </div>
          {!collapsed && (
            <div>
              <div style={{ color: 'var(--txt-main)', fontWeight: 600, fontSize: 14 }}>Conatus</div>
              <div style={{ color: 'var(--txt-secondary)', fontSize: 12 }}>Environmental Tech</div>
            </div>
          )}
        </div>

        <nav className="flex-1" style={{ padding: '16px 12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center"
                style={{
                  width: '100%', gap: 12, padding: '12px', minHeight: 44, borderRadius: 8,
                  backgroundColor: 'var(--bg-card)',
                  border: item.active ? '1px solid var(--str-hover)' : '0.5px solid var(--str-default)',
                  cursor: 'pointer',
                }}
                title={collapsed ? item.label : undefined}
                aria-label={item.label}
                aria-current={item.active ? 'page' : undefined}
              >
                <item.icon size={20} strokeWidth={1.5} className="flex-shrink-0" style={{ color: item.active ? 'var(--txt-main)' : 'var(--txt-secondary)' }} />
                {!collapsed && <span style={{ color: item.active ? 'var(--txt-main)' : 'var(--txt-secondary)', fontSize: 16 }}>{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        <button
          onClick={onToggle}
          className="hidden md:flex items-center justify-center"
          style={{ height: 48, borderTop: '0.5px solid var(--str-default)', background: 'var(--bg-card)', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', cursor: 'pointer', minHeight: 44 }}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {collapsed ? <ChevronRight size={20} strokeWidth={1.5} style={{ color: 'var(--txt-secondary)' }} /> : <ChevronLeft size={20} strokeWidth={1.5} style={{ color: 'var(--txt-secondary)' }} />}
        </button>
      </aside>
    </>
  )
}
