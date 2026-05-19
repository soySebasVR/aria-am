/**
 * Mock API service — replace the implementations below with real Axios calls
 * when the backend is ready. The interface stays identical.
 *
 * Pattern to swap:
 *   import api from './axios'  // your configured Axios instance
 *   getAll: () => api.get('/suppliers').then(r => r.data)
 */

import type {
  Supplier, Product,
  CreateSupplierDto, UpdateSupplierDto,
  CreateProductDto, UpdateProductDto,
} from '../types';
import { delay } from '../lib/utils';

// ─── Static seed data ─────────────────────────────────────────────────────────

const COLORS = ['#3b82f6','#8b5cf6','#ec4899','#f59e0b','#10b981','#06b6d4'];

let suppliers: Supplier[] = [
  { id: 'sup-001', company: 'Wholesale Direct',    nroDocument: 'WD-2024-001', email: 'contact@wholesaledirect.com', contact: 'John Smith',    direccion: 'Los Angeles, CA', country: 'United States', state: 'Active',   createdAt: '2024-01-15' },
  { id: 'sup-002', company: 'InventorySource',     nroDocument: 'IS-2024-002', email: 'sales@inventorysource.com',  contact: 'Sarah Johnson', direccion: 'Toronto, ON',     country: 'Canada',        state: 'Active',   createdAt: '2024-02-03' },
  { id: 'sup-003', company: 'Direct Import',       nroDocument: 'DI-2024-003', email: 'import@directimport.cn',    contact: 'Li Wei',        direccion: 'Shenzhen, GD',    country: 'China',         state: 'Active',   createdAt: '2024-02-20' },
  { id: 'sup-004', company: 'TechDistributors',    nroDocument: 'TD-2024-004', email: 'info@techdist.jp',          contact: 'Kenji Tanaka',  direccion: 'Tokyo',           country: 'Japan',         state: 'Active',   createdAt: '2024-03-01' },
  { id: 'sup-005', company: 'EuroParts GmbH',      nroDocument: 'EP-2024-005', email: 'kontakt@europarts.de',      contact: 'Hans Mueller',  direccion: 'Berlin',          country: 'Germany',       state: 'Inactive', createdAt: '2024-03-10' },
  { id: 'sup-006', company: 'SupplyChain Pro',     nroDocument: 'SC-2024-006', email: 'ventas@scpro.mx',           contact: 'Carlos Rivera', direccion: 'CDMX',            country: 'Mexico',        state: 'Active',   createdAt: '2024-04-05' },
];

