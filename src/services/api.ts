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
  {
    id: 'sup-001', company: 'SilverLine Distribution Inc', sku: 'SLD-NORTH-02',
    address: '1250 West Fulton Market St, Chicago, IL · 60607',
    contact: 'John Smith', email: 'info@silverlinedist.com',
    phone: '312-555-7842', website: 'https://www.silverlinedist.com',
    nifDocument: 'WD-2024-001', status: 'Active',
    moq: 1000, freeDelivery: 800, leadTime: '10 days',
    bankName: 'Midwest Business Bank', routingNumber: '071000013', accountNumber: '762904518203',
    createdAt: '2024-01-15',
  },
  {
    id: 'sup-002', company: 'BluePeak Trading LLC', sku: 'BPT-ARIA-01',
    address: '742 Evergreen Industrial Blvd, Austin, TX · 78701',
    contact: 'Maria Gonzalez', email: 'sales@bluepeak.com',
    phone: '512-555-9341', website: 'https://www.bluepeaktrading.com',
    nifDocument: 'BP-2024-002', status: 'Active',
    moq: 500, freeDelivery: 600, leadTime: '5 days',
    bankName: 'Lone Star Federal Bank', routingNumber: '114000093', accountNumber: '548210934756',
    createdAt: '2024-02-03',
  },
  {
    id: 'sup-003', company: 'HANAN123', sku: 'PF-SW-7-BLK',
    address: '—',
    contact: '—', email: 'contact@hanan123.com',
    phone: '—', website: '—',
    nifDocument: 'HN-2024-003', status: 'Active',
    moq: 300, freeDelivery: 400, leadTime: '7 days',
    bankName: '—', routingNumber: '—', accountNumber: '—',
    createdAt: '2024-02-20',
  },
  {
    id: 'sup-004', company: 'STARK', sku: 'STRK100',
    address: '—',
    contact: 'contact@wholesaledirect.com', email: 'contact@wholesaledirect.com',
    phone: '—', website: '—',
    nifDocument: 'STK-2024-004', status: 'Archived',
    moq: 500, freeDelivery: 500, leadTime: '7 days',
    bankName: '—', routingNumber: '—', accountNumber: '—',
    createdAt: '2024-03-01',
  },
  {
    id: 'sup-005', company: 'EuroParts GmbH', sku: 'EP-DE-001',
    address: 'Alexanderplatz 1, Berlin · 10178',
    contact: 'Hans Mueller', email: 'kontakt@europarts.de',
    phone: '+49-30-555-8812', website: 'https://www.europarts.de',
    nifDocument: 'EP-2024-005', status: 'In Stock',
    moq: 750, freeDelivery: 1000, leadTime: '14 days',
    bankName: 'Deutsche Handelsbank', routingNumber: 'DEUT-DE-DB', accountNumber: 'DE44500105175407324931',
    createdAt: '2024-03-10',
  },
  {
    id: 'sup-006', company: 'SupplyChain Pro', sku: 'SC-MX-PRO',
    address: 'Av. Insurgentes Sur 1457, CDMX · 03900',
    contact: 'Carlos Rivera', email: 'ventas@scpro.mx',
    phone: '+52-55-555-4412', website: 'https://www.scpro.mx',
    nifDocument: 'SC-2024-006', status: 'Active',
    moq: 600, freeDelivery: 700, leadTime: '6 days',
    bankName: 'Banco del Comercio', routingNumber: 'BCMX-MX-00', accountNumber: '021000021987654321',
    createdAt: '2024-04-05',
  },
];

