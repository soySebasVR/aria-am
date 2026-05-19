import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Package, Users, ShoppingCart, LogOut, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/home',            icon: Home,         label: 'Home' },
  { to: '/suppliers',       icon: Users,        label: 'Suppliers' },
  { to: '/products',        icon: Package,      label: 'Products' },
  { to: '/purchase-orders', icon: ShoppingCart, label: 'Purchase Order' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: Props) {
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full w-64 bg-navy-900 border-r border-subtle flex flex-col z-30',
        'transition-transform duration-300 ease-in-out',
        open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      )}
    >
      {/* Mobile close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1.5 rounded text-text-secondary hover:text-text-primary md:hidden"
      >
        <X size={16} />
      </button>

      {/* User info */}
      <div className="px-4 py-4 border-b border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-navy-600 flex items-center justify-center text-accent font-bold text-sm flex-shrink-0">
            A
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">Administrator</p>
            <p className="text-xs text-text-secondary">Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-navy-600 text-text-primary font-medium'
                  : 'text-text-secondary hover:bg-navy-800 hover:text-text-primary',
              )
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Log out */}
      <div className="px-3 py-4 border-t border-subtle">
        <button
          onClick={() => { onClose(); navigate('/'); }}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm text-text-secondary hover:bg-navy-800 hover:text-text-primary transition-colors"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
