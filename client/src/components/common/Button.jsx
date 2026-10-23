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
      'bg-gradient-to-r from-royal-500 to-royal-600 text-white hover:from-royal-600 hover:to-royal-700 focus:ring-royal-400 shadow-md shadow-royal-500/20 font-bold',
    gold:
      'bg-gradient-to-r from-gold-500 to-orange-500 text-white font-bold hover:from-gold-400 hover:to-orange-400 focus:ring-orange-400 shadow-md shadow-orange-500/20',
    orange:
      'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:from-orange-600 hover:to-orange-700 focus:ring-orange-400 shadow-md shadow-orange-500/20',
    secondary:
      'bg-royal-50 text-royal-700 hover:bg-royal-100 border border-royal-200 focus:ring-royal-500 font-semibold',
    outline:
      'border-2 border-royal-500 text-royal-600 hover:bg-royal-50 focus:ring-royal-500 font-bold',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-soft-sm font-bold',
    ghost:
      'text-navy-800 hover:bg-royal-50 hover:text-royal-600 font-semibold',
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
