export type SupplierStatus = 'Active' | 'Archived' | 'In Stock';
export type ProductStatus  = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Supplier {
  id: string;
  company: string;
  sku: string;
  address: string;
  contact: string;
  email: string;
  phone: string;
  website: string;
  nifDocument: string;
  status: SupplierStatus;
  moq: number;
  freeDelivery: number;
  leadTime: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  createdAt: string;
}

export interface Product {
  id: string;
  asin: string;
  name: string;
  sku: string;
  description: string;
  catalogPage: number;
  casePack: number;
  casePrice: number;
  unitPrice: number;
  upc: string;
  status: ProductStatus;
  imageColor: string;
  profit: number;
  margin: number;
  roi: number;
  buyboxPrice: number;
  fbaAvailable: number;
  sales90d: number;
  sales60d: number;
  sales30d: number;
  sales15d: number;
  sales7d: number;
}

export type CreateSupplierDto = Omit<Supplier, 'id' | 'createdAt'>;
export type UpdateSupplierDto = Partial<CreateSupplierDto>;
export type CreateProductDto  = Omit<Product, 'id' | 'imageColor'>;
export type UpdateProductDto  = Partial<CreateProductDto>;
