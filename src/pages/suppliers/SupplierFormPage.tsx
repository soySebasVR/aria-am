import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { useSupplier, useCreateSupplier, useUpdateSupplier } from '../../hooks/useSuppliers';

const schema = z.object({
  company:       z.string().min(2, 'Required'),
  sku:           z.string().min(1, 'Required'),
  address:       z.string().min(2, 'Required'),
  contact:       z.string().min(2, 'Required'),
  email:         z.string().email('Invalid email'),
  phone:         z.string().min(1, 'Required'),
  website:       z.string().min(1, 'Required'),
  nifDocument:   z.string().min(1, 'Required'),
  status:        z.enum(['Active', 'Archived', 'In Stock']),
  moq:           z.coerce.number().min(0),
  freeDelivery:  z.coerce.number().min(0),
  leadTime:      z.string().min(1, 'Required'),
  bankName:      z.string().min(1, 'Required'),
  routingNumber: z.string().min(1, 'Required'),
  accountNumber: z.string().min(1, 'Required'),
});
type FormValues = z.infer<typeof schema>;

const emptyDefaults: FormValues = {
  company: '', sku: '', address: '', contact: '', email: '',
  phone: '', website: '', nifDocument: '', status: 'Active',
  moq: 0, freeDelivery: 0, leadTime: '',
  bankName: '', routingNumber: '', accountNumber: '',
};

export function SupplierFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;

  const { data: existing, isLoading } = useSupplier(id ?? '');
  const create = useCreateSupplier();
  const update = useUpdateSupplier();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: emptyDefaults,
  });

  useEffect(() => {
    if (existing) reset(existing);
  }, [existing, reset]);

  const onSubmit = async (data: FormValues) => {
    if (isEdit && id) {
      await update.mutateAsync({ id, data });
    } else {
      await create.mutateAsync(data);
    }
    navigate('/suppliers');
  };

  const isPending = create.isPending || update.isPending;

  if (isEdit && isLoading) return <div className="text-text-secondary py-12 text-center">Loading…</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/suppliers')}
            className="w-8 h-8 rounded-full border border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-navy-700 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">
            {isEdit ? 'Edit Supplier' : 'Register Supplier'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/suppliers')}>Cancel</Button>
          <Button type="submit" loading={isPending}>Save</Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left — Supplier Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-navy-700 border border-subtle rounded-lg p-6 space-y-4">
            <h2 className="text-sm font-semibold text-text-primary">Supplier Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Company"    placeholder="Enter company name" error={errors.company?.message}    {...register('company')} />
              <Input label="SKU"        placeholder="Enter SKU"          error={errors.sku?.message}        {...register('sku')} />
            </div>
            <Input label="Address" placeholder="Enter address" error={errors.address?.message} {...register('address')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Contact" placeholder="Enter contact name" error={errors.contact?.message} {...register('contact')} />
              <Input label="Email"   placeholder="Enter email"        error={errors.email?.message}   {...register('email')} type="email" />
              <Input label="Phone"   placeholder="Enter phone"        error={errors.phone?.message}   {...register('phone')} />
              <Input label="Website" placeholder="Enter website"      error={errors.website?.message} {...register('website')} />
              <Input label="Document" placeholder="e.g. WD-2024-001"  error={errors.nifDocument?.message} {...register('nifDocument')} />
              <Select label="Status" error={errors.status?.message} {...register('status')}>
                <option value="Active">Active</option>
                <option value="Archived">Archived</option>
                <option value="In Stock">In Stock</option>
              </Select>
            </div>
          </div>

          {/* Bank info */}
          <div className="bg-navy-700 border border-subtle rounded-lg p-6 space-y-4">
            <h2 className="text-sm font-semibold text-text-primary">Bank info</h2>
            <Input label="Bank Name" placeholder="Enter bank name" error={errors.bankName?.message} {...register('bankName')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Routing #"  placeholder="Enter routing number"  error={errors.routingNumber?.message}  {...register('routingNumber')} />
              <Input label="Account #"  placeholder="Enter account number"  error={errors.accountNumber?.message}  {...register('accountNumber')} />
            </div>
          </div>
        </div>

        {/* Right — Logistic */}
        <div className="bg-navy-700 border border-subtle rounded-lg p-6 space-y-4 h-fit">
          <h2 className="text-sm font-semibold text-text-primary">Logistic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <Input label="MOQ ($)"          type="number" placeholder="Enter routing"  error={errors.moq?.message}          {...register('moq')} />
            <Input label="Free delivery ($)" type="number" placeholder="Enter account"  error={errors.freeDelivery?.message} {...register('freeDelivery')} />
            <Input label="Lead Time"        placeholder="e.g. 7 days"           error={errors.leadTime?.message}    {...register('leadTime')} />
          </div>
        </div>
      </div>
    </form>
  );
}
