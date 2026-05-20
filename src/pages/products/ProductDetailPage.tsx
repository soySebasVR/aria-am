import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useProduct } from '../../hooks/useProducts';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { formatCurrency, formatPercent } from '../../lib/utils';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-text-secondary">{label}</p>
      <p className="text-sm font-medium text-text-primary">{value}</p>
    </div>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs text-text-secondary">{label}</p>
      <p className={`text-sm font-semibold ${accent ? 'text-accent' : 'text-text-primary'}`}>{value}</p>
    </div>
  );
}

export function ProductDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id);

  if (isLoading) return <div className="text-text-secondary py-12 text-center">Loading…</div>;
  if (!product)  return <div className="text-red-400 py-12 text-center">Product not found.</div>;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/products')}
            className="w-8 h-8 rounded-full border border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-navy-700 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Product Detail</h1>
        </div>
        <Button size="sm" onClick={() => navigate(`/products/${id}/edit`)}>
          <Pencil size={13} /> Edit Product
        </Button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left — Product Overview */}
        <div className="lg:col-span-2">
          <div className="bg-navy-700 border border-subtle rounded-lg p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded flex-shrink-0" style={{ backgroundColor: product.imageColor }} />
              <h2 className="text-sm font-semibold text-text-primary">Product Overview</h2>
            </div>

            <Field label="Product Name" value={product.name} />

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <Field label="SKU"  value={product.sku} />
              <Field label="ASIN" value={product.asin} />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-text-secondary">Description</p>
              <p className="text-sm text-text-primary leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Catalog Page" value={String(product.catalogPage)} />
              <Field label="Case Pack"    value={String(product.casePack)} />
              <Field label="Case Price"   value={formatCurrency(product.casePrice)} />
              <Field label="Unit Price"   value={formatCurrency(product.unitPrice)} />
              <Field label="UPC"          value={product.upc} />
              <div className="space-y-1">
                <p className="text-xs text-text-secondary">Status</p>
                <StatusBadge status={product.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Right — Metrics + Sales */}
        <div className="space-y-4">
          {/* Key metrics */}
          <div className="bg-navy-700 border border-subtle rounded-lg p-5 space-y-4">
            <div className="grid grid-cols-3 gap-4 pb-4 border-b border-subtle">
              <Metric label="Profit" value={formatCurrency(product.profit)} accent />
              <Metric label="Margin" value={formatPercent(product.margin)} accent />
              <Metric label="ROI"    value={formatPercent(product.roi)} accent />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1">BUYBOX</p>
                <p className="text-sm font-semibold text-text-primary">{formatCurrency(product.buyboxPrice)}</p>
              </div>
              <Metric label="FBA Available" value={`${product.fbaAvailable} units`} />
            </div>
          </div>

          {/* Sales Performance */}
          <div className="bg-navy-700 border border-subtle rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-semibold text-text-primary">Sales Performance</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Metric label="90D Sales" value={`${product.sales90d} units`} />
              <Metric label="60D Sales" value={`${product.sales60d} units`} />
              <Metric label="30D Sales" value={`${product.sales30d} units`} />
              <Metric label="15D Sales" value={`${product.sales15d} units`} />
              <Metric label="7D Sales"  value={`${product.sales7d} units`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
