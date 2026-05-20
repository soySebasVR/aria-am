import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Eye, Pencil } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { Pagination } from '../../components/ui/Pagination';
import { formatCurrency } from '../../lib/utils';

const PAGE_SIZE = 25;

export function ProductListPage() {
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useProducts();

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() =>
    products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.asin.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()),
    ), [products, search]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Products</h1>
        <Button onClick={() => navigate('/products/new')}>
          <Plus size={15} /> Create
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/60" />
        <input
          value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search products by name, ASIN or SKU..."
          className="w-full bg-navy-700 border border-subtle rounded pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-accent/50"
        />
      </div>

      {/* Table */}
      <div className="bg-navy-700 border border-subtle rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-subtle bg-navy-800/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary tracking-wide">PRODUCT</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary tracking-wide">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary tracking-wide">CATALOG PAGE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary tracking-wide">CASE PRICE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-accent tracking-wide">UNIT PRICE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary tracking-wide">CASE PACK</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary tracking-wide">STATUS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary tracking-wide">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={8} className="text-center py-12 text-text-secondary">Loading…</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-text-secondary">No products found.</td></tr>
              ) : paginated.map((p, i) => (
                <tr key={p.id} className={`border-b border-subtle last:border-0 hover:bg-navy-800/30 transition-colors ${i % 2 === 1 ? 'bg-navy-800/10' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded flex-shrink-0" style={{ backgroundColor: p.imageColor }} />
                      <div>
                        <p className="text-xs font-mono text-text-secondary">{p.asin}</p>
                        <p className="text-xs font-medium text-text-primary leading-tight">{p.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs whitespace-nowrap">{p.sku}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{p.catalogPage}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs whitespace-nowrap">{formatCurrency(p.casePrice)}</td>
                  <td className="px-4 py-3 text-accent font-semibold text-xs whitespace-nowrap">{formatCurrency(p.unitPrice)}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{p.casePack}</td>
                  <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/products/${p.id}`)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-accent/40 text-accent text-xs font-medium hover:bg-accent/10 transition-colors"
                      >
                        <Eye size={12} /> View
                      </button>
                      <button
                        onClick={() => navigate(`/products/${p.id}/edit`)}
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
