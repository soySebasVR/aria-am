import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useProduct } from '../../hooks/useProducts';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { ProductFormModal } from './ProductFormModal';
import { formatCurrency, formatNumber, formatPercent } from '../../lib/utils';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-text-secondary">{label}</p>
      <p className="text-sm font-medium text-text-primary">{value}</p>
    </div>
  );
}

function MetricField({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-text-secondary">{label}</p>
      <p className={`text-sm font-semibold ${highlight ? 'text-emerald-400' : 'text-text-primary'}`}>{value}</p>
    </div>
  );
}

export function ProductDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id);
  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) return <div className="text-text-secondary py-12 text-center">Loading…</div>;
  if (!product) return <div className="text-red-400 py-12 text-center">Product not found.</div>;

  return (
    <>
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/products')} className="text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Product Detail</h1>
        </div>

        <div className="bg-navy-700 border border-subtle rounded-lg shadow-xl p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ backgroundColor: product.imageColor }} />
              <div>
                <h2 className="text-base font-semibold text-text-primary">{product.name}</h2>
                <p className="text-xs text-text-secondary mt-0.5">{product.asin}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <StatusBadge status={product.status} />
              <Button size="sm" onClick={() => setEditOpen(true)}>
                <Pencil size={13} /> Edit Product
              </Button>
            </div>
          </div>

          <div className="border-t border-subtle pt-5 grid grid-cols-2 gap-x-8 gap-y-5">
            <Field label="Product Name" value={product.name} />
            <Field label="ASIN"         value={product.asin} />
            <Field label="SKU"          value={product.sku} />
            <Field label="Supplier"     value={product.supplierName} />
          </div>

          <div className="border-t border-subtle pt-5">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Metrics</p>
            <div className="grid grid-cols-3 gap-x-8 gap-y-5">
              <MetricField label="Price"          value={formatCurrency(product.price)} />
              <MetricField label="BuyBox Price"   value={formatCurrency(product.buyboxPrice)} />
              <MetricField label="Profit"         value={formatCurrency(product.profit)} highlight />
              <MetricField label="ROI"            value={formatPercent(product.roi)} highlight />
              <MetricField label="30D Sales"      value={formatNumber(product.sales30d)} />
              <MetricField label="FBA Available"  value={String(product.fbaAvailable)} />
            </div>
          </div>

          <div className="border-t border-subtle pt-4 space-y-1">
            <p className="text-xs text-text-secondary">Status</p>
            <StatusBadge status={product.status} />
          </div>
        </div>
      </div>

      <ProductFormModal open={editOpen} onClose={() => setEditOpen(false)} product={product} />
    </>
  );
}
