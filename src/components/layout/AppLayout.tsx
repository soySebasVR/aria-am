import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <main className="pl-0 md:pl-64 pt-12 min-h-screen">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
