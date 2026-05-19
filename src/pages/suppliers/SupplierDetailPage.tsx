import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useSupplier } from '../../hooks/useSuppliers';
import { Button } from '../../components/ui/Button';
import { StateBadge } from '../../components/ui/Badge';
import { SupplierFormModal } from './SupplierFormModal';

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
  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) return <div className="text-text-secondary py-12 text-center">Loading…</div>;
  if (!supplier) return <div className="text-red-400 py-12 text-center">Supplier not found.</div>;

  return (
    <>
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/suppliers')} className="text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">Supplier Detail</h1>
        </div>

        <div className="bg-navy-700 border border-subtle rounded-lg shadow-xl p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-text-primary">{supplier.company}</h2>
              <p className="text-sm text-text-secondary mt-0.5">{supplier.nroDocument}</p>
            </div>
            <div className="flex items-center gap-3">
              <StateBadge state={supplier.state} />
              <Button size="sm" onClick={() => setEditOpen(true)}>
                <Pencil size={13} /> Edit Supplier
              </Button>
            </div>
          </div>

          <div className="border-t border-subtle pt-5 grid grid-cols-2 gap-x-8 gap-y-5">
            <Field label="Company"      value={supplier.company} />
            <Field label="Country"      value={supplier.country} />
            <Field label="Contact"      value={supplier.contact} />
            <Field label="Email"        value={supplier.email} />
            <Field label="Nro. Document" value={supplier.nroDocument} />
            <Field label="Dirección"    value={supplier.direccion} />
            <div className="col-span-2 space-y-1">
              <p className="text-xs text-text-secondary">State</p>
              <StateBadge state={supplier.state} />
            </div>
          </div>
        </div>
      </div>

      <SupplierFormModal open={editOpen} onClose={() => setEditOpen(false)} supplier={supplier} />
    </>
  );
}
