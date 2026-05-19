import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useCreateProduct, useUpdateProduct } from '../../hooks/useProducts';
import { useSuppliers } from '../../hooks/useSuppliers';
import type { Product } from '../../types';

const schema = z.object({
  name:         z.string().min(2, 'Required'),
  asin:         z.string().min(10, 'ASIN must be 10 chars').max(10),
  sku:          z.string().min(2, 'Required'),
  supplierId:   z.string().min(1, 'Select a supplier'),
  supplierName: z.string(),
  price:        z.coerce.number().positive('Must be positive'),
  buyboxPrice:  z.coerce.number().positive('Must be positive'),
  profit:       z.coerce.number(),
  roi:          z.coerce.number(),
  sales30d:     z.coerce.number().int().min(0),
  fbaAvailable: z.coerce.number().int().min(0),
  status:       z.enum(['In Stock', 'Low Stock', 'Out of Stock']),
});
type FormValues = z.infer<typeof schema>;

const defaults: Partial<FormValues> = {
  status: 'In Stock', price: 0, buyboxPrice: 0, profit: 0, roi: 0, sales30d: 0, fbaAvailable: 0,
};

interface Props { open: boolean; onClose: () => void; product?: Product; }

export function ProductFormModal({ open, onClose, product }: Props) {
  const isEdit = !!product;
  const create = useCreateProduct();
  const update = useUpdateProduct();
  const { data: suppliers = [] } = useSuppliers();

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: product ?? defaults,
  });

  const supplierIdValue = watch('supplierId');
  useEffect(() => {
    const sup = suppliers.find(s => s.id === supplierIdValue);
    if (sup) setValue('supplierName', sup.company);
  }, [supplierIdValue, suppliers, setValue]);

  useEffect(() => {
    if (open) reset(product ?? { ...defaults, supplierId: '', supplierName: '', name: '', asin: '', sku: '' });
  }, [open, product, reset]);

  const onSubmit = async (data: FormValues) => {
    if (isEdit && product) {
      await update.mutateAsync({ id: product.id, data });
    } else {
      await create.mutateAsync(data as FormValues & { supplierId: string; supplierName: string });
    }
    onClose();
  };

  const isPending = create.isPending || update.isPending;

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit Product' : 'Register Product'} className="max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Product Name" placeholder="Enter product name" error={errors.name?.message} {...register('name')} />

        <div className="grid grid-cols-2 gap-4">
          <Input label="ASIN"  placeholder="e.g. B08L5L8T8V" error={errors.asin?.message}  {...register('asin')} />
          <Input label="SKU"   placeholder="Enter SKU code"  error={errors.sku?.message}   {...register('sku')} />
        </div>

        <Select label="Supplier" error={errors.supplierId?.message} {...register('supplierId')}>
          <option value="">Select supplier…</option>
          {suppliers.map(s => <option key={s.id} value={s.id}>{s.company}</option>)}
        </Select>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Price (USD)"    type="number" step="0.01" placeholder="0.00" error={errors.price?.message}       {...register('price')} />
          <Input label="BuyBox Price"   type="number" step="0.01" placeholder="0.00" error={errors.buyboxPrice?.message}  {...register('buyboxPrice')} />
          <Input label="Profit"         type="number" step="0.01" placeholder="0.00" error={errors.profit?.message}      {...register('profit')} />
          <Input label="ROI (%)"        type="number" step="0.1"  placeholder="0.0"  error={errors.roi?.message}         {...register('roi')} />
          <Input label="30D Sales"      type="number" placeholder="0"   error={errors.sales30d?.message}     {...register('sales30d')} />
          <Input label="FBA Available"  type="number" placeholder="0"   error={errors.fbaAvailable?.message} {...register('fbaAvailable')} />
        </div>

        <Select label="Status" error={errors.status?.message} {...register('status')}>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </Select>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={isPending}>
            {isEdit ? 'Save Changes' : 'Register Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
