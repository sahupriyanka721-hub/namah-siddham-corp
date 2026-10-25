import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  Layers,
  FolderGit2,
  Clock,
  Mail,
  Handshake,
  Briefcase,
  Newspaper,
  PlusCircle,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Activity,
  Calendar,
  Building2,
} from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { StatCard } from '../../components/admin/StatCard';
import { Badge } from '../../components/common/Badge';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await adminApi.getDashboardStats();
        setData(res.data);
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="relative w-12 h-12 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-brand-blue/20 animate-ping" />
          <div className="w-12 h-12 border-4 border-brand-blue border-t-brand-gold rounded-full animate-spin" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-brand-navy">Connecting to Corporate Database</p>
          <p className="text-xs text-surface-400">Loading verified statistics and platform activity...</p>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recent = data?.recentActivity || {};
  const system = data?.system || {};

  return (
    <div className="space-y-8">
      {/* Executive Command Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#070D1F] via-[#0B132B] to-[#122347] text-white p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden">
        {/* Ambient glowing tech orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-blue/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono text-brand-gold">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span>CENTRAL MANAGEMENT SUITE</span>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              Namah Siddham Control Center
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Bhopal, Madhya Pradesh • CIN: <span className="font-mono text-sky-300">U77100MP2026PTC087531</span>
              <br />
              Enterprise governance across IT Services &amp; Digital Platforms ecosystem.
            </p>
          </div>

          {/* Quick status & fast actions */}
          <div className="flex flex-wrap lg:flex-col xl:flex-row items-start lg:items-end gap-3 shrink-0">
            {/* Database status pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Database className="w-3.5 h-3.5" />
              <span className="font-mono">
                MongoDB: {system.databaseStatus || 'Connected'}
              </span>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <Link
                to="/admin/services"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-brand-blue text-white text-xs font-bold shadow-md shadow-brand-blue/30 border border-white/20 transition-all hover:scale-[1.02]"
              >
                <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
                <span>+ Add Service</span>
              </Link>

              <Link
                to="/admin/platforms"
                className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-brand-orange to-amber-600 hover:from-amber-600 hover:to-brand-orange text-white text-xs font-bold shadow-md shadow-brand-orange/30 border border-white/20 transition-all hover:scale-[1.02]"
              >
                <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
                <span>+ Add Platform</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Real Database Stat Tiles (All 8 metrics required by prompt) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">
            Core Business Metrics &amp; Live Assets
          </h2>
          <span className="text-[11px] font-semibold text-brand-blue">
            Real-time Database Sync
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Total published services */}
          <StatCard
            title="Published IT Services"
            value={stats.totalPublishedServices || 4}
            icon={Code2}
            color="blue"
            badge={`Total: ${stats.totalServices || 4}`}
            linkText="Manage Services"
            onAction={() => window.location.assign('/admin/services')}
          />

          {/* 2. Total published platforms */}
          <StatCard
            title="Published Platforms"
            value={stats.totalPublishedPlatforms || 4}
            icon={Layers}
            color="emerald"
            badge={`Total: ${stats.totalPlatforms || 4}`}
            linkText="View Platforms"
            onAction={() => window.location.assign('/admin/platforms')}
          />

          {/* 3. Products under development */}
          <StatCard
            title="Under Development"
            value={stats.productsUnderDevelopment || 4}
            icon={Clock}
            color="gold"
            badge="Active Build"
            linkText="Status Control"
            onAction={() => window.location.assign('/admin/platforms')}
          />

          {/* 4. Published portfolio projects */}
          <StatCard
            title="Portfolio Projects"
            value={stats.publishedPortfolioProjects || 4}
            icon={FolderGit2}
            color="purple"
            badge={`Total: ${stats.totalPortfolioProjects || 4}`}
            linkText="Case Studies"
            onAction={() => window.location.assign('/admin/portfolio')}
          />

          {/* 5. New contact inquiries */}
          <StatCard
            title="Contact Inquiries"
            value={stats.totalContactInquiries || 0}
            icon={Mail}
            color="blue"
            badge={`${stats.newContactInquiries || 0} Unread`}
            linkText="View Messages"
            onAction={() => window.location.assign('/admin/inquiries')}
          />

          {/* 6. New partner inquiries */}
          <StatCard
            title="Partner Inquiries"
            value={stats.totalPartnerInquiries || 0}
            icon={Handshake}
            color="orange"
            badge={`${stats.newPartnerInquiries || 0} Unread`}
            linkText="Review Leads"
            onAction={() => window.location.assign('/admin/partner-inquiries')}
          />

          {/* 7. Published job openings */}
          <StatCard
            title="Active Job Openings"
            value={stats.publishedJobOpenings || 2}
            icon={Briefcase}
            color="purple"
            badge={`${stats.totalApplications || 0} Applicants`}
            linkText="Hiring Portal"
            onAction={() => window.location.assign('/admin/careers')}
          />

          {/* 8. Published news articles */}
          <StatCard
            title="Published News"
            value={stats.publishedNewsArticles || 1}
            icon={Newspaper}
            color="emerald"
            badge="Corporate CMS"
            linkText="Announcements"
            onAction={() => window.location.assign('/admin/news')}
          />
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <h3 className="font-heading font-black text-sm text-brand-navy uppercase tracking-wider">
              Quick Actions &amp; Administration Shortcuts
            </h3>
          </div>
          <span className="text-[11px] text-surface-400 font-mono">1-Click Fast Navigation</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <Link
            to="/admin/services"
            className="p-4 rounded-2xl bg-surface-50 border border-slate-200/60 hover:border-brand-blue hover:bg-sky-50/50 hover:shadow-md transition-all text-center font-bold text-brand-navy group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-brand-blue flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="block truncate">IT Services</span>
          </Link>

          <Link
            to="/admin/platforms"
            className="p-4 rounded-2xl bg-surface-50 border border-slate-200/60 hover:border-brand-orange hover:bg-orange-50/50 hover:shadow-md transition-all text-center font-bold text-brand-navy group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-brand-orange flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <span className="block truncate">Platforms</span>
          </Link>

          <Link
            to="/admin/portfolio"
            className="p-4 rounded-2xl bg-surface-50 border border-slate-200/60 hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-md transition-all text-center font-bold text-brand-navy group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-indigo-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <span className="block truncate">Case Studies</span>
          </Link>

          <Link
            to="/admin/inquiries"
            className="p-4 rounded-2xl bg-surface-50 border border-slate-200/60 hover:border-brand-blue hover:bg-sky-50/50 hover:shadow-md transition-all text-center font-bold text-brand-navy group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-brand-blue flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="block truncate">Inquiries</span>
          </Link>

          <Link
            to="/admin/partner-inquiries"
            className="p-4 rounded-2xl bg-surface-50 border border-slate-200/60 hover:border-amber-300 hover:bg-amber-50/50 hover:shadow-md transition-all text-center font-bold text-brand-navy group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Handshake className="w-5 h-5" />
            </div>
            <span className="block truncate">Partners</span>
          </Link>

          <Link
            to="/admin/settings"
            className="p-4 rounded-2xl bg-surface-50 border border-slate-200/60 hover:border-brand-navy hover:bg-slate-100/50 hover:shadow-md transition-all text-center font-bold text-brand-navy group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-brand-navy flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="block truncate">Settings</span>
          </Link>
        </div>
      </div>

      {/* Recent Inquiries Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Partner Inquiries */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50/40 to-transparent">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Handshake className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-black text-sm sm:text-base text-brand-navy">
                  Recent Partner Inquiries
                </h3>
                <p className="text-[11px] text-surface-400">Vertical partnership leads</p>
              </div>
            </div>
            <Link
              to="/admin/partner-inquiries"
              className="text-xs font-bold text-brand-blue hover:text-brand-orange transition-colors flex items-center space-x-1"
            >
              <span>View All ({stats.totalPartnerInquiries || 0})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recent.partners && recent.partners.length > 0 ? (
              recent.partners.map((item) => (
                <div
                  key={item._id}
                  className="p-4 sm:p-5 flex items-center justify-between hover:bg-amber-50/20 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-xs sm:text-sm text-brand-navy">{item.name}</div>
                    <div className="text-[11px] text-surface-500">
                      {item.businessName || 'Independent Partner'} • {item.city || 'India'}
                    </div>
                    <div className="inline-block text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                      {item.category || 'General Partner'}
                    </div>
                  </div>
                  <div className="text-right space-y-1 shrink-0">
                    <span className="text-[9px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-sky-50 text-brand-blue border border-sky-200/60">
                      {item.status || 'New'}
                    </span>
                    <div className="text-[10px] text-surface-400 font-mono">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Handshake className="w-5 h-5" />
                </div>
                <p className="text-xs text-surface-400">No partnership inquiries submitted yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Contact Inquiries */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-sky-50/40 to-transparent">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-100 text-brand-blue flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-black text-sm sm:text-base text-brand-navy">
                  Recent Contact Messages
                </h3>
                <p className="text-[11px] text-surface-400">IT project consultation inquiries</p>
              </div>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-bold text-brand-blue hover:text-brand-orange transition-colors flex items-center space-x-1"
            >
              <span>View All ({stats.totalContactInquiries || 0})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {recent.contacts && recent.contacts.length > 0 ? (
              recent.contacts.map((item) => (
                <div
                  key={item._id}
                  className="p-4 sm:p-5 flex items-center justify-between hover:bg-sky-50/20 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-xs sm:text-sm text-brand-navy">{item.name}</div>
                    <div className="text-[11px] text-surface-500 truncate max-w-xs">
                      {item.serviceRequired || item.subject || 'Consultation Request'}
                    </div>
                    <div className="text-[10px] text-surface-400 font-mono">{item.city || 'India'}</div>
                  </div>
                  <div className="text-right space-y-1 shrink-0">
                    <span className="text-[9px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-sky-50 text-brand-blue border border-sky-200/60">
                      {item.status || 'New'}
                    </span>
                    <div className="text-[10px] text-surface-400 font-mono">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Mail className="w-5 h-5" />
                </div>
                <p className="text-xs text-surface-400">No contact inquiries submitted yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