let products: Product[] = [
  {
    id: 'prod-001', asin: 'B08L5L8T8V', name: 'Pro Fit Smartwatch Series 7', sku: 'PF-SW-7-BLK',
    description: 'Double Straps, Bluetooth Call, Text Notification, Heart Rate Monitor Watch, Blood Pressure Watch, Sleep Tracker, Activity Tracker, Calorie Tracker Watch, Pedometer Watch, Weather Information, Music, Camera, Alarm Clock, Calculator',
    catalogPage: 15, casePack: 24, casePrice: 149.99, unitPrice: 42.30,
    upc: '194644034815', status: 'In Stock', imageColor: COLORS[0],
    profit: 42.30, margin: 20.65, roi: 34.2, buyboxPrice: 22.50, fbaAvailable: 84,
    sales90d: 38, sales60d: 21, sales30d: 18, sales15d: 14, sales7d: 7,
  },
  {
    id: 'prod-002', asin: 'B07ZPKN671', name: 'Velocity Elite Runners', sku: 'VER-RED-M9',
    description: 'Premium running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole for all-terrain performance.',
    catalogPage: 5, casePack: 12, casePrice: 89.50, unitPrice: 18.45,
    upc: '072486123456', status: 'Low Stock', imageColor: COLORS[1],
    profit: 18.45, margin: 17.2, roi: 21.8, buyboxPrice: 15.99, fbaAvailable: 12,
    sales90d: 92, sales60d: 61, sales30d: 28, sales15d: 16, sales7d: 9,
  },
  {
    id: 'prod-003', asin: 'B09X2L3R9T', name: 'Home Security Camera 4K', sku: 'HSC-4K-WHT',
    description: '4K Ultra HD indoor/outdoor security camera with night vision, two-way audio, motion detection, and cloud storage.',
    catalogPage: 16, casePack: 6, casePrice: 121.99, unitPrice: 35.12,
    upc: '195553019876', status: 'Out of Stock', imageColor: COLORS[2],
    profit: 35.12, margin: 28.3, roi: 28.3, buyboxPrice: 28.00, fbaAvailable: 0,
    sales90d: 54, sales60d: 34, sales30d: 12, sales15d: 5, sales7d: 0,
  },
  {
    id: 'prod-004', asin: 'B0CL2G8Y5H', name: 'Ergonomic Office Chair', sku: 'EOC-MESH-GRY',
    description: 'Adjustable lumbar support, breathable mesh back, 3D armrests, and synchronized tilt mechanism for all-day comfort.',
    catalogPage: 8, casePack: 4, casePrice: 345.00, unitPrice: 82.40,
    upc: '048107221394', status: 'In Stock', imageColor: COLORS[3],
    profit: 82.40, margin: 23.6, roi: 23.6, buyboxPrice: 70.00, fbaAvailable: 24,
    sales90d: 48, sales60d: 32, sales30d: 18, sales15d: 9, sales7d: 4,
  },
  {
    id: 'prod-005', asin: 'B0BHV3VWCL', name: 'Wireless Noise-Cancel Headphones', sku: 'WNC-HP-BLK',
    description: 'Industry-leading active noise cancellation, 30-hour battery life, premium Hi-Res Audio drivers, and comfortable over-ear design.',
    catalogPage: 11, casePack: 8, casePrice: 199.99, unitPrice: 58.20,
    upc: '087547321098', status: 'In Stock', imageColor: COLORS[4],
    profit: 58.20, margin: 29.1, roi: 29.1, buyboxPrice: 49.99, fbaAvailable: 45,
    sales90d: 72, sales60d: 50, sales30d: 28, sales15d: 18, sales7d: 11,
  },
  {
    id: 'prod-006', asin: 'B09C3V2K4P', name: 'Portable Power Bank 20000mAh', sku: 'PPB-20K-WHT',
    description: '20000mAh capacity with 65W USB-C PD fast charging, supports pass-through charging, LED display, and compact form factor.',
    catalogPage: 3, casePack: 20, casePrice: 45.99, unitPrice: 12.80,
    upc: '076174543210', status: 'In Stock', imageColor: COLORS[5],
    profit: 12.80, margin: 27.8, roi: 27.8, buyboxPrice: 11.00, fbaAvailable: 230,
    sales90d: 198, sales60d: 130, sales30d: 72, sales15d: 38, sales7d: 19,
  },
  {
    id: 'prod-007', asin: 'B08X3KL9P2', name: 'Premium Yoga Mat Pro', sku: 'PYM-6MM-BLK',
    description: 'Non-slip 6mm thick TPE eco-friendly yoga mat with alignment lines, carrying strap, and moisture-resistant surface.',
    catalogPage: 22, casePack: 10, casePrice: 69.99, unitPrice: 22.15,
    upc: '093498765432', status: 'Low Stock', imageColor: COLORS[0],
    profit: 22.15, margin: 31.7, roi: 31.7, buyboxPrice: 19.00, fbaAvailable: 8,
    sales90d: 61, sales60d: 39, sales30d: 21, sales15d: 12, sales7d: 6,
  },
  {
    id: 'prod-008', asin: 'B0BK9WX1L2', name: 'Smart LED Desk Lamp', sku: 'SLD-LAMP-BLK',
    description: 'Adjustable color temperature (2700K–6500K), 10 brightness levels, USB charging port, memory function, and eye-care technology.',
    catalogPage: 19, casePack: 12, casePrice: 39.99, unitPrice: 11.20,
    upc: '054318921765', status: 'Out of Stock', imageColor: COLORS[1],
    profit: 11.20, margin: 28.0, roi: 28.0, buyboxPrice: 9.50, fbaAvailable: 0,
    sales90d: 115, sales60d: 72, sales30d: 35, sales15d: 18, sales7d: 0,
  },
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
