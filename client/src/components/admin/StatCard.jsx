import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  icon: Icon,
  badge,
  color = 'blue',
  linkText,
  onAction,
}) => {
  const colorStyles = {
    blue: {
      icon: 'bg-sky-50 text-brand-blue border-sky-100 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue',
      topLine: 'from-brand-blue to-blue-400',
      badge: 'bg-sky-50 text-brand-blue border-sky-200/60',
    },
    emerald: {
      icon: 'bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600',
      topLine: 'from-emerald-500 to-teal-400',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
    },
    gold: {
      icon: 'bg-amber-50 text-amber-700 border-amber-100 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500',
      topLine: 'from-amber-400 to-amber-200',
      badge: 'bg-amber-50 text-amber-800 border-amber-200/60',
    },
    orange: {
      icon: 'bg-orange-50 text-brand-orange border-orange-100 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange',
      topLine: 'from-brand-orange to-orange-400',
      badge: 'bg-orange-50 text-brand-orange border-orange-200/60',
    },
    purple: {
      icon: 'bg-indigo-50 text-indigo-700 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600',
      topLine: 'from-indigo-500 to-purple-400',
      badge: 'bg-indigo-50 text-indigo-800 border-indigo-200/60',
    },
    navy: {
      icon: 'bg-slate-100 text-brand-navy border-slate-200 group-hover:bg-brand-navy group-hover:text-white group-hover:border-brand-navy',
      topLine: 'from-brand-navy to-slate-600',
      badge: 'bg-slate-100 text-brand-navy border-slate-200',
    },
    forest: {
      icon: 'bg-sky-50 text-brand-blue border-sky-100 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue',
      topLine: 'from-brand-blue to-sky-400',
      badge: 'bg-sky-50 text-brand-blue border-sky-200/60',
    },
  };

  const scheme = colorStyles[color] || colorStyles.blue;

  return (
    <div className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Top Subtle Gradient Accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${scheme.topLine} opacity-80 group-hover:opacity-100 transition-opacity`}
      />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            {title}
          </span>
          <div className="font-heading font-black text-3xl sm:text-4xl text-[#0B132B] tracking-tight">
            {value !== undefined ? value : '—'}
          </div>
        </div>

        {Icon && (
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-all duration-300 ${scheme.icon}`}
          >
            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
        {badge && (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono tracking-tight ${scheme.badge}`}
          >
            {badge}
          </span>
        )}
        {linkText && onAction && (
          <button
            onClick={onAction}
            className="text-brand-blue font-bold hover:text-brand-orange inline-flex items-center ml-auto group/btn transition-colors text-xs"
          >
            <span>{linkText}</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatCard;
