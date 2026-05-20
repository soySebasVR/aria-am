import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Pencil } from 'lucide-react';
import { useSuppliers } from '../../hooks/useSuppliers';
import { Button } from '../../components/ui/Button';
import { SupplierStatusBadge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import { formatCurrency } from '../../lib/utils';

const PAGE_SIZE = 25;

export function SupplierListPage() {
  const navigate = useNavigate();
  const { data: suppliers = [], isLoading } = useSuppliers();
  const [page, setPage] = useState(1);

  const filtered = suppliers;

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Suppliers</h1>
        <Button onClick={() => navigate('/suppliers/new')}>
          <Plus size={15} /> Create
        </Button>
      </div>

      <div className="bg-navy-700 border border-subtle rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="border-b border-subtle bg-navy-800/50">
                {['NAME','CONTACT','ADDRESS','MOQ','LEAD TIME','STATUS','ACTIONS'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={7} className="text-center py-12 text-text-secondary">Loading…</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-text-secondary">No suppliers found.</td></tr>
              ) : paginated.map((s, i) => (
                <tr key={s.id} className={`border-b border-subtle last:border-0 hover:bg-navy-800/30 transition-colors ${i % 2 === 1 ? 'bg-navy-800/10' : ''}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-text-primary">{s.company}</p>
                    <p className="text-xs text-text-secondary mt-0.5">SKU: {s.sku}</p>
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{s.email}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs max-w-[200px] truncate">{s.address}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs whitespace-nowrap">{formatCurrency(s.moq)}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs whitespace-nowrap">{s.leadTime}</td>
                  <td className="px-4 py-3"><SupplierStatusBadge status={s.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/suppliers/${s.id}`)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-accent/40 text-accent text-xs font-medium hover:bg-accent/10 transition-colors"
                      >
                        <Eye size={12} /> View
                      </button>
                      <button
                        onClick={() => navigate(`/suppliers/${s.id}/edit`)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-accent/40 text-accent text-xs font-medium hover:bg-accent/10 transition-colors"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} total={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
      </div>
    </div>
  );
}
