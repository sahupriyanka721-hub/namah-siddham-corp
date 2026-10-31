import React from 'react';
import { Compass, Network, Cpu, Zap, Globe2 } from 'lucide-react';

export const VisionSection = ({ className = '' }) => {
  return (
    <section className={`bg-gradient-to-b from-[#F0F8FF] via-white to-sky-50/60 py-16 sm:py-20 border-y border-sky-200/80 relative overflow-hidden ${className}`}>
      {/* Soft atmospheric ambient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Vision Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="shiny-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-brand-blue mr-1" />
              <span className="font-mono uppercase tracking-wider">Our Vision</span>
            </div>

            <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-brand-navy tracking-tight leading-tight">
              To Create a More{' '}
              <span className="text-brand-blue font-black underline decoration-sky-300 underline-offset-4">
                Connected
              </span>{' '}
              and{' '}
              <span className="text-gradient-ns font-black">
                Digitally
              </span>{' '}
              Empowered{' '}
              <span className="text-brand-orange font-black">
                Future
              </span>.
            </h2>

            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
              <p>
                Our vision is to build a trusted ecosystem of digital solutions that helps businesses, individuals, and communities participate more effectively in an increasingly connected world.
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
          </div>

          {/* Right Column: Tasteful Abstract Visual of Connected Digital Networks */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-sky-200 relative overflow-hidden group hover:border-amber-300 transition-all duration-300">
              {/* Brand Accent Top Line */}
              <div className="h-1 bg-gradient-to-r from-brand-blue via-amber-400 to-brand-orange -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 rounded-t-3xl" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">
                      Connected Digital Network
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                    Active Ecosystem
                  </span>
                </div>

                {/* Connected Network Nodes Schematic */}
                <div className="relative py-2">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {/* Node 1: Connected */}
                    <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 shadow-2xs flex flex-col items-center space-y-1.5 hover:bg-sky-100/60 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white border border-sky-200 text-brand-blue flex items-center justify-center shadow-xs">
                        <Network className="w-5 h-5 text-brand-blue" />
                      </div>
                      <span className="text-xs font-bold text-brand-navy">Connected</span>
                      <span className="text-[10px] text-slate-500 font-mono">Ecosystem</span>
                    </div>

                    {/* Node 2: Digital */}
                    <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 shadow-2xs flex flex-col items-center space-y-1.5 hover:bg-orange-100/60 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white border border-orange-200 text-brand-orange flex items-center justify-center shadow-xs">
                        <Cpu className="w-5 h-5 text-brand-orange" />
                      </div>
                      <span className="text-xs font-bold text-brand-navy">Digital</span>
                      <span className="text-[10px] text-slate-500 font-mono">Intelligence</span>
                    </div>

                    {/* Node 3: Future */}
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs flex flex-col items-center space-y-1.5 hover:bg-amber-100/60 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-white border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                        <Zap className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="text-xs font-bold text-brand-navy">Future</span>
                      <span className="text-[10px] text-slate-500 font-mono">Opportunity</span>
                    </div>
                  </div>

                  {/* Network Interconnection Callout */}
                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50/80 via-white to-amber-50/80 border border-sky-200 text-xs text-slate-600 leading-relaxed text-center shadow-xs">
                    Bridging everyday needs and enterprise workflows through reliable, purpose-driven digital technology.
                  </div>
                </div>

                {/* Geographic & Strategic Footprint */}
                <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="flex items-center space-x-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Hub: Bhopal, MP</span>
                  </span>
                  <span className="text-brand-blue font-bold">Pan-India Reach</span>
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
