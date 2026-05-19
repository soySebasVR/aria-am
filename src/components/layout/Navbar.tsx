import { NavLink } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';

const navLinks = [
  { to: '/home',            label: 'Home' },
  { to: '/suppliers',       label: 'Suppliers' },
  { to: '/products',        label: 'Products' },
  { to: '/purchase-orders', label: 'Purchase Orders' },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-12 bg-navy-900 border-b border-subtle flex items-center justify-between px-6 z-20">
      {/* Brand + nav links */}
      <div className="flex items-center gap-6">
        <span className="text-text-primary font-bold text-base tracking-wide">ARIA AM</span>
        <nav className="flex items-center gap-1">
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
      <div className="flex items-center gap-2">
        <button className="bg-accent text-accent-dark text-xs font-semibold px-3 py-1.5 rounded hover:bg-accent-hover transition-colors">
          Batch Action
        </button>
        <button className="p-1.5 text-text-secondary hover:text-text-primary transition-colors rounded hover:bg-navy-700">
          <Bell size={16} />
        </button>
        <button className="p-1.5 text-text-secondary hover:text-text-primary transition-colors rounded hover:bg-navy-700">
          <Settings size={16} />
        </button>
        <div className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold ml-1">
          A
        </div>
      </div>
    </header>
  );
}
