import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { useProduct, useCreateProduct, useUpdateProduct } from '../../hooks/useProducts';

const schema = z.object({
  name:        z.string().min(2, 'Required'),
  asin:        z.string().length(10, 'ASIN must be 10 characters'),
  sku:         z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  catalogPage: z.coerce.number().int().min(1),
  casePack:    z.coerce.number().int().min(1),
  casePrice:   z.coerce.number().positive('Must be positive'),
  unitPrice:   z.coerce.number().positive('Must be positive'),
  upc:         z.string().min(1, 'Required'),
  status:      z.enum(['In Stock', 'Low Stock', 'Out of Stock']),
  profit:      z.coerce.number(),
  margin:      z.coerce.number(),
  roi:         z.coerce.number(),
  buyboxPrice: z.coerce.number().positive('Must be positive'),
  fbaAvailable: z.coerce.number().int().min(0),
  sales90d:    z.coerce.number().int().min(0),
  sales60d:    z.coerce.number().int().min(0),
  sales30d:    z.coerce.number().int().min(0),
  sales15d:    z.coerce.number().int().min(0),
  sales7d:     z.coerce.number().int().min(0),
});
type FormValues = z.infer<typeof schema>;

const emptyDefaults: FormValues = {
  name: '', asin: '', sku: '', description: '',
  catalogPage: 1, casePack: 1, casePrice: 0, unitPrice: 0, upc: '',
  status: 'In Stock', profit: 0, margin: 0, roi: 0, buyboxPrice: 0, fbaAvailable: 0,
  sales90d: 0, sales60d: 0, sales30d: 0, sales15d: 0, sales7d: 0,
};

export function ProductFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;

  const { data: existing, isLoading } = useProduct(id ?? '');
  const create = useCreateProduct();
  const update = useUpdateProduct();

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
    navigate('/products');
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
            onClick={() => navigate('/products')}
            className="w-8 h-8 rounded-full border border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-navy-700 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="text-2xl font-bold text-text-primary">
            {isEdit ? 'Edit Product' : 'Register Product'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => navigate('/products')}>Cancel</Button>
          <Button type="submit" loading={isPending}>Save</Button>
        </div>
      </div>

      {/* Card */}
      <div className="bg-navy-700 border border-subtle rounded-lg p-6 space-y-4">
        <h2 className="text-sm font-semibold text-text-primary">Product Overview</h2>

        <Input label="Product Name" placeholder="Enter product name" error={errors.name?.message} {...register('name')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="ASIN" placeholder="e.g. B08L5L8T8V" error={errors.asin?.message} {...register('asin')} />
          <Input label="SKU"  placeholder="Enter SKU code"   error={errors.sku?.message}  {...register('sku')} />
        </div>

        <Textarea label="Description" placeholder="Enter description name" rows={4} error={errors.description?.message} {...register('description')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Catalog Page" type="number" placeholder="Enter catalog page" error={errors.catalogPage?.message} {...register('catalogPage')} />
          <Input label="Case Pack"    type="number" placeholder="Enter case pack"    error={errors.casePack?.message}    {...register('casePack')} />
          <Input label="Case Price"   type="number" step="0.01" placeholder="Enter case price"   error={errors.casePrice?.message}   {...register('casePrice')} />
          <Input label="Unit Price"   type="number" step="0.01" placeholder="Enter unit price"   error={errors.unitPrice?.message}   {...register('unitPrice')} />
          <Input label="UPC"          placeholder="Enter upc"                        error={errors.upc?.message}         {...register('upc')} />
          <Select label="Status" error={errors.status?.message} {...register('status')}>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </Select>
        </div>
      </div>
    </form>
  );
}
