import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || '/admin/dashboard';

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Invalid administrator credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070D1F] relative overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-brand-blue selection:text-white">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[360px] h-[360px] bg-brand-orange/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Decorative subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B2A4A_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        {/* Brand Logo & Corporate Heading */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500" />
            <div className="relative p-3.5 rounded-2xl bg-[#0B132B]/90 backdrop-blur-xl border border-white/20 shadow-2xl">
              <img
                src="/assets/namah-siddham-emblem.svg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/namah-siddham-logo.svg';
                }}
                alt="Namah Siddham Corporation Logo"
                className="h-16 w-auto object-contain mx-auto filter drop-shadow-lg"
              />
            </div>
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl text-white tracking-wider flex items-center justify-center space-x-1.5">
              <span>NAMAH SIDDHAM</span>
            </h2>
            <p className="text-[11px] font-bold text-brand-gold tracking-[0.25em] uppercase font-mono mt-0.5">
              Corporation Private Limited
            </p>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] font-mono text-sky-200 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Secure Admin Management Portal</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/40 space-y-6 relative overflow-hidden">
          {/* Top subtle brand accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange" />

          <div className="space-y-1">
            <h3 className="font-heading font-black text-xl text-brand-navy">
              Authorized Personnel Login
            </h3>
            <p className="text-xs text-surface-500">
              Sign in with your configured administrative credentials.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 flex items-start space-x-2.5 text-xs text-red-800 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Identifier */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Admin Email Identifier
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-surface-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="admin@namahsiddham.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-surface-50/80 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:bg-white text-brand-navy placeholder:text-surface-400 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Secret Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                Secret Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-surface-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm bg-surface-50/80 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:bg-white text-brand-navy placeholder:text-surface-400 transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-brand-navy p-1 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="w-full py-3 text-xs sm:text-sm font-bold shadow-lg shadow-brand-blue/25 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:shadow-brand-blue/40 text-white rounded-xl transition-all duration-300 transform active:scale-[0.99]"
              >
                Authenticate &amp; Access Dashboard
              </Button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-surface-200 text-center space-y-2">
            <div className="inline-flex items-center text-[11px] text-brand-navy font-semibold bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-200/60">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              <span>TLS Encrypted &amp; Rate-Limited Session</span>
            </div>
            <p className="text-[10px] text-surface-400">
              Namah Siddham Corporation Private Limited (CIN: U77100MP2026PTC087531).
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-slate-300 hover:text-brand-gold transition-colors inline-flex items-center space-x-1.5 py-1.5 px-3 rounded-lg hover:bg-white/5"
          >
            <span>← Return to Public Corporate Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
