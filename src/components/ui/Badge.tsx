import { cn } from '../../lib/utils';
import type { ProductStatus, SupplierStatus } from '../../types';

const productStatusStyles: Record<ProductStatus, string> = {
  'In Stock':     'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  'Low Stock':    'bg-amber-500/15   text-amber-400   border border-amber-500/30',
  'Out of Stock': 'bg-red-500/15     text-red-400     border border-red-500/30',
};

const supplierStatusStyles: Record<SupplierStatus, string> = {
  'Active':   'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
  'Archived': 'bg-orange-500/15  text-orange-400  border border-orange-500/30',
  'In Stock': 'bg-sky-500/15     text-sky-400     border border-sky-500/30',
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium', productStatusStyles[status])}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.toUpperCase()}
    </span>
  );
}

export function SupplierStatusBadge({ status }: { status: SupplierStatus }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium', supplierStatusStyles[status])}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.toUpperCase()}
    </span>
  );
}

/** @deprecated use SupplierStatusBadge */
export function StateBadge({ state }: { state: string }) {
  const style = state === 'Active'
    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
    : 'bg-slate-500/15   text-slate-400   border border-slate-500/30';
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium', style)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {state}
    </span>
  );
}
