import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Compass,
  Lightbulb,
  Users2,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  Building,
  Code2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { useSettings } from '../../context/SettingsContext';
import { SeoMeta } from '../../components/public/SeoMeta';

export const AboutPage = () => {
  const { settings } = useSettings();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await publicApi.getPageBySlug('about');
        if (res.data?.data) {
          setContent(res.data.data);
        }
      } catch (err) {
        console.warn('Using default about page content');
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const heroHeadline =
    content?.heroHeadline || 'One Company. Two Digital Growth Verticals.';
  const heroDesc =
    content?.heroDescription ||
    'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.';

  const visionText =
    content?.sections?.vision ||
    'To build accessible and scalable digital platforms that simplify everyday needs and create opportunities for people and businesses.';

  const missionText =
    content?.sections?.mission ||
    'To combine technology, practical business solutions, and specialized online platforms to improve digital access, convenience, and collaboration.';

  return (
    <div className="space-y-20 pb-20">
      <SeoMeta
        title="About Us"
        description="Learn about Namah Siddham Corporation Private Limited, our mission, vision, Bhopal registered office, and two growth verticals across IT solutions and aggregator platforms."
      />

      {/* Header Banner (Radiant Sky-Blue Atmosphere matching Logo) */}
      <section className="bg-gradient-to-b from-[#E0F2FE]/80 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 py-14 sm:py-18 border-b border-sky-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="shiny-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
            <span>About Namah Siddham Corporation</span>
          </div>
          <h1 className="font-sans font-black text-[13px] xs:text-[15px] sm:text-lg md:text-2xl lg:text-[28px] xl:text-[32px] tracking-tight leading-tight whitespace-nowrap">
            <span className="text-brand-navy">Building Digital Solutions.</span>{' '}
            <span className="text-brand-blue">Connecting Opportunities.</span>{' '}
            <span className="text-gradient-ns inline-block">Empowering Growth.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
            Corporate Profile &amp; Digital Operating Philosophy • CIN: {settings.cin || 'U77100MP2026PTC087531'}
          </p>
        </div>
      </section>

      {/* Main Two-Column About Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Full Company Introduction & Content */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
            
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
                <div className="text-xs sm:text-sm font-bold text-brand-navy font-mono">{settings.cin || 'U77100MP2026PTC087531'}</div>
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
                <span className="text-amber-600 font-bold font-mono">Est. 2026</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-sky-50 to-white rounded-3xl p-8 sm:p-10 text-slate-800 border-2 border-sky-200 shadow-soft-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest font-serif">
              Corporate Vision
            </span>
            <h3 className="font-serif font-bold text-2xl text-slate-950">
              Accessible Digital Opportunity
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light italic">
              "{visionText}"
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-surface-200 shadow-soft-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-royal-50 border border-royal-100 flex items-center justify-center text-royal-600">
              <Lightbulb className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
              Corporate Mission
            </span>
            <h3 className="font-serif font-bold text-2xl text-navy-900">
              Technology &amp; Practical Solutions
            </h3>
            <p className="text-sm sm:text-base text-surface-600 leading-relaxed font-light italic">
              "{missionText}"
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif">
            Operating Fundamentals
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-navy-900">
            How We Build and Operate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-navy-900">Technology-Driven</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              We leverage cloud microservices, reactive UI frameworks, and automated matching workflows to give customers and partners dependable software.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-navy-900">Customer Value</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Eliminating friction with upfront estimates, verified technicians, and clear communication channels across every service interaction.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <Users2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-navy-900">Partner Viability</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Treating technicians, vehicle hosts, and retail merchants as long-term collaborators by offering transparent economics and booking demand.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-surface-200 shadow-soft-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-navy-900">Responsible Governance</h4>
            <p className="text-xs text-surface-500 leading-relaxed">
              Committed to responsible data handling, compliance with Indian regulatory frameworks, and honest communications without misleading claims.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-surface-100 rounded-3xl p-10 space-y-4">
          <h3 className="font-serif font-bold text-2xl text-navy-900">
            Collaborate With Namah Siddham Corporation
          </h3>
          <p className="text-xs sm:text-sm text-surface-500 max-w-xl mx-auto">
            Connect with our corporate office in Bhopal to discuss software development, mobile solutions, or marketplace partnerships.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/services"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white font-bold text-xs sm:text-sm hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/20"
            >
              Explore IT Services
            </Link>
            <Link
              to="/partners"
              className="px-6 py-2.5 rounded-xl border border-sky-500 text-sky-700 font-bold text-xs sm:text-sm hover:bg-sky-50"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
