import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, Pencil, Trash2 } from 'lucide-react';
import { useProducts, useDeleteProduct } from '../../hooks/useProducts';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import { ProductFormModal } from './ProductFormModal';
import { formatCurrency, formatNumber, formatPercent } from '../../lib/utils';
import type { Product } from '../../types';

const PAGE_SIZE = 25;

export function ProductListPage() {
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useProducts();
  const deleteMutation = useDeleteProduct();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | undefined>();

  const filtered = useMemo(() =>
    products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.asin.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()),
    ), [products, search]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const openCreate = () => { setEditTarget(undefined); setModalOpen(true); };
  const openEdit   = (p: Product) => { setEditTarget(p); setModalOpen(true); };

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-text-primary">Products</h1>

        {/* Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60" />
            <input
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search products by name, ASIN or SKU..."
              className="w-full bg-navy-700 border border-subtle rounded pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-accent/50"
            />
          </div>
          <Button onClick={openCreate} size="sm">
            <Plus size={14} /> Add
          </Button>
        </div>

        {/* Table */}
        <div className="bg-navy-700 border border-subtle rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-subtle bg-navy-800/50">
                  {['PRODUCT','SKU','SUPPLIER','PRICE','BUYBOX','PROFIT','ROI','30D SALES','FBA AVAIL','STATUS','ACTIONS'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-text-secondary tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={11} className="text-center py-12 text-text-secondary">Loading…</td></tr>
                ) : paginated.length === 0 ? (
                  <tr><td colSpan={11} className="text-center py-12 text-text-secondary">No products found.</td></tr>
                ) : paginated.map((p, i) => (
                  <tr key={p.id} className={`border-b border-subtle last:border-0 hover:bg-navy-800/30 transition-colors ${i % 2 === 1 ? 'bg-navy-800/10' : ''}`}>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded flex-shrink-0" style={{ backgroundColor: p.imageColor }} />
                        <div>
                          <p className="font-medium text-text-primary leading-tight text-xs">{p.name}</p>
                          <p className="text-text-secondary text-xs">{p.asin}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-text-secondary text-xs whitespace-nowrap">{p.sku}</td>
                    <td className="px-3 py-3 text-text-secondary text-xs whitespace-nowrap">{p.supplierName}</td>
                    <td className="px-3 py-3 text-text-secondary text-xs whitespace-nowrap">{formatCurrency(p.price)}</td>
                    <td className="px-3 py-3 text-text-primary text-xs whitespace-nowrap">{formatCurrency(p.buyboxPrice)}</td>
                    <td className="px-3 py-3 text-emerald-400 font-semibold text-xs whitespace-nowrap">{formatCurrency(p.profit)}</td>
                    <td className="px-3 py-3 text-emerald-400 font-semibold text-xs whitespace-nowrap">{formatPercent(p.roi)}</td>
                    <td className="px-3 py-3 text-text-secondary text-xs whitespace-nowrap">{formatNumber(p.sales30d)}</td>
                    <td className="px-3 py-3 text-text-secondary text-xs whitespace-nowrap">{p.fbaAvailable}</td>
                    <td className="px-3 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => navigate(`/products/${p.id}`)} className="p-1.5 rounded hover:bg-navy-600 text-text-secondary hover:text-text-primary transition-colors" title="View detail">
                          <Eye size={13} />
                        </button>
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-navy-600 text-text-secondary hover:text-text-primary transition-colors" title="Edit">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => deleteMutation.mutate(p.id)} className="p-1.5 rounded hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors" title="Delete">
                          <Trash2 size={13} />
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

      <ProductFormModal open={modalOpen} onClose={() => setModalOpen(false)} product={editTarget} />
    </>
  );
}
