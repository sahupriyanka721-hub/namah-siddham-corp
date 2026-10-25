import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const StatCard = ({ title, value, icon: Icon, badge, color = 'blue', linkText, onAction }) => {
  const colorStyles = {
    blue: 'bg-sky-50 text-brand-blue border-sky-200',
    orange: 'bg-orange-50 text-brand-orange border-orange-200',
    gold: 'bg-amber-50 text-amber-700 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    navy: 'bg-slate-100 text-brand-navy border-slate-200',
    purple: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    forest: 'bg-sky-50 text-brand-blue border-sky-200',
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </span>
          <div className="font-heading font-black text-3xl text-brand-navy mt-1">
            {value !== undefined ? value : '—'}
          </div>
        </div>
        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-xs ${colorStyles[color] || colorStyles.blue}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-sky-100/80 flex items-center justify-between text-xs">
        {badge && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-brand-blue">
            {badge}
          </span>
        )}
        {linkText && onAction && (
          <button
            onClick={onAction}
            className="text-brand-blue font-bold hover:text-brand-orange inline-flex items-center ml-auto group"
          >
            <span>{linkText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatCard;
