import { NavLink } from 'react-router-dom';
import { Bell, Settings, Menu } from 'lucide-react';

const navLinks = [
  { to: '/home',            label: 'Home' },
  { to: '/suppliers',       label: 'Suppliers' },
  { to: '/products',        label: 'Products' },
  { to: '/purchase-orders', label: 'Purchase Orders' },
];

interface Props {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: Props) {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-12 bg-navy-900 border-b border-subtle flex items-center justify-between px-4 md:px-6 z-20">
      {/* Left: hamburger (mobile) + brand + nav links (desktop) */}
      <div className="flex items-center gap-3 md:gap-6 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 text-text-secondary hover:text-text-primary transition-colors flex-shrink-0"
        >
          <Menu size={20} />
        </button>

        <span className="text-text-primary font-bold text-sm md:text-base tracking-wide flex-shrink-0">
          ARIA AM
        </span>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? 'px-3 py-1.5 text-xs font-semibold text-accent border-b-2 border-accent'
                  : 'px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
        <button className="bg-accent text-accent-dark text-xs font-semibold px-2.5 md:px-3 py-1.5 rounded hover:bg-accent-hover transition-colors">
          Batch Action
        </button>
        <button className="p-1.5 text-text-secondary hover:text-text-primary transition-colors rounded hover:bg-navy-700 hidden sm:block">
          <Bell size={16} />
        </button>
        <button className="p-1.5 text-text-secondary hover:text-text-primary transition-colors rounded hover:bg-navy-700 hidden sm:block">
          <Settings size={16} />
        </button>
        <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold ml-1">
          A
        </div>
      </div>
    </header>
  );
}
