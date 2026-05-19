import { cn } from '../../lib/utils';
import type { ProductStatus, SupplierState } from '../../types';

const statusStyles: Record<ProductStatus, string> = {
  'In Stock':     'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  'Low Stock':    'bg-amber-500/15   text-amber-400   border border-amber-500/30',
  'Out of Stock': 'bg-red-500/15     text-red-400     border border-red-500/30',
};

const stateStyles: Record<SupplierState, string> = {
  'Active':   'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  'Inactive': 'bg-slate-500/15   text-slate-400   border border-slate-500/30',
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium', statusStyles[status])}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.toUpperCase()}
    </span>
  );
}

export function StateBadge({ state }: { state: SupplierState }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium', stateStyles[state])}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {state}
    </span>
  );
}
