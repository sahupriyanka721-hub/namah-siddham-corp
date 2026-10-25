import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-gradient-to-r from-brand-blue to-blue-600 text-white hover:from-blue-700 hover:to-brand-blue focus:ring-brand-blue shadow-md shadow-brand-blue/25 font-bold',
    gold:
      'bg-gradient-to-r from-brand-gold to-brand-orange text-white font-bold hover:from-amber-400 hover:to-orange-500 focus:ring-brand-orange shadow-md shadow-brand-orange/20',
    orange:
      'bg-gradient-to-r from-brand-orange to-orange-600 text-white font-bold hover:from-orange-600 hover:to-orange-700 focus:ring-brand-orange shadow-md shadow-brand-orange/20',
    secondary:
      'bg-sky-50 text-brand-blue hover:bg-sky-100 border border-sky-200 focus:ring-brand-blue font-semibold',
    outline:
      'border-2 border-brand-blue text-brand-blue hover:bg-sky-50 focus:ring-brand-blue font-bold',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-soft-sm font-bold',
    ghost:
      'text-brand-navy hover:bg-sky-50 hover:text-brand-blue font-semibold',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 mr-2 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
