import React from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminHeader = ({ setMobileOpen, pageTitle }) => {
  const { admin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-surface-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs relative">
      {/* Top Brand Accent Line */}
      <div className="h-0.5 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange w-full absolute top-0 left-0" />

      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-surface-600 hover:bg-surface-100"
        >
          <Menu className="w-5 h-5 text-brand-navy" />
        </button>
        <div>
          <h2 className="font-heading font-black text-lg text-brand-navy capitalize tracking-tight">
            {pageTitle || 'Portal Dashboard'}
          </h2>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {admin && (
          <div className="hidden sm:flex items-center space-x-3 text-right">
            <div>
              <div className="text-xs font-bold text-brand-navy">{admin.name}</div>
              <div className="text-[10px] text-brand-orange font-bold uppercase tracking-wider">{admin.role || 'Administrator'}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-blue-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-brand-gold/40 shadow-xs">
              <User className="w-4 h-4" />
            </div>
          </div>
        )}

        <button
          onClick={logout}
          title="Sign Out"
          className="p-2 rounded-xl text-surface-500 hover:text-red-700 hover:bg-red-50 transition-colors inline-flex items-center text-xs font-semibold"
        >
          <LogOut className="w-4 h-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
