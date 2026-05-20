import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from './components/layout/AppLayout';
import { SupplierListPage }   from './pages/suppliers/SupplierListPage';
import { SupplierDetailPage } from './pages/suppliers/SupplierDetailPage';
import { SupplierFormPage }   from './pages/suppliers/SupplierFormPage';
import { ProductListPage }    from './pages/products/ProductListPage';
import { ProductDetailPage }  from './pages/products/ProductDetailPage';
import { ProductFormPage }    from './pages/products/ProductFormPage';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 30, retry: 1 } },
});

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-text-secondary gap-3">
      <p className="text-4xl">🚧</p>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm">Coming in Sprint 2</p>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/suppliers" replace />} />
          <Route element={<AppLayout />}>
            <Route path="/home"                   element={<PlaceholderPage title="Home Dashboard" />} />
            <Route path="/suppliers"              element={<SupplierListPage />} />
            <Route path="/suppliers/new"          element={<SupplierFormPage />} />
            <Route path="/suppliers/:id"          element={<SupplierDetailPage />} />
            <Route path="/suppliers/:id/edit"     element={<SupplierFormPage />} />
            <Route path="/products"               element={<ProductListPage />} />
            <Route path="/products/new"           element={<ProductFormPage />} />
            <Route path="/products/:id"           element={<ProductDetailPage />} />
            <Route path="/products/:id/edit"      element={<ProductFormPage />} />
            <Route path="/purchase-orders"        element={<PlaceholderPage title="Purchase Orders" />} />
          </Route>
          <Route path="*" element={<Navigate to="/suppliers" replace />} />
        </Routes>
      </HashRouter>
    </QueryClientProvider>
  );
}
