import { BarChart3, Lightbulb } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
    { to: '/dashboard', label: 'Live Data', icon: BarChart3 },
    { to: '/history', label: 'Information', icon: Lightbulb }
]

export const Navbar = () => (
  <header className="sticky top-0 z-20 border-b border-sky-300/15 bg-slate-950/75 backdrop-blur-xl">
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-sky-100/60">Circuitech Project</p>
        <h1 className="text-xl font-semibold text-slate-100 sm:text-2xl">WeaveX </h1>
      </div>
      <nav className="flex gap-2 rounded-xl border border-sky-300/20 bg-slate-900/65 p-1">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all',
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-100 shadow-sm ring-1 ring-cyan-300/40'
                    : 'text-slate-300 hover:bg-slate-800/90 hover:text-slate-100',
                ].join(' ')
              }
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{link.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  </header>
)
