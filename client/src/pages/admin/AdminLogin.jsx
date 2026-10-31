import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Smartphone,
  KeyRound,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Layers,
  Cpu,
  Globe2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const AdminLogin = () => {
  const { login, sendOtp, verifyOtp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mode: 'otp' (Mobile OTP - Primary) or 'password' (Email & Password)
  const [authMode, setAuthMode] = useState('otp');

  // Mobile OTP States
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [receivedOtp, setReceivedOtp] = useState(null);
  const [timer, setTimer] = useState(0);

  // Email & Password States
  const [email, setEmail] = useState('admin@namahsiddham.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // General States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const from = location.state?.from?.pathname || '/admin/dashboard';

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle Send OTP
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);
      if (cleanPhone.length !== 10) {
        throw new Error('Please enter a valid 10-digit mobile number.');
      }

      const res = await sendOtp(cleanPhone);
      setOtpSent(true);
      setTimer(45);
      setSuccessMsg('OTP sent successfully.');
      const code = res?.otp || '123456';
      setReceivedOtp(code);
      setOtp(code); // Auto-fill OTP directly into input field
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);
      const cleanOtp = otp.trim();
      if (!cleanOtp || cleanOtp.length < 4) {
        throw new Error('Please enter the 6-digit verification code.');
      }

      await verifyOtp(cleanPhone, cleanOtp);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP code.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Email & Password Login
  const handlePasswordLogin = async (e) => {
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
    <div className="min-h-screen bg-[#070D1F] relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-10 selection:bg-brand-blue selection:text-white">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-brand-orange/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[350px] h-[350px] bg-brand-gold/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Decorative subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1B2A4A_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Main Container: 2-Column Split (Left: Ecosystem Image, Right: Login Form) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ================= LEFT COLUMN: ECOSYSTEM SHOWCASE ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Header Badge & Brand Info */}
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] font-mono text-sky-200 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Namah Siddham Security &amp; Control Gateway</span>
              </div>

              <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
                Corporate Management Portal
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Unified administration hub for Enterprise IT Services, Digital Product Platforms, and Corporate Operations.
              </p>
            </div>

            {/* Ecosystem Image Card with Glowing Frame */}
            <div className="relative group">
              {/* Outer decorative gradient border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange rounded-3xl blur-lg opacity-60 group-hover:opacity-85 transition duration-500" />
              
              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-[#0B132B]/90 backdrop-blur-xl shadow-2xl">
                <img
                  src="/assets/admin-login-ecosystem.jpg"
                  alt="Namah Siddham Corporation - IT Services and Digital Products Ecosystem"
                  className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
                />

                {/* Bottom subtle banner overlay */}
                <div className="p-4 sm:p-5 bg-gradient-to-t from-[#070D1F] via-[#070D1F]/90 to-transparent border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <Globe2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="text-slate-200 font-semibold">
                      Bhopal HQ • Pan-India Digital Reach
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-300 font-mono">
                    <span className="inline-flex items-center text-brand-gold font-bold">
                      <Cpu className="w-3.5 h-3.5 mr-1" />
                      4 IT Services
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center text-sky-300 font-bold">
                      <Layers className="w-3.5 h-3.5 mr-1" />
                      4 Digital Platforms
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick highlight points */}
            <div className="hidden sm:grid grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-brand-gold font-bold font-heading text-sm">IT Services</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Web, App, Software, Marketing</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-sky-300 font-bold font-heading text-sm">Platforms</div>
                <div className="text-[11px] text-slate-400 mt-0.5">HomeServixo, Carrento, &amp; more</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-emerald-400 font-bold font-heading text-sm">Corporate Portal</div>
                <div className="text-[11px] text-slate-400 mt-0.5">TLS Secured &amp; ISO Compliant</div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: ADMIN LOGIN CARD ================= */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            
            {/* Top Brand Logo for the card */}
            <div className="text-center mb-5 flex flex-col items-center">
              <div className="relative group mb-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue to-brand-gold rounded-2xl blur-sm opacity-70" />
                <div className="relative p-2.5 rounded-xl bg-[#0B132B]/90 backdrop-blur-md border border-white/20 shadow-lg">
                  <img
                    src="/assets/namah-siddham-emblem.svg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/namah-siddham-logo.svg';
                    }}
                    alt="Namah Siddham Corporation"
                    className="h-12 w-auto object-contain mx-auto"
                  />
                </div>
              </div>
              <h2 className="font-heading font-black text-xl text-white tracking-wider">
                NAMAH SIDDHAM
              </h2>
              <p className="text-[10px] font-bold text-brand-gold tracking-[0.25em] uppercase font-mono">
                Corporation Private Limited
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 space-y-5 relative overflow-hidden">
              {/* Top brand gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange" />

              {/* Card Heading */}
              <div className="space-y-1">
                <h3 className="font-heading font-black text-xl text-brand-navy">
                  Authorized Personnel Login
                </h3>
                <p className="text-xs text-surface-500">
                  Sign in to manage corporate services, digital platforms, and company data.
                </p>
              </div>

              {/* Authentication Mode Switcher Tabs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-surface-100 rounded-2xl border border-surface-200">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('otp');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    authMode === 'otp'
                      ? 'bg-white text-brand-blue shadow-md border border-surface-200/80'
                      : 'text-surface-600 hover:text-brand-navy'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Mobile OTP</span>
                  <span className="ml-1 text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                    Instant
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('password');
                    setError(null);
                    setSuccessMsg(null);
                  }}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    authMode === 'password'
                      ? 'bg-white text-brand-blue shadow-md border border-surface-200/80'
                      : 'text-surface-600 hover:text-brand-navy'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-brand-navy" />
                  <span>Email &amp; Password</span>
                </button>
              </div>

              {/* Error Notice */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-start space-x-2.5 text-xs text-red-800 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success / Info Notice */}
              {successMsg && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start space-x-2.5 text-xs text-emerald-800 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Mode 1: Mobile Number & OTP */}
              {authMode === 'otp' && (
                <div className="space-y-4">
                  {!otpSent ? (
                    /* Step 1: Enter Mobile Number */
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                          Mobile Number
                        </label>
                        <div className="relative flex rounded-xl border border-surface-300 focus-within:ring-2 focus-within:ring-brand-blue focus-within:border-brand-blue overflow-hidden shadow-inner bg-surface-50/80">
                          <span className="inline-flex items-center px-3.5 text-xs font-bold text-brand-navy bg-surface-100 border-r border-surface-200">
                            🇮🇳 +91
                          </span>
                          <input
                            type="tel"
                            maxLength="10"
                            required
                            placeholder="Enter mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            className="w-full px-3 py-2.5 text-sm bg-transparent text-brand-navy placeholder:text-surface-400 focus:outline-none font-medium tracking-wider"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        className="w-full py-3 text-xs sm:text-sm font-bold shadow-lg shadow-brand-blue/25 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:shadow-brand-blue/40 text-white rounded-xl transition-all duration-300"
                      >
                        <span>Send Verification OTP</span>
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </form>
                  ) : (
                    /* Step 2: Enter 6-digit OTP */
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider">
                            Enter 6-Digit Verification OTP
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setOtpSent(false);
                              setOtp('');
                              setReceivedOtp(null);
                            }}
                            className="text-[11px] font-semibold text-brand-blue hover:underline"
                          >
                            Change Number
                          </button>
                        </div>

                        <div className="relative">
                          <KeyRound className="w-4 h-4 text-surface-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            maxLength="6"
                            required
                            autoFocus
                            placeholder="••••••"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            className="w-full pl-10 pr-4 py-3 text-center text-lg sm:text-xl font-mono tracking-[0.5em] bg-surface-50/80 border border-surface-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:bg-white text-brand-navy font-bold transition-all shadow-inner"
                          />
                        </div>

                        {/* Instant OTP Display & Auto-Fill Badge */}
                        {receivedOtp && (
                          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between text-xs text-emerald-900 shadow-sm animate-fadeIn">
                            <div className="flex items-center space-x-2">
                              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                              <span>
                                Verification Code: <b className="font-mono text-sm tracking-widest text-emerald-950 font-black">{receivedOtp}</b>
                              </span>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-md">
                              ✓ Auto-Filled
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-surface-500">
                        <span>Didn't receive code?</span>
                        {timer > 0 ? (
                          <span className="font-mono text-brand-blue">Resend in {timer}s</span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="font-semibold text-brand-blue hover:underline inline-flex items-center space-x-1"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Resend OTP</span>
                          </button>
                        )}
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        className="w-full py-3 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:shadow-emerald-600/40 text-white rounded-xl transition-all duration-300"
                      >
                        <span>Verify OTP &amp; Enter Dashboard</span>
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </form>
                  )}
                </div>
              )}

              {/* Mode 2: Email & Password */}
              {authMode === 'password' && (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
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
                      className="w-full py-3 text-xs sm:text-sm font-bold shadow-lg shadow-brand-blue/25 bg-gradient-to-r from-brand-blue via-blue-600 to-brand-blue hover:shadow-brand-blue/40 text-white rounded-xl transition-all duration-300"
                    >
                      Authenticate &amp; Access Dashboard
                    </Button>
                  </div>
                </form>
              )}

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

            {/* Back link */}
            <div className="mt-5 text-center">
              <a
                href="https://namahsiddham.in"
                className="text-xs text-slate-300 hover:text-brand-gold transition-colors inline-flex items-center space-x-1.5 py-1.5 px-3 rounded-lg hover:bg-white/5"
              >
                <span>← Return to Public Corporate Website (namahsiddham.in)</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
