import React from 'react';
import {
  Compass,
  Code2,
  Smartphone,
  Globe,
  Layers,
  Wrench,
  Car,
  ShoppingBag,
  Store,
  Sparkles,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from 'lucide-react';

export const VisionSection = ({ className = '' }) => {
  return (
    <section
      id="vision"
      className={`bg-gradient-to-b from-[#F0F8FF] via-white to-sky-50/60 py-16 sm:py-24 border-y border-sky-200/80 relative overflow-hidden ${className}`}
    >
      {/* Soft atmospheric ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-300/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. CENTERED SECTION HEADING & HEADLINE (Requested by User)               */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
            <Compass className="w-4 h-4 text-brand-blue" />
            <span className="font-mono uppercase tracking-widest font-bold">Our Vision</span>
          </div>

          <h2 className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-brand-navy tracking-tight leading-tight">
            To Create a More{' '}
            <span className="text-brand-blue underline decoration-sky-300 underline-offset-8">
              Connected
            </span>{' '}
            and{' '}
            <span className="text-gradient-ns">
              Digitally
            </span>{' '}
            Empowered{' '}
            <span className="text-brand-orange">
              Future
            </span>.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Building a trusted, accessible ecosystem of digital solutions that helps businesses, individuals, and communities participate more effectively in an increasingly connected world.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. TWO-COLUMN LAYOUT: NARRATIVE (LEFT) + UNDERSTANDABLE VISUAL (RIGHT)    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Vision Content Narrative */}
          <div className="lg:col-span-6 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
            <div className="space-y-4 font-normal">
              <p className="p-4 rounded-2xl bg-white/80 border border-sky-100 shadow-2xs">
                <strong className="text-brand-navy font-bold">Our vision</strong> is to build a trusted ecosystem of digital solutions that helps businesses, individuals, and communities participate more effectively in an increasingly connected world.
              </p>

              <p>
                We aspire to make technology more accessible, practical, and useful by developing digital platforms that simplify everyday needs and by helping businesses embrace digital transformation.
              </p>

              <p>
                Through continuous learning, thoughtful innovation, and a focus on real-world problems, we aim to build solutions that connect opportunities with the people and businesses that need them.
              </p>

              <p>
                We envision a future where digital tools help businesses reach wider audiences, manage operations more effectively, and create better experiences for their customers.
              </p>
            </div>

            {/* Stylized Supporting Quote Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-sky-50/60 to-white border-l-4 border-amber-500 border border-amber-200/70 shadow-xs space-y-1">
              <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>The Core Purpose</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-brand-navy leading-relaxed">
                “Connecting everyday human needs with enterprise-grade digital possibilities — transforming challenges into scalable growth.”
              </p>
            </div>

            {/* Value Indicators */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-sky-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-brand-navy">Accessible Technology</span>
              </div>
              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-sky-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" />
                <span className="text-xs font-bold text-brand-navy">Purpose-Driven Impact</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clear, Meaningful, Understandable Ecosystem Architecture Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-sky-200/90 relative overflow-hidden group hover:border-amber-300 transition-all duration-300">
              {/* Brand Accent Top Line */}
              <div className="h-1.5 bg-gradient-to-r from-brand-blue via-amber-400 to-brand-orange -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 rounded-t-3xl" />

              <div className="space-y-6">
                
                {/* Header of Visual */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      Connected Operating Model
                    </span>
                    <h4 className="font-serif font-black text-lg text-brand-navy">
                      Namah Siddham Ecosystem
                    </h4>
                  </div>
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Two Growth Verticals</span>
                  </span>
                </div>

                {/* Vertical 1: IT Services & Digital Engineering */}
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center shadow-xs">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <span className="font-serif font-bold text-sm text-brand-navy">
                        Vertical 01: IT Services &amp; Digital Solutions
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-brand-blue border border-sky-200">
                      B2B Solutions
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Custom software, websites, mobile applications &amp; digital marketing empowering businesses to scale.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-medium text-slate-700">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-sky-200 font-mono">Website Dev</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-sky-200 font-mono">Mobile Apps</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-sky-200 font-mono">Custom ERP</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-sky-200 font-mono">Digital Marketing</span>
                  </div>
                </div>

                {/* Central Connection Bridge */}
                <div className="relative py-1 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-sky-300" />
                  </div>
                  <div className="relative px-3 py-1 bg-gradient-to-r from-brand-blue via-amber-400 to-brand-orange text-white rounded-full text-[10px] font-mono font-bold shadow-xs uppercase tracking-wider flex items-center space-x-1.5">
                    <span>Technology • Innovation • Opportunity</span>
                  </div>
                </div>

                {/* Vertical 2: 4 Specialized Consumer Platforms */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center shadow-xs">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="font-serif font-bold text-sm text-brand-navy">
                        Vertical 02: Specialized Digital Platforms
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-brand-orange border border-amber-200">
                      Marketplace Ecosystem
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Addressing real consumer needs through specialized, vetted, multi-sided digital properties:
                  </p>

                  {/* 4 Platforms Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* HomeServixo */}
                    <div className="p-2.5 rounded-xl bg-white border border-sky-200 hover:border-brand-blue transition-colors shadow-2xs space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold text-brand-navy text-[11px]">
                        <Wrench className="w-3.5 h-3.5 text-brand-blue" />
                        <span>HomeServixo</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        Verified Home Repairs &amp; Services
                      </p>
                    </div>

                    {/* Carrento */}
                    <div className="p-2.5 rounded-xl bg-white border border-orange-200 hover:border-brand-orange transition-colors shadow-2xs space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold text-brand-navy text-[11px]">
                        <Car className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Carrento</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        Smart Mobility &amp; Car Rentals
                      </p>
                    </div>

                    {/* Jainamshree */}
                    <div className="p-2.5 rounded-xl bg-white border border-amber-200 hover:border-amber-600 transition-colors shadow-2xs space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold text-brand-navy text-[11px]">
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                        <span>Jainamshree</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        Satvik &amp; Community Marketplace
                      </p>
                    </div>

                    {/* SuperiorMart */}
                    <div className="p-2.5 rounded-xl bg-white border border-emerald-200 hover:border-emerald-600 transition-colors shadow-2xs space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold text-brand-navy text-[11px]">
                        <Store className="w-3.5 h-3.5 text-emerald-600" />
                        <span>SuperiorMart</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        Multi-Category Online Shopping
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Footer: Bhopal Hub & Pan-India Reach */}
                <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Registered Office: Bhopal, MP</span>
                  </span>
                  <span className="text-brand-blue font-bold flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pan-India Reach</span>
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionSection;
