import React, { useState, useEffect } from 'react';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if splash already shown this session to avoid annoyance on every route change,
    // but show on initial visit or refresh
    const timer1 = setTimeout(() => setProgress(45), 250);
    const timer2 = setTimeout(() => setProgress(80), 550);
    const timer3 = setTimeout(() => setProgress(100), 900);
    const timer4 = setTimeout(() => setFadeOut(true), 1100);
    const timer5 = setTimeout(() => setLoading(false), 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-950 transition-opacity duration-500 ease-out select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-royal-500/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gold-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center space-y-6">
        {/* Animated Brand Emblem Container */}
        <div className="relative group">
          {/* Subtle spinning glow ring around emblem */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-royal-500 via-gold-500 to-orange-500 opacity-30 blur-md animate-spin" style={{ animationDuration: '6s' }} />

          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-3 shadow-2xl flex items-center justify-center transform transition-transform duration-700 animate-bounce" style={{ animationDuration: '2.5s' }}>
            <img
              src="/assets/namah-siddham-logo.png"
              onError={(e) => {
                if (!e.target.dataset.triedJpg) {
                  e.target.dataset.triedJpg = 'true';
                  e.target.src = '/assets/namah-siddham-logo.jpg';
                } else {
                  e.target.onerror = null;
                  e.target.src = '/assets/namah-siddham-emblem.svg';
                }
              }}
              alt="Namah Siddham Corporation Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Company Title */}
        <div className="space-y-1.5">
          <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-tight">
            NAMAH SIDDHAM
          </h2>
          <p className="text-[11px] font-bold text-royal-400 tracking-[0.25em] uppercase font-mono">
            Corporation Private Limited
          </p>
          <p className="text-[10px] text-surface-400 font-medium">
            IT Services &bull; Digital Platforms &bull; Aggregators
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-56 space-y-2 pt-2">
          <div className="w-full h-1.5 bg-navy-800 rounded-full overflow-hidden p-0.5 border border-navy-700/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-royal-500 via-gold-500 to-orange-500 transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-surface-400 font-mono">
            <span>Loading Ecosystem...</span>
            <span className="text-gold-400 font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;