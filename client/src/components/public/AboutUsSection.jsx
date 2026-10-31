import React from 'react';
import { useSettings } from '../../context/SettingsContext';

export const AboutUsSection = ({ className = '' }) => {
  const { settings } = useSettings();

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Full Company Introduction & Content */}
        <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
          
          <div className="space-y-2">
            <div className="shiny-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
              <span className="font-mono uppercase tracking-wider">About Namah Siddham Corporation</span>
            </div>

            <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-brand-navy tracking-tight leading-tight">
              Building Digital Solutions.{' '}
              <span className="text-brand-blue">Connecting Opportunities.</span>{' '}
              <span className="text-gradient-ns inline-block">Empowering Growth.</span>
            </h2>
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              <strong className="text-brand-navy font-bold">Namah Siddham Corporation Private Limited</strong> is an India-based company focused on technology, digital innovation, and the development of business-oriented digital platforms.
            </p>

            <p>
              We believe technology should do more than establish an online presence. It should help businesses operate more efficiently, connect with their customers, simplify everyday processes, and unlock new opportunities for growth.
            </p>

            <p className="font-semibold text-brand-navy">
              Our work spans two complementary areas: IT services and digital products.
            </p>

            <p>
              Through our IT services, we support businesses in building their digital foundations with website development, custom software solutions, mobile application development, and digital marketing. From creating a professional online presence to developing tailored business systems, our objective is to translate business requirements into practical digital solutions.
            </p>

            <p>
              Alongside our services, we are building a portfolio of specialized digital platforms designed around real-world needs. Our ecosystem includes <strong className="text-brand-blue font-bold">HomeServixo</strong> for home services, <strong className="text-brand-orange font-bold">Carrento</strong> for car rental and mobility, <strong className="text-amber-700 font-bold">Jainamshree</strong> for Jain community-focused e-commerce, and <strong className="text-emerald-700 font-bold">SuperiorMart</strong> for multi-category online shopping. These platforms may be at different stages of development and operation.
            </p>

            <p>
              We bring together technology, business understanding, and a customer-focused mindset to develop solutions that connect people, businesses, service providers, and marketplace participants.
            </p>

            <p>
              At Namah Siddham, we see every digital initiative as an opportunity to make processes simpler, experiences better, and businesses more connected.
            </p>

            <p>
              Our journey is guided by a long-term commitment to building useful digital solutions, developing scalable platforms, and creating meaningful opportunities through technology.
            </p>
          </div>

          {/* Supporting Statement Box with Gold & Blue Accents */}
          <div className="pt-2">
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-l-4 border-amber-500 border-y border-r border-amber-200/80 shadow-xs">
              <p className="text-sm sm:text-base font-bold text-brand-navy leading-relaxed">
                “From a business website to a complete digital platform, we aim to turn ideas into practical digital experiences.”
              </p>
            </div>
          </div>

          {/* Statutory Corporate Details Bar */}
          <div className="pt-3 flex flex-wrap gap-4 border-t border-sky-100">
            <div className="border-l-2 border-brand-blue pl-3 py-0.5">
              <div className="text-[11px] text-slate-500 uppercase font-mono">Corporate Identity</div>
              <div className="text-xs sm:text-sm font-bold text-brand-navy font-mono">
                {settings?.cin || 'U77100MP2026PTC087531'}
              </div>
            </div>
            <div className="border-l-2 border-brand-orange pl-3 py-0.5">
              <div className="text-[11px] text-slate-500 uppercase font-mono">Registered Office</div>
              <div className="text-xs sm:text-sm font-bold text-brand-navy">Bhopal, Madhya Pradesh, India</div>
            </div>
            <div className="border-l-2 border-amber-500 pl-3 py-0.5">
              <div className="text-[11px] text-slate-500 uppercase font-mono">Entity Type</div>
              <div className="text-xs sm:text-sm font-bold text-brand-navy">Private Limited Company</div>
            </div>
          </div>

        </div>

        {/* Right Column: Premium Visual with Blue and Gold Visual Accents & Brand Statement */}
        <div className="lg:col-span-5 space-y-5 sticky top-24">
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-sky-200/90 hover:border-amber-300 transition-all duration-300 group relative">
            
            {/* Top Accent Line */}
            <div className="h-1 bg-gradient-to-r from-brand-blue via-amber-400 to-brand-orange -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 rounded-t-3xl" />

            {/* Brand Statement Badge from Prompt */}
            <div className="mb-3 text-center">
              <span className="inline-block text-xs font-bold uppercase tracking-wider font-mono px-3.5 py-1 rounded-full bg-gradient-to-r from-sky-50 via-amber-50 to-orange-50 border border-sky-200 text-brand-navy shadow-2xs">
                Technology • Innovation • Opportunity
              </span>
            </div>

            {/* High-Resolution Visual Representation */}
            <div className="relative overflow-hidden rounded-2xl bg-sky-50 aspect-[16/10] border border-sky-100 shadow-sm mb-4">
              <img
                src="/assets/services/custom-software.jpg"
                alt="Namah Siddham Technology, Software Development, Digital Commerce & Connected Platforms"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/services/web-development.jpg';
                }}
              />
            </div>

            {/* Connected Business Ecosystem Grid */}
            <div className="space-y-2.5 pt-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                <span>Connected Digital Verticals</span>
                <span className="text-brand-orange">4 Platforms &amp; IT Services</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-brand-navy font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
                  <span className="truncate">IT Services &amp; ERP</span>
                </div>
                <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-brand-navy font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                  <span className="truncate">HomeServixo &amp; Repair</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-brand-navy font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="truncate">Carrento &amp; Mobility</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-brand-navy font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate">Jainamshree &amp; Retail</span>
                </div>
              </div>
            </div>

            {/* Bottom Subtle Brand Tagline */}
            <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-brand-navy">Namah Siddham Corporation</span>
              <span className="text-amber-600 font-bold font-mono">Bhopal, MP</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;
