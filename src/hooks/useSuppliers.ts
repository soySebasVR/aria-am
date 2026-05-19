import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { suppliersApi } from '../services/api';
import type { CreateSupplierDto, UpdateSupplierDto } from '../types';

const QUERY_KEY = ['suppliers'];

export function useSuppliers() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: suppliersApi.getAll });
}

export function useSupplier(id: string) {
  return useQuery({ queryKey: [...QUERY_KEY, id], queryFn: () => suppliersApi.getById(id), enabled: !!id });
}

export function useCreateSupplier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSupplierDto) => suppliersApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateSupplier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSupplierDto }) => suppliersApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteSupplier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => suppliersApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
