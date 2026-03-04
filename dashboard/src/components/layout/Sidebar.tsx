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
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={onMobileClose}
        />
      )}

      <aside
        className="fixed left-0 top-0 h-screen flex flex-col z-50"
        style={{
          width: sidebarWidth,
          backgroundColor: 'var(--secondary-dark)',
          transition: 'width 0.3s ease, transform 0.3s ease',
          transform: `translateX(${mobileOpen ? 0 : ''}px)`,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center"
          style={{
            height: 64,
            padding: '0 16px',
            gap: 12,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              backgroundColor: 'var(--primary)',
            }}
          >
            <Leaf size={20} strokeWidth={1.5} className="text-white" />
          </div>
          {!collapsed && (
            <div className="animate-slide-in-right">
              <div style={{ color: 'white', fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>
                Conatus
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.3 }}>
                Environmental Tech
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1" style={{ padding: '16px 12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center group relative"
                style={{
                  width: '100%',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 8,
                  backgroundColor: item.active ? 'var(--primary)' : 'transparent',
                  borderLeft: item.active ? '4px solid white' : '4px solid transparent',
                  border: 'none',
                  borderLeftWidth: 4,
                  borderLeftStyle: 'solid',
                  borderLeftColor: item.active ? 'white' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  minHeight: 44,
                }}
                title={collapsed ? item.label : undefined}
                aria-label={item.label}
                aria-current={item.active ? 'page' : undefined}
              >
                <item.icon
                  size={20}
                  strokeWidth={1.5}
                  className="flex-shrink-0"
                  style={{
                    color: 'white',
                    opacity: item.active ? 1 : 0.7,
                  }}
                />
                {!collapsed && (
                  <span
                    className="animate-slide-in-right"
                    style={{
                      color: 'white',
                      opacity: item.active ? 1 : 0.7,
                      fontSize: 14,
                      fontWeight: item.active ? 500 : 400,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.label}
                  </span>
                )}
                {!item.active && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      borderRadius: 8,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      transition: 'opacity 0.15s ease',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Collapse Toggle — hidden on mobile */}
        <button
          onClick={onToggle}
          className="hidden md:flex items-center justify-center"
          style={{
            height: 48,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            background: 'none',
            border: 'none',
            borderTopStyle: 'solid' as const,
            borderTopWidth: 1,
            borderTopColor: 'rgba(255,255,255,0.1)',
            cursor: 'pointer',
            minHeight: 44,
          }}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          {collapsed ? (
            <ChevronRight size={20} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.6)' }} />
          ) : (
            <ChevronLeft size={20} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.6)' }} />
          )}
        </button>
      </aside>
    </>
  )
}
