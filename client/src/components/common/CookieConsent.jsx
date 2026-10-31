import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('namah_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('namah_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('namah_cookie_consent', 'essential_only');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-[#0B1528]/95 backdrop-blur-md text-white rounded-3xl p-5 border border-sky-400/30 shadow-2xl shadow-black/60 space-y-3 relative">
        <button
          onClick={handleDecline}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 text-xs"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start space-x-3 pr-4">
          <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
              <span>Cookie &amp; Session Policy</span>
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              We use essential HTTP cookies and secure tokens to maintain portal security and administrative functionality. Review our{' '}
              <Link to="/cookie-policy" className="text-amber-400 font-semibold hover:underline">
                Cookie Policy
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 pt-1 border-t border-slate-800">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 rounded-xl text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[11px] font-bold shadow-md hover:shadow-sky-500/25 transition"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
