export type SupplierState = 'Active' | 'Inactive';
export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Supplier {
  id: string;
  company: string;
  nroDocument: string;
  email: string;
  contact: string;
  direccion: string;
  country: string;
  state: SupplierState;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  asin: string;
  sku: string;
  supplierId: string;
  supplierName: string;
  price: number;
  buyboxPrice: number;
  profit: number;
  roi: number;
  sales30d: number;
  fbaAvailable: number;
  status: ProductStatus;
  imageColor: string;
}

export type CreateSupplierDto = Omit<Supplier, 'id' | 'createdAt'>;
export type UpdateSupplierDto = Partial<CreateSupplierDto>;
export type CreateProductDto = Omit<Product, 'id' | 'imageColor'>;
export type UpdateProductDto = Partial<CreateProductDto>;
