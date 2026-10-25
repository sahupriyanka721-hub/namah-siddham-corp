import React from 'react';

export const Badge = ({ children, status = 'default', className = '' }) => {
  const statusStyles = {
    Published: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
    Live: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
    'Under Development': 'bg-amber-50 text-brand-orange border-amber-200 font-bold',
    'Coming Soon': 'bg-sky-50 text-brand-blue border-sky-200 font-bold',
    Hidden: 'bg-slate-100 text-slate-600 border-slate-300',
    Draft: 'bg-slate-100 text-slate-700 border-slate-200',
    Archived: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    Closed: 'bg-red-50 text-red-700 border-red-200',
    New: 'bg-sky-50 text-brand-blue border-sky-200 font-bold',
    'In Progress': 'bg-amber-50 text-brand-orange border-amber-200 font-bold',
    Contacted: 'bg-purple-50 text-purple-700 border-purple-200',
    Resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    default: 'bg-sky-50 text-brand-blue border-sky-200 font-semibold',
  };

  const style = statusStyles[status] || statusStyles.default;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}
    >
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current opacity-70"></span>
      {children || status}
    </span>
  );
};

export default Badge;
