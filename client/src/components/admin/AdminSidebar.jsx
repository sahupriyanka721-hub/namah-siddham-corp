import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  Layers,
  FolderGit2,
  FileCode,
  FileText,
  Users2,
  Newspaper,
  Briefcase,
  Mail,
  Handshake,
  UserCheck,
  Scale,
  Settings,
  UserCircle,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAvatarSrc } from '../../utils/imageCompressor';

const menuGroups = [
  {
    title: 'Core Management',
    items: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Digital Solutions & CMS',
    items: [
      { name: 'IT Services', path: '/admin/services', icon: Code2 },
      { name: 'Digital Platforms', path: '/admin/platforms', icon: Layers },
      { name: 'Portfolio Projects', path: '/admin/portfolio', icon: FolderGit2 },
      { name: 'Page Content CMS', path: '/admin/pages', icon: FileCode },
    ],
  },
  {
    title: 'People & Communications',
    items: [
      { name: 'Leadership & Team', path: '/admin/team', icon: Users2 },
      { name: 'News & Updates', path: '/admin/news', icon: Newspaper },
      { name: 'Job Openings', path: '/admin/careers', icon: Briefcase },
    ],
  },
  {
    title: 'Inquiries & Leads',
    items: [
      { name: 'Contact Inquiries', path: '/admin/inquiries', icon: Mail },
      { name: 'Partner Inquiries', path: '/admin/partner-inquiries', icon: Handshake },
      { name: 'Job Applications', path: '/admin/applications', icon: UserCheck },
    ],
  },
  {
    title: 'Governance & Settings',
    items: [
      { name: 'Client Agreements', path: '/admin/agreements', icon: FileText },
      { name: 'Legal Policies CMS', path: '/admin/legal', icon: Scale },
      { name: 'Company Settings', path: '/admin/settings', icon: Settings },
      { name: 'Admin Profile', path: '/admin/profile', icon: UserCircle },
    ],
  },
];

export const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const { admin } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#070D1F]/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B132B] text-slate-300 border-r border-[#1B2A4A] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-[#1B2A4A] flex items-center justify-between bg-[#070D1F]/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-white/10 border border-white/15 shadow-sm ring-1 ring-brand-gold/30 backdrop-blur-md">
              <img
                src="/assets/namah-siddham-emblem.svg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/namah-siddham-logo.svg';
                }}
                alt="Namah Siddham Emblem"
                className="h-9 w-auto object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-sm text-white tracking-wider leading-tight">
                NAMAH SIDDHAM
              </span>
              <span className="text-[9px] font-bold text-brand-gold tracking-widest uppercase font-mono mt-0.5">
                CONTROL CENTER
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List with Grouped Categories */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs scrollbar-thin scrollbar-thumb-[#1B2A4A] scrollbar-track-transparent">
          {menuGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400/80 uppercase tracking-widest font-mono">
                {group.title}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-blue to-blue-600 text-white font-bold shadow-md shadow-brand-blue/25 ring-1 ring-white/10'
                          : 'text-slate-300 hover:bg-[#13203C] hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center space-x-2.5">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive
                                ? 'text-white'
                                : 'text-slate-400 group-hover:text-brand-gold'
                            }`}
                          />
                          <span className="truncate">{item.name}</span>
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-sm shrink-0" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Pinned Admin Profile Quick Access Card */}
        <div className="p-3 border-t border-[#1B2A4A] bg-[#070D1F]/50">
          <NavLink
            to="/admin/profile"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2.5 rounded-2xl transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-brand-blue to-blue-600 text-white font-bold border-white/20 shadow-md ring-1 ring-white/10'
                  : 'bg-[#13203C]/90 hover:bg-[#1B2A4A] text-slate-200 border-[#1B2A4A] hover:border-brand-gold/40'
              }`
            }
          >
            <div className="relative shrink-0">
              {admin?.avatarUrl || admin?.localAvatar ? (
                <img
                  src={getAvatarSrc(admin.avatarUrl || admin.localAvatar)}
                  alt={admin.name || 'Admin'}
                  onError={(e) => {
                    if (admin.localAvatar && e.currentTarget.src !== admin.localAvatar) {
                      e.currentTarget.src = admin.localAvatar;
                    }
                  }}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-gold/60"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-blue-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-brand-gold/60">
                  <UserCircle className="w-5 h-5" />
                </div>
              )}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0B132B]" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-xs font-bold truncate text-white">
                {admin?.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-brand-gold font-mono uppercase tracking-wider flex items-center justify-between">
                <span>Admin Profile</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </NavLink>
        </div>

        {/* Corporate Identity & View Public Site Footer */}
        <div className="p-3 border-t border-[#1B2A4A] bg-[#070D1F]/60 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#13203C]/90 hover:bg-brand-blue/20 text-slate-200 hover:text-brand-gold text-xs font-semibold transition-all border border-[#1B2A4A] group"
          >
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
              <span>Open Public Site</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-gold transition-colors" />
          </a>
          <div className="text-[9px] text-slate-400 font-mono text-center tracking-tight">
            CIN: U77100MP2026PTC087531
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