let products: Product[] = [
  { id: 'prod-001', name: 'Pro Fit Smartwatch Series 7',      asin: 'B08L5L8T8V', sku: 'PF-SW-7-BLK',   supplierId: 'sup-001', supplierName: 'Wholesale Direct',  price: 149.99, buyboxPrice: 149.95, profit: 42.30, roi: 34.2, sales30d: 1242, fbaAvailable: 84,  status: 'In Stock',     imageColor: COLORS[0] },
  { id: 'prod-002', name: 'Velocity Elite Runners',           asin: 'B07ZPKN671', sku: 'VER-RED-M9',    supplierId: 'sup-002', supplierName: 'InventorySource',   price:  89.50, buyboxPrice:  89.50, profit: 18.45, roi: 21.8, sales30d:  458, fbaAvailable: 12,  status: 'Low Stock',    imageColor: COLORS[1] },
  { id: 'prod-003', name: 'Home Security Camera 4K',          asin: 'B09X2L3R9T', sku: 'HSC-4K-WHT',    supplierId: 'sup-003', supplierName: 'Direct Import',     price: 124.00, buyboxPrice: 121.99, profit: 35.12, roi: 28.3, sales30d:  812, fbaAvailable:  0,  status: 'Out of Stock', imageColor: COLORS[2] },
  { id: 'prod-004', name: 'Ergonomic Office Chair',           asin: 'B0CL2G8Y5H', sku: 'EOC-MESH-GRY',  supplierId: 'sup-001', supplierName: 'Wholesale Direct',  price: 349.00, buyboxPrice: 345.00, profit: 82.40, roi: 23.6, sales30d:  152, fbaAvailable: 24,  status: 'In Stock',     imageColor: COLORS[3] },
  { id: 'prod-005', name: 'Wireless Noise-Cancel Headphones', asin: 'B0BHV3VWCL', sku: 'WNC-HP-BLK',    supplierId: 'sup-004', supplierName: 'TechDistributors', price: 199.99, buyboxPrice: 197.50, profit: 58.20, roi: 29.1, sales30d:  634, fbaAvailable: 45,  status: 'In Stock',     imageColor: COLORS[4] },
  { id: 'prod-006', name: 'Portable Power Bank 20000mAh',     asin: 'B09C3V2K4P', sku: 'PPB-20K-WHT',   supplierId: 'sup-002', supplierName: 'InventorySource',  price:  45.99, buyboxPrice:  44.99, profit: 12.80, roi: 27.8, sales30d: 2145, fbaAvailable: 230, status: 'In Stock',     imageColor: COLORS[5] },
  { id: 'prod-007', name: 'Premium Yoga Mat Pro',             asin: 'B08X3KL9P2', sku: 'PYM-6MM-BLK',   supplierId: 'sup-006', supplierName: 'SupplyChain Pro', price:  69.99, buyboxPrice:  68.50, profit: 22.15, roi: 31.7, sales30d:  389, fbaAvailable:  8,  status: 'Low Stock',    imageColor: COLORS[0] },
  { id: 'prod-008', name: 'Smart LED Desk Lamp',              asin: 'B0BK9WX1L2', sku: 'SLD-LAMP-BLK',  supplierId: 'sup-003', supplierName: 'Direct Import',    price:  39.99, buyboxPrice:  38.99, profit: 11.20, roi: 28.0, sales30d:  891, fbaAvailable:  0,  status: 'Out of Stock', imageColor: COLORS[1] },
];

let nextId = 100;
const uid = () => `${++nextId}`;

// ─── Suppliers API ─────────────────────────────────────────────────────────────

export const suppliersApi = {
  getAll: async (): Promise<Supplier[]> => {
    await delay(300);
    return [...suppliers];
  },

  getById: async (id: string): Promise<Supplier> => {
    await delay(200);
    const item = suppliers.find(s => s.id === id);
    if (!item) throw new Error('Supplier not found');
    return { ...item };
  },

  create: async (data: CreateSupplierDto): Promise<Supplier> => {
    await delay(400);
    const item: Supplier = { ...data, id: `sup-${uid()}`, createdAt: new Date().toISOString().split('T')[0] };
    suppliers = [item, ...suppliers];
    return item;
  },

  update: async (id: string, data: UpdateSupplierDto): Promise<Supplier> => {
    await delay(400);
    suppliers = suppliers.map(s => s.id === id ? { ...s, ...data } : s);
    return suppliers.find(s => s.id === id)!;
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    suppliers = suppliers.filter(s => s.id !== id);
  },
};

// ─── Products API ──────────────────────────────────────────────────────────────

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    await delay(300);
    return [...products];
  },

  getById: async (id: string): Promise<Product> => {
    await delay(200);
    const item = products.find(p => p.id === id);
    if (!item) throw new Error('Product not found');
    return { ...item };
  },

  create: async (data: CreateProductDto): Promise<Product> => {
    await delay(400);
    const item: Product = { ...data, id: `prod-${uid()}`, imageColor: COLORS[nextId % COLORS.length] };
    products = [item, ...products];
    return item;
  },

  update: async (id: string, data: UpdateProductDto): Promise<Product> => {
    await delay(400);
    products = products.map(p => p.id === id ? { ...p, ...data } : p);
    return products.find(p => p.id === id)!;
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    products = products.filter(p => p.id !== id);
  },
};
