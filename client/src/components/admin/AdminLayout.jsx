import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

const routeTitles = {
  '/admin/dashboard': 'Dashboard Overview',
  '/admin/services': 'IT Services & Digital Solutions Management',
  '/admin/portfolio': 'Portfolio & Case Studies Management',
  '/admin/platforms': 'Digital Products & Platforms Management',
  '/admin/pages': 'Page Content Management (CMS)',
  '/admin/team': 'Leadership & Team Management',
  '/admin/news': 'News & Corporate Announcements',
  '/admin/careers': 'Job Openings & Vacancies',
  '/admin/inquiries': 'Corporate Contact Inquiries',
  '/admin/partner-inquiries': 'Partnership Inquiries',
  '/admin/applications': 'Recruitment Applications',
  '/admin/legal': 'Legal Policies & Compliance CMS',
  '/admin/settings': 'Company & Identity Settings',
  '/admin/profile': 'Admin Profile & Security',
};

export const AdminLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 border-4 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin" />
        <p className="text-xs font-bold text-brand-navy">Initializing Management Session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  const currentTitle = routeTitles[location.pathname] || 'Administration Portal';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-brand-navy selection:bg-brand-blue selection:text-white">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <AdminHeader setMobileOpen={setMobileOpen} pageTitle={currentTitle} />
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />

          {/* Corporate Admin Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-200/80 text-center flex flex-col sm:flex-row items-center justify-between text-[11px] text-surface-400 gap-2">
            <span>
              Namah Siddham Corporation Private Limited • Bhopal, Madhya Pradesh, India
            </span>
            <span className="font-mono">
              CIN: U77100MP2026PTC087531 • All rights reserved
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
