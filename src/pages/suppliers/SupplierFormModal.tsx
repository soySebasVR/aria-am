import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useCreateSupplier, useUpdateSupplier } from '../../hooks/useSuppliers';
import type { Supplier } from '../../types';

const schema = z.object({
  company:     z.string().min(2, 'Required'),
  nroDocument: z.string().min(1, 'Required'),
  email:       z.string().email('Invalid email'),
  contact:     z.string().min(2, 'Required'),
  direccion:   z.string().min(2, 'Required'),
  country:     z.string().min(2, 'Required'),
  state:       z.enum(['Active', 'Inactive']),
});
type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  supplier?: Supplier;
}

export function SupplierFormModal({ open, onClose, supplier }: Props) {
  const isEdit = !!supplier;
  const create = useCreateSupplier();
  const update = useUpdateSupplier();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: supplier ?? { state: 'Active' },
  });

  useEffect(() => {
    if (open) reset(supplier ?? { state: 'Active', company: '', nroDocument: '', email: '', contact: '', direccion: '', country: '' });
  }, [open, supplier, reset]);

  const onSubmit = async (data: FormValues) => {
    if (isEdit && supplier) {
      await update.mutateAsync({ id: supplier.id, data });
    } else {
      await create.mutateAsync(data);
    }
    onClose();
  };

  const isPending = create.isPending || update.isPending;

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit Supplier' : 'Register Supplier'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Company"      placeholder="Enter company name"   error={errors.company?.message}     {...register('company')} />
          <Input label="Contact"      placeholder="Enter contact name"    error={errors.contact?.message}     {...register('contact')} />
          <Input label="Nro. Document" placeholder="e.g. WD-2024-001"   error={errors.nroDocument?.message} {...register('nroDocument')} />
          <Input label="Dirección"    placeholder="Enter address"         error={errors.direccion?.message}   {...register('direccion')} />
          <Input label="Email"        placeholder="Enter email address"   error={errors.email?.message}       {...register('email')} type="email" />
          <Input label="Country"      placeholder="Enter country"         error={errors.country?.message}     {...register('country')} />
        </div>
        <Select label="State" error={errors.state?.message} {...register('state')}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Select>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={isPending}>
            {isEdit ? 'Save Changes' : 'Register Supplier'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
