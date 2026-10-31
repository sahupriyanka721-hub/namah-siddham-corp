import React from 'react';
import { Menu, LogOut, User, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminHeader = ({ setMobileOpen, pageTitle }) => {
  const { admin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-surface-200/90 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs relative">
      {/* Top Brand Accent Line */}
      <div className="h-0.5 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange w-full absolute top-0 left-0" />

      {/* Left: Mobile Toggle & Page Title with Breadcrumb */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open mobile navigation"
          className="lg:hidden p-2 rounded-xl text-surface-600 hover:bg-surface-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-brand-navy" />
        </button>

        <div className="space-y-0.5">
          <div className="hidden sm:flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-wider text-surface-400">
            <span className="text-brand-blue font-bold">Portal</span>
            <span>/</span>
            <span className="text-surface-500 font-semibold truncate max-w-[200px]">
              {pageTitle || 'Control Panel'}
            </span>
          </div>
          <h2 className="font-heading font-black text-lg sm:text-xl text-brand-navy capitalize tracking-tight leading-tight">
            {pageTitle || 'Dashboard Overview'}
          </h2>
        </div>
      </div>

      {/* Right: Quick Site Link, Admin Profile & Logout */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Quick link to live public site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          title="Open Public Website"
          className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-brand-navy bg-surface-100 hover:bg-sky-50 hover:text-brand-blue hover:border-sky-200 border border-transparent transition-all"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {/* Admin User Info Chip */}
        {admin && (
          <div className="flex items-center space-x-2.5 sm:pl-2 sm:border-l sm:border-surface-200">
            <div className="relative">
              {admin.avatarUrl ? (
                <img
                  src={admin.avatarUrl}
                  alt={admin.name || 'Admin'}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-gold/50 shadow-xs"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-blue-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-brand-gold/50 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                title="Active Session"
              />
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-bold text-brand-navy truncate max-w-[120px]">
                {admin.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-brand-orange font-bold uppercase tracking-wider font-mono">
                {admin.role || 'Super Admin'}
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={logout}
          title="Sign Out of Portal"
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-surface-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all inline-flex items-center text-xs font-semibold group"
        >
          <LogOut className="w-4 h-4 sm:mr-1.5 text-surface-400 group-hover:text-red-600 transition-colors" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
