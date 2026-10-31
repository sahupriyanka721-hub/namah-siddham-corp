import React, { useState, useEffect } from 'react';
import './NSCPreloader.css';

export const NSCPreloader = () => {
  // Animation Scene Stages:
  // 0: Darkness & Golden Particles Gathering
  // 1: Jain Symbol Illumination
  // 2: Digital Orbit Formation
  // 3: Complete Logo Reveal
  // 4: Typography & Tagline Reveal
  // 5: Complete & Ready to Transition
  const [sceneStage, setSceneStage] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Prevent background scrolling during loader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Cinematic Storyboard Timers
    const timerStage1 = setTimeout(() => setSceneStage(1), 450);  // Scene 2: Jain Symbol Reveal
    const timerStage2 = setTimeout(() => setSceneStage(2), 1100); // Scene 3: Digital Orbit Formation
    const timerStage3 = setTimeout(() => setSceneStage(3), 1750); // Scene 4: Full Logo Reveal
    const timerStage4 = setTimeout(() => setSceneStage(4), 2350); // Scene 5 & 6: Typography & Tagline
    const timerStage5 = setTimeout(() => setSceneStage(5), 2900); // Ready state
    const timerFade = setTimeout(() => setFadeOut(true), 3200);   // Scene 7: Smooth Website Transition
    const timerRemove = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = originalOverflow || 'auto';
    }, 3900);

    return () => {
      clearTimeout(timerStage1);
      clearTimeout(timerStage2);
      clearTimeout(timerStage3);
      clearTimeout(timerStage4);
      clearTimeout(timerStage5);
      clearTimeout(timerFade);
      clearTimeout(timerRemove);
      document.body.style.overflow = originalOverflow || 'auto';
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-label="Loading Namah Siddham Corporation"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center nsc-preloader-backdrop text-white select-none transition-all duration-700 ease-out overflow-hidden ${
        fadeOut ? 'nsc-preloader-exit' : 'opacity-100'
      }`}
    >
      {/* Background Soft Atmospheric Lighting */}
      <div className="absolute top-1/2 left-1/2 w-[520px] h-[520px] rounded-full bg-[#0756B8]/15 blur-[120px] nsc-aura-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[340px] h-[340px] rounded-full bg-[#FFBE00]/10 blur-[90px] nsc-aura-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />

      {/* Floating Golden Light Energy Particles (Scene 1) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: '48%', top: '42%', delay: '0.1s', size: 'w-1.5 h-1.5' },
          { left: '52%', top: '56%', delay: '0.6s', size: 'w-2 h-2' },
          { left: '45%', top: '53%', delay: '1.2s', size: 'w-1 h-1' },
          { left: '55%', top: '46%', delay: '0.8s', size: 'w-1.5 h-1.5' },
          { left: '50%', top: '38%', delay: '1.5s', size: 'w-2 h-2' },
          { left: '42%', top: '48%', delay: '0.3s', size: 'w-1.5 h-1.5' },
          { left: '58%', top: '52%', delay: '1.0s', size: 'w-1 h-1' },
        ].map((pt, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full bg-[#FFBE00] nsc-particle shadow-[0_0_10px_#FFBE00] ${pt.size}`}
            style={{
              left: pt.left,
              top: pt.top,
              animationDelay: pt.delay,
            }}
          />
        ))}
      </div>

      {/* Main Brand Hero Stage */}
      <div className="relative z-10 flex flex-col items-center px-4 max-w-lg w-full text-center">
        
        {/* ========================================================================= */}
        {/* CENTER EMBLEM & DIGITAL ORBIT STAGE                                      */}
        {/* ========================================================================= */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-6">
          
          {/* DIGITAL ORBIT 1: Royal Blue Light Trail (Clockwise, Scene 3) */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 pointer-events-none ${
              sceneStage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <div className="w-full h-full rounded-full border border-sky-400/25 nsc-orbit-cw relative">
              {/* Blue Comet Head */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#0756B8] shadow-[0_0_16px_4px_#0756B8]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* DIGITAL ORBIT 2: Golden-Orange Light Trail (Counter-Clockwise, Scene 3) */}
          <div
            className={`absolute -inset-3 rounded-full transition-all duration-1000 pointer-events-none ${
              sceneStage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="w-full h-full rounded-full border border-amber-400/25 nsc-orbit-ccw relative">
              {/* Golden Comet Head */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#FFBE00] shadow-[0_0_18px_5px_#FFBE00]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
              {/* Secondary Orange Particle */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F28C00] shadow-[0_0_12px_#F28C00]" />
            </div>
          </div>

          {/* Inner Golden Pulsing Halo */}
          <div
            className={`absolute inset-4 rounded-full bg-gradient-to-tr from-[#0756B8]/20 via-[#FFBE00]/25 to-transparent blur-md transition-all duration-700 pointer-events-none ${
              sceneStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          />

          {/* Central Logo Container with Card Backdrop */}
          <div
            className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white p-3 sm:p-4 shadow-[0_12px_40px_rgba(7,86,184,0.35)] flex items-center justify-center overflow-hidden transition-all duration-800 ease-out border border-white/80 ring-2 ring-[#FFBE00]/40 ${
              sceneStage >= 3
                ? 'scale-100 opacity-100'
                : sceneStage >= 1
                ? 'scale-95 opacity-90'
                : 'scale-75 opacity-0'
            }`}
          >
            {/* Shimmer Light Sweep on Logo Surface (Scene 4) */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent nsc-shimmer pointer-events-none" />

            {/* SCENE 2: Jain Ahimsa Symbol Highlight Mask (Phases 1 & 2) */}
            {sceneStage < 3 && (
              <div className="absolute inset-0 flex items-center justify-center p-3 animate-fade-in">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="w-16 h-16 drop-shadow-[0_0_12px_#FFBE00]"
                >
                  <defs>
                    <linearGradient id="loaderAhimsaGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#FFDE59" />
                      <stop offset="50%" stop-color="#FFBE00" />
                      <stop offset="100%" stop-color="#F28C00" />
                    </linearGradient>
                  </defs>
                  {/* Triratna Crowns */}
                  <path d="M 38 22 C 38 15, 43 15, 43 22 L 43 28 L 38 28 Z" fill="url(#loaderAhimsaGold)" />
                  <path d="M 47 18 C 47 11, 53 11, 53 18 L 53 28 L 47 28 Z" fill="url(#loaderAhimsaGold)" />
                  <path d="M 57 22 C 57 15, 62 15, 62 22 L 62 28 L 57 28 Z" fill="url(#loaderAhimsaGold)" />
                  {/* Outer Flame Frame */}
                  <path
                    d="M 50 28 C 72 45, 84 64, 75 84 C 70 94, 58 98, 50 98 C 42 98, 30 94, 25 84 C 16 64, 28 45, 50 28 Z"
                    fill="none"
                    stroke="url(#loaderAhimsaGold)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Hand Contour */}
                  <path
                    d="M 40 45 L 40 56 L 44 56 L 44 42 C 44 38, 48 38, 48 42 L 48 56 L 52 56 L 52 44 C 52 40, 56 40, 56 44 L 56 58 L 60 58 C 62 58, 63 60, 62 62 L 60 70 C 58 80, 52 86, 48 86 C 44 86, 38 80, 37 72 L 36 60 C 36 56, 40 56, 40 54 Z"
                    fill="none"
                    stroke="url(#loaderAhimsaGold)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Sacred Chakra in Palm */}
                  <circle cx="50" cy="72" r="8" fill="#FFFFFF" stroke="url(#loaderAhimsaGold)" strokeWidth="2" />
                  <circle cx="50" cy="72" r="2.5" fill="url(#loaderAhimsaGold)" />
                </svg>
              </div>
            )}

            {/* SCENE 4: Complete Original Namah Siddham Logo (Phase 3+) */}
            <img
              src="/assets/namah-siddham-emblem.svg"
              onError={(e) => {
                if (!e.target.dataset.triedFallback) {
                  e.target.dataset.triedFallback = 'true';
                  e.target.src = '/assets/namah-siddham-logo.svg';
                } else {
                  e.target.onerror = null;
                  e.target.src = '/assets/namah-siddham-logo.png';
                }
              }}
              alt="Namah Siddham Corporation Private Limited Emblem"
              className={`w-full h-full object-contain filter drop-shadow-sm transition-all duration-700 ease-out ${
                sceneStage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 5: COMPANY NAME REVEAL                                             */}
        {/* ========================================================================= */}
        <div
          className={`space-y-1.5 transition-all duration-800 ease-out transform ${
            sceneStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {/* Main Prominent Corporate Heading */}
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-[0.08em] drop-shadow-md">
            NAMAH SIDDHAM
          </h1>

          {/* Subtitle with Wide Letter Spacing */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 sm:w-8 h-px bg-gradient-to-r from-transparent to-[#FFBE00]" />
            <p className="text-[10px] sm:text-xs font-bold text-[#FFBE00] tracking-[0.28em] uppercase font-mono">
              CORPORATION PRIVATE LIMITED
            </p>
            <div className="w-5 sm:w-8 h-px bg-gradient-to-l from-transparent to-[#FFBE00]" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCENE 6: CORPORATE TAGLINE REVEAL & TRI-COLOR LOADING PARTICLES          */}
        {/* ========================================================================= */}
        <div
          className={`mt-4 space-y-4 transition-all duration-800 ease-out transform ${
            sceneStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {/* Official Tagline */}
          <p className="text-xs sm:text-sm text-slate-300 font-sans font-medium tracking-wide max-w-sm sm:max-w-md mx-auto leading-relaxed">
            “Technology That Builds Businesses and Connects Opportunities.”
          </p>

          {/* Sophisticated Animated Indicator: Three Light Particles (Blue, Gold, Orange) */}
          <div className="flex items-center justify-center space-x-2 pt-1">
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#0756B8] nsc-dot-1 shadow-[0_0_8px_#0756B8]"
              title="IT Services"
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#FFBE00] nsc-dot-2 shadow-[0_0_10px_#FFBE00]"
              title="Innovation & Digital Products"
            />
            <span
              className="w-2.5 h-2.5 rounded-full bg-[#F28C00] nsc-dot-3 shadow-[0_0_8px_#F28C00]"
              title="Ecosystem & Connectivity"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default NSCPreloader;
