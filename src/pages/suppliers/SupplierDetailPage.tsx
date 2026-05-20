import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useSupplier } from '../../hooks/useSuppliers';
import { Button } from '../../components/ui/Button';
import { SupplierStatusBadge } from '../../components/ui/Badge';
import { formatCurrency } from '../../lib/utils';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-text-secondary">{label}</p>
      <p className="text-sm font-medium text-text-primary">{value}</p>
    </div>
  );
}

export function SupplierDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: supplier, isLoading } = useSupplier(id);

  if (isLoading) return <div className="text-text-secondary py-12 text-center">Loading…</div>;
  if (!supplier)  return <div className="text-red-400 py-12 text-center">Supplier not found.</div>;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/suppliers')}
            className="w-8 h-8 rounded-full border border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-navy-700 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Supplier Detail</h1>
        </div>
        <Button size="sm" onClick={() => navigate(`/suppliers/${id}/edit`)}>
          <Pencil size={13} /> Edit Supplier
        </Button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column — Supplier Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-navy-700 border border-subtle rounded-lg p-6 space-y-5">
            <h2 className="text-sm font-semibold text-text-primary">Supplier Info</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Company"      value={supplier.company} />
              <Field label="SKU"          value={supplier.sku} />
            </div>
            <Field label="Address" value={supplier.address} />
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Contact"      value={supplier.contact} />
              <Field label="Email"        value={supplier.email} />
              <Field label="Phone"        value={supplier.phone} />
              <Field label="Website"      value={supplier.website} />
              <Field label="NIF / Document" value={supplier.nifDocument} />
              <div className="space-y-1">
                <p className="text-xs text-text-secondary">Status</p>
                <SupplierStatusBadge status={supplier.status} />
              </div>
            </div>
          </div>

          {/* Bank info */}
          <div className="bg-navy-700 border border-subtle rounded-lg p-6 space-y-5">
            <h2 className="text-sm font-semibold text-text-primary">Bank info</h2>
            <Field label="Bank Name" value={supplier.bankName} />
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Routing #"  value={supplier.routingNumber} />
              <Field label="Account #"  value={supplier.accountNumber} />
            </div>
          </div>
        </div>

        {/* Right column — Logistics */}
        <div className="bg-navy-700 border border-subtle rounded-lg p-6 space-y-5 h-fit">
          <h2 className="text-sm font-semibold text-text-primary">Logistics</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <Field label="MOQ"           value={formatCurrency(supplier.moq)} />
            <Field label="Free Delivery" value={formatCurrency(supplier.freeDelivery)} />
          </div>
          <Field label="Lead Time" value={supplier.leadTime} />
        </div>
      </div>
    </div>
  );
}
