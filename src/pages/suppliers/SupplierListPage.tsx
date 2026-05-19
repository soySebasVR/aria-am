import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, Pencil, Trash2 } from 'lucide-react';
import { useSuppliers, useDeleteSupplier } from '../../hooks/useSuppliers';
import { Button } from '../../components/ui/Button';
import { StateBadge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import { SupplierFormModal } from './SupplierFormModal';
import type { Supplier } from '../../types';

const PAGE_SIZE = 25;

export function SupplierListPage() {
  const navigate = useNavigate();
  const { data: suppliers = [], isLoading } = useSuppliers();
  const deleteMutation = useDeleteSupplier();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Supplier | undefined>();

  const filtered = useMemo(() =>
    suppliers.filter(s =>
      s.company.toLowerCase().includes(search.toLowerCase()) ||
      s.country.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
    ), [suppliers, search]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const openCreate = () => { setEditTarget(undefined); setModalOpen(true); };
  const openEdit   = (s: Supplier) => { setEditTarget(s); setModalOpen(true); };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-text-primary">Suppliers</h1>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60" />
            <input
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by company, country or email..."
              className="w-full bg-navy-700 border border-subtle rounded pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-accent/50"
            />
          </div>
          <Button onClick={openCreate} size="sm">
            <Plus size={14} /> New Supplier
          </Button>
        </div>

        {/* Table */}
        <div className="bg-navy-700 border border-subtle rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-subtle bg-navy-800/50">
                {['COMPANY','COUNTRY','CONTACT','EMAIL','STATE','ACTIONS'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-12 text-text-secondary">Loading…</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-text-secondary">No suppliers found.</td></tr>
              ) : paginated.map((s, i) => (
                <tr key={s.id} className={`border-b border-subtle last:border-0 hover:bg-navy-800/30 transition-colors ${i % 2 === 1 ? 'bg-navy-800/10' : ''}`}>
                  <td className="px-4 py-3 font-medium text-text-primary">{s.company}</td>
                  <td className="px-4 py-3 text-text-secondary">{s.country}</td>
                  <td className="px-4 py-3 text-text-secondary">{s.contact}</td>
                  <td className="px-4 py-3 text-text-secondary">{s.email}</td>
                  <td className="px-4 py-3"><StateBadge state={s.state} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => navigate(`/suppliers/${s.id}`)} className="p-1.5 rounded hover:bg-navy-600 text-text-secondary hover:text-text-primary transition-colors" title="View detail">
                        <Eye size={14} />
                      </button>
                      <button onClick={() => openEdit(s)} className="p-1.5 rounded hover:bg-navy-600 text-text-secondary hover:text-text-primary transition-colors" title="Edit">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => deleteMutation.mutate(s.id)} className="p-1.5 rounded hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 size={14} />
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

      <SupplierFormModal open={modalOpen} onClose={() => setModalOpen(false)} supplier={editTarget} />
    </>
  );
}
