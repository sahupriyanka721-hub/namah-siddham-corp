import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  Code2,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  Zap,
  Building2,
  ChevronRight,
  Layers,
  Sparkles,
  ExternalLink,
  Cpu,
  CheckCircle2,
  Handshake,
  Workflow,
  Compass,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { useSettings } from '../../context/SettingsContext';
import { SeoMeta } from '../../components/public/SeoMeta';

// Icon resolver for services
const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'Code2':
      return Code2;
    case 'Smartphone':
      return Smartphone;
    case 'TrendingUp':
      return TrendingUp;
    case 'Globe':
    default:
      return Globe;
  }
};

export const HomePage = () => {
  const { settings } = useSettings();
  const [services, setServices] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesRes, platformsRes, portfolioRes, newsRes] = await Promise.all([
          publicApi.getServices(),
          publicApi.getPlatforms(),
          publicApi.getPortfolio(),
          publicApi.getNews(),
        ]);
        setServices(servicesRes.data?.data || []);
        setPlatforms(platformsRes.data?.data || []);
        setPortfolio(portfolioRes.data?.data?.slice(0, 3) || []);
        setNews(newsRes.data?.data?.slice(0, 3) || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      <SeoMeta
        title="Home"
        description="Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners."
        keywords="Namah Siddham Corporation Private Limited, Namah Siddham, CIN U77100MP2026PTC087531, Bhopal IT Company, IT Services Madhya Pradesh, Website Development, Custom Software, Digital Platforms, HomeServixo, Carrento, Jainamshree, SuperiorMart, Aggregator Business Model"
      />

      {/* ========================================================================= */}
      {/* SECTION A: HERO BANNER (Radiant Sky-Blue Atmosphere & Shiny Elements)    */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E0F2FE]/80 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 pt-16 pb-28 sm:pb-36 border-b border-sky-200/80">
        {/* Soft atmospheric glowing ambient orbs */}
        <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#0284C7_1.5px,transparent_1.5px)] [background-size:26px_26px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Headline, Description & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Clean, Elegant Headline in Brand Navy & Logo Gradient */}
              <h1 className="font-sans font-black text-2xl sm:text-4xl lg:text-[40px] xl:text-[44px] text-brand-navy tracking-tight leading-[1.25]">
                Technology That Builds Businesses and{' '}
                <span className="text-gradient-ns">
                  Connects Opportunities
                </span>
              </h1>

              {/* Clean, Lightweight Description with Brand Highlights */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-2xl">
                <span className="font-bold text-brand-navy">Namah Siddham Corporation Private Limited</span> combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.
              </p>

              {/* Shiny CTAs matching Logo Palette */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/services"
                  className="shiny-btn inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-sky-500/30 hover:shadow-sky-400/50 transition-all transform hover:-translate-y-0.5 border border-sky-300/40"
                >
                  <span>Explore Our IT Services</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  to="/products"
                  className="shiny-btn inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-white/95 hover:bg-orange-500 text-orange-600 hover:text-white border-2 border-orange-400/80 font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-md shadow-orange-500/10"
                >
                  <span>Discover Our Products</span>
                </Link>
              </div>

              {/* Corporate Identity Tag */}
              <div className="pt-6 border-t border-sky-200/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 font-mono">
                <div>
                  <span className="text-sky-600 font-bold">Entity:</span> Private Limited Company
                </div>
                <div>
                  <span className="text-sky-600 font-bold">Location:</span> Bhopal, Madhya Pradesh
                </div>
                <div>
                  <span className="text-orange-600 font-bold">Two Verticals:</span> Services &amp; Platforms
                </div>
              </div>
            </div>

            {/* Right: Visually engaging technology and digital ecosystem composition */}
            <div className="lg:col-span-5 relative">
              <div className="shiny-glass p-6 sm:p-8 rounded-3xl border border-sky-200 shadow-2xl shadow-sky-500/10 space-y-6 relative overflow-hidden">
                {/* Subtle top accent bar in Logo Gradient */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-gold-400 to-orange-500" />

                <div className="flex items-center justify-between border-b border-sky-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded-2xl bg-gradient-to-br from-sky-500/10 via-sky-400/5 to-amber-500/10 border border-sky-200/70 shadow-xs">
                      <img
                        src="/assets/namah-siddham-emblem.svg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/namah-siddham-logo.svg';
                        }}
                        alt="Namah Siddham Brand"
                        className="h-10 w-auto object-contain filter drop-shadow-xs"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-heading font-black text-sm text-slate-900 tracking-wider">
                        NAMAH SIDDHAM
                      </span>
                      <span className="text-[9px] font-bold text-sky-600 tracking-wider font-mono">
                        CORPORATION
                      </span>
                    </div>
                  </div>
                  <span className="shiny-badge text-[10px] font-bold px-2.5 py-1 rounded-full text-sky-700 uppercase tracking-widest font-mono">
                    Integrated Hub
                  </span>
                </div>

                {/* Vertical 1 Card */}
                <div className="bg-gradient-to-r from-sky-100/70 via-sky-50/80 to-white border-2 border-sky-200/90 rounded-2xl p-4 space-y-2 hover:border-sky-400 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-800 uppercase tracking-wider font-serif flex items-center">
                      <Code2 className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
                      Vertical 1: IT Solutions
                    </span>
                    <span className="text-[10px] text-sky-700 font-semibold bg-sky-200/60 px-2 py-0.5 rounded-full">Client Delivery</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Custom web architecture, mobile solutions, tailored ERP/CRM systems, and SEO visibility.
                  </div>
                </div>

                {/* Vertical 2 Card */}
                <div className="bg-gradient-to-r from-orange-100/60 via-orange-50/70 to-white border-2 border-orange-200/90 rounded-2xl p-4 space-y-2 hover:border-orange-400 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-orange-800 uppercase tracking-wider font-serif flex items-center">
                      <Layers className="w-3.5 h-3.5 mr-1.5 text-orange-600" />
                      Vertical 2: Digital Marketplaces
                    </span>
                    <span className="text-[10px] text-orange-700 bg-orange-200/60 font-bold px-2 py-0.5 rounded-full">
                      4 Platforms
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-700 font-medium">
                    <div className="p-2 rounded-xl bg-white border border-sky-100 flex items-center justify-between shadow-xs">
                      <span>HomeServixo</span>
                      <span className="text-[9px] text-orange-600 font-bold">Repair</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-sky-100 flex items-center justify-between shadow-xs">
                      <span>Carrento</span>
                      <span className="text-[9px] text-sky-600 font-bold">Mobility</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-sky-100 flex items-center justify-between shadow-xs">
                      <span>Jainamshree</span>
                      <span className="text-[9px] text-gold-600 font-bold">Satvik</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-sky-100 flex items-center justify-between shadow-xs">
                      <span>SuperiorMart</span>
                      <span className="text-[9px] text-orange-600 font-bold">Retail</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: COMPANY INTRODUCTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
        <div className="shiny-glass rounded-3xl p-8 sm:p-12 border border-sky-200/90 shadow-2xl shadow-sky-500/10 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="shiny-badge inline-block text-xs font-bold text-brand-blue uppercase tracking-widest font-mono px-3 py-1 rounded-full">
              Corporate Overview
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-brand-navy">
              One Company.{' '}
              <span className="text-gradient-ns">Two Digital Growth Verticals.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              <strong className="text-brand-navy">Namah Siddham Corporation Private Limited</strong> operates across two complementary business domains. We combine engineering excellence for custom digital solutions with the strategic development of focused online marketplaces and aggregator networks.
            </p>
          </div>

          {/* Two Professional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Card 1: IT Services (Electric Sky Blue Theme) */}
            <div className="shiny-card bg-gradient-to-br from-white via-sky-50/50 to-sky-100/30 rounded-3xl p-8 border-2 border-sky-200/80 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-500/20 transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/35 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Code2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-slate-900 group-hover:text-sky-600 transition-colors">
                  1. IT Services and Digital Solutions
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tailored corporate websites, business management systems, custom software, ERP, mobile apps, and search marketing built for business efficiency and modern digital visibility.
                </p>
              </div>
              <div className="pt-4 border-t border-sky-100">
                <Link
                  to="/services"
                  className="inline-flex items-center text-sm font-bold text-sky-600 hover:text-sky-700 group"
                >
                  <span>Explore IT Services &amp; Capabilities</span>
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Card 2: Digital Products & Aggregators (Solar Orange Theme) */}
            <div className="shiny-card bg-gradient-to-br from-white via-orange-50/50 to-orange-100/30 rounded-3xl p-8 border-2 border-orange-200/80 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/20 transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/35 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-slate-900 group-hover:text-orange-600 transition-colors">
                  2. Digital Products and Aggregator Platforms
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Specialized multi-sided platforms connecting consumers with vetted home technicians, mobility fleet hosts, authentic satvik merchants, and multi-category e-commerce sellers.
                </p>
              </div>
              <div className="pt-4 border-t border-orange-100">
                <Link
                  to="/products"
                  className="inline-flex items-center text-sm font-bold text-orange-600 hover:text-orange-700 group"
                >
                  <span>Explore Digital Products Ecosystem</span>
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: IT SERVICES (Database-driven) */}
      {/* ========================================================================= */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="shiny-badge inline-block text-xs font-bold text-brand-blue uppercase tracking-widest font-mono px-3 py-1 rounded-full">
              Vertical 1: IT Services
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-brand-navy">
              IT Services and{' '}
              <span className="text-gradient-blue">Digital Solutions</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 max-w-2xl">
              Engineered with modern full-stack architectures to solve real business operational requirements.
            </p>
          </div>
          <Link
            to="/services"
            className="shiny-badge inline-flex items-center text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-800 px-4 py-2 rounded-full"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <div
                key={service.slug || service._id}
                className="shiny-card bg-gradient-to-br from-white via-sky-50/30 to-white rounded-2xl p-7 border-2 border-sky-100 hover:border-sky-400 shadow-md hover:shadow-xl hover:shadow-sky-500/15 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-md shadow-sky-500/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-sky-100">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-bold text-sky-600 hover:text-sky-700 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION D: OUR DIGITAL PRODUCTS (Database-driven) */}
      {/* ========================================================================= */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="shiny-badge inline-block text-xs font-bold text-brand-orange uppercase tracking-widest font-mono px-3 py-1 rounded-full">
              Vertical 2: Digital Marketplaces
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-brand-navy">
              Our Digital Products &amp;{' '}
              <span className="text-gradient-orange">Aggregator Platforms</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 max-w-2xl">
              Specialized platforms in home repair, mobility, community commerce, and consumer marketplaces.
            </p>
          </div>
          <Link
            to="/products"
            className="shiny-badge inline-flex items-center text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 px-4 py-2 rounded-full"
          >
            <span>View All Platforms</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform) => {
            const isLive = platform.status === 'Live';
            const isUnderDev = platform.status === 'Under Development';
            const isComingSoon = platform.status === 'Coming Soon';

            return (
              <div
                key={platform.slug || platform._id}
                className="shiny-card bg-gradient-to-br from-white via-orange-50/20 to-white rounded-2xl p-6 border-2 border-sky-100 hover:border-orange-300 shadow-md hover:shadow-xl hover:shadow-orange-500/15 transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Category & Status Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">
                      {platform.category}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full shrink-0 font-mono ${
                        isLive
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                          : isUnderDev
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                          : 'bg-sky-100 text-sky-900 border border-sky-300 shadow-xs'
                      }`}
                    >
                      {platform.status}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-orange-600 transition-colors">
                    <Link to={`/products/${platform.slug}`}>
                      {platform.name}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {platform.shortDescription}
                  </p>

                  {/* Key Features Pill list */}
                  {platform.keyFeatures && platform.keyFeatures.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {platform.keyFeatures.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start text-[11px] text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 mr-1.5 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-sky-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/products/${platform.slug}`}
                    className="text-xs font-bold text-slate-800 hover:text-orange-600"
                  >
                    View Details
                  </Link>

                  {platform.websiteUrl && (
                    <a
                      href={platform.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`shiny-btn inline-flex items-center text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all ${
                        isLive
                          ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sm'
                          : 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm'
                      }`}
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION E: WHY CHOOSE US */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="shiny-badge inline-block text-xs font-bold text-brand-blue uppercase tracking-widest font-mono px-3 py-1 rounded-full">
            Our Approach &amp; Capabilities
          </span>
          <h2 className="font-serif font-black text-2xl sm:text-4xl text-brand-navy">
            Why Choose <span className="text-gradient-ns">Namah Siddham</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700">
            A structured, engineering-first methodology focused on technical scalability, partner viability, and dependable operational standards.
          </p>
        </div>

        {/* Six Benefit Cards with Shiny Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="shiny-card bg-gradient-to-br from-white via-sky-50/40 to-white rounded-2xl p-7 border-2 border-sky-100 hover:border-sky-300 shadow-md hover:shadow-xl hover:shadow-sky-500/15 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Technology-Driven Approach</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We leverage modern frameworks (React, Node.js, MongoDB, microservices) to ensure responsive performance, clean code architecture, and high data reliability.
            </p>
          </div>

          <div className="shiny-card bg-gradient-to-br from-white via-sky-50/40 to-white rounded-2xl p-7 border-2 border-sky-100 hover:border-sky-300 shadow-md hover:shadow-xl hover:shadow-sky-500/15 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Business-Focused Solutions</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every system is engineered to solve concrete operational requirements, eliminate manual errors, streamline booking workflows, and improve commercial turnaround.
            </p>
          </div>

          <div className="shiny-card bg-gradient-to-br from-white via-sky-50/40 to-white rounded-2xl p-7 border-2 border-sky-100 hover:border-sky-300 shadow-md hover:shadow-xl hover:shadow-sky-500/15 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Custom Development Capabilities</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              From tailored administrative management dashboards to multi-sided aggregator engines, we build bespoke software fitted to exact business specifications.
            </p>
          </div>

          <div className="shiny-card bg-gradient-to-br from-white via-orange-50/40 to-white rounded-2xl p-7 border-2 border-orange-100 hover:border-orange-300 shadow-md hover:shadow-xl hover:shadow-orange-500/15 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/25">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Multiple Digital Business Verticals</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Operating both client software engineering and dedicated digital marketplaces provides real-world domain insights into customer journeys and vendor management.
            </p>
          </div>

          <div className="shiny-card bg-gradient-to-br from-white via-sky-50/40 to-white rounded-2xl p-7 border-2 border-sky-100 hover:border-sky-300 shadow-md hover:shadow-xl hover:shadow-sky-500/15 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Scalable Platform Architecture</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our platforms are built with modular schemas, secure REST APIs, role-based authorization, and indexed databases ready to accommodate growing catalog and booking volumes.
            </p>
          </div>

          <div className="shiny-card bg-gradient-to-br from-white via-sky-50/40 to-white rounded-2xl p-7 border-2 border-sky-100 hover:border-sky-300 shadow-md hover:shadow-xl hover:shadow-sky-500/15 transition-all space-y-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25">
              <Handshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-900">Focus on Customer and Partner Experience</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We design transparent onboarding, upfront service guidelines, verified merchant relationships, and clear communication channels across every user touchpoint.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION F: HOW OUR BUSINESS MODEL WORKS (Luminous Light Blue Theme) */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-sky-50/80 via-white to-sky-50/50 text-slate-800 py-20 border-y border-sky-100 relative overflow-hidden">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-sky-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest font-mono">
              Operational Framework
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-brand-navy">
              How Our Business Model <span className="text-gradient-ns">Creates Value</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700">
              A structured digital flow connecting everyday needs with specialized platform solutions and verified providers.
            </p>
          </div>

          {/* Visual Step-by-Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1: Royal Blue (Letter N) */}
            <div className="bg-white border-2 border-sky-100 rounded-2xl p-5 space-y-2 text-center relative hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-brand-blue text-white font-bold text-xs mx-auto flex items-center justify-center shadow-sm">
                1
              </div>
              <h4 className="font-bold text-sm text-brand-navy">Customer Need</h4>
              <p className="text-[11px] text-slate-600">
                A customer identifies a requirement for home appliance repair, mobility rental, satvik groceries, or retail products.
              </p>
            </div>

            {/* Step 2: Sky Blue (Arrow Ribbon) */}
            <div className="bg-white border-2 border-sky-100 rounded-2xl p-5 space-y-2 text-center relative hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-brand-sky text-white font-bold text-xs mx-auto flex items-center justify-center shadow-sm">
                2
              </div>
              <h4 className="font-bold text-sm text-brand-navy">Specialized Platform</h4>
              <p className="text-[11px] text-slate-600">
                Access through dedicated platform properties (HomeServixo, Carrento, Jainamshree, SuperiorMart).
              </p>
            </div>

            {/* Step 3: Ahimsa Gold */}
            <div className="bg-white border-2 border-amber-100 rounded-2xl p-5 space-y-2 text-center relative hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-brand-gold text-slate-900 font-bold text-xs mx-auto flex items-center justify-center shadow-sm">
                3
              </div>
              <h4 className="font-bold text-sm text-brand-navy">Discovery &amp; Booking</h4>
              <p className="text-[11px] text-slate-600">
                Intuitive search, transparent pricing estimates, schedule selection, or digital cart checkout.
              </p>
            </div>

            {/* Step 4: Sunburst Orange (Letter S) */}
            <div className="bg-white border-2 border-orange-100 rounded-2xl p-5 space-y-2 text-center relative hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold text-xs mx-auto flex items-center justify-center shadow-sm">
                4
              </div>
              <h4 className="font-bold text-sm text-brand-navy">Verified Partner</h4>
              <p className="text-[11px] text-slate-600">
                Matched with verified local technicians, car fleet hosts, or verified retail vendor partners.
              </p>
            </div>

            {/* Step 5: Full Brand Gradient */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 space-y-2 text-center relative hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange text-white font-bold text-xs mx-auto flex items-center justify-center shadow-sm">
                5
              </div>
              <h4 className="font-bold text-sm text-brand-navy">Fulfillment &amp; Trust</h4>
              <p className="text-[11px] text-slate-600">
                Service fulfilled according to the platform’s distinct operating guidelines and partner arrangements.
              </p>
            </div>
          </div>

          {/* Operational Clarity Disclosure */}
          <div className="bg-white border border-sky-200 rounded-2xl p-6 text-xs text-slate-700 space-y-2 max-w-4xl mx-auto flex items-start space-x-3 shadow-sm">
            <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-1">Operational Model Notice:</span>
              Individual platforms utilize different transaction, payment, fulfillment, and customer support arrangements based on industry sector. Namah Siddham Corporation Private Limited provides the holding, technological, and architectural framework; payments and fulfillment follow each platform’s documented operating agreement.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION G: PORTFOLIO */}
      {/* ========================================================================= */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="shiny-badge inline-block text-xs font-bold text-brand-blue uppercase tracking-widest font-mono px-3 py-1 rounded-full">
              Engineering Showcase
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-brand-navy">
              Selected Projects &amp;{' '}
              <span className="text-gradient-blue">Case Studies</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 max-w-2xl">
              Completed software architectures, digital platform demonstrations, and internal technology implementations.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="shiny-badge inline-flex items-center text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-800 px-4 py-2 rounded-full"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolio.map((proj) => (
            <div
              key={proj.slug || proj._id}
              className="shiny-card bg-gradient-to-br from-white via-sky-50/20 to-white rounded-2xl overflow-hidden border-2 border-sky-100 hover:border-sky-400 shadow-md hover:shadow-xl hover:shadow-sky-500/15 transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider font-mono">
                    {proj.industry}
                  </span>
                  <span className="text-[9px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-mono">
                    {proj.projectType}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 hover:text-sky-600 transition-colors">
                  <Link to={`/portfolio/${proj.slug}`}>{proj.name}</Link>
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {proj.shortDescription}
                </p>

                {/* Technologies */}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-6 py-3.5 bg-sky-50/50 border-t border-sky-100 flex items-center justify-between text-xs">
                <Link
                  to={`/portfolio/${proj.slug}`}
                  className="font-bold text-sky-600 hover:underline flex items-center"
                >
                  <span>Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Link>

                {proj.projectUrl && (
                  <a
                    href={proj.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-900 inline-flex items-center font-medium"
                  >
                    <span>Visit Link</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION H: PARTNER WITH US (Vibrant Light Electric Blue Theme) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-blue-600 rounded-3xl p-8 sm:p-14 text-white border border-sky-300/40 shadow-2xl shadow-sky-500/25 space-y-8 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-xs font-bold text-gold-300 uppercase tracking-widest font-serif">
              Collaboration &amp; Network
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-white">
              Partner With Us
            </h2>
            <p className="text-sm sm:text-base text-sky-100 leading-relaxed font-normal">
              We invite certified professionals, vehicle owners, retail distributors, and business enterprises to join our digital growth initiatives.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 text-xs relative z-10">
            <div className="bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md rounded-xl p-3.5 text-center space-y-1 transition-colors">
              <span className="font-bold text-white block">Home Service Pros</span>
              <span className="text-[10px] text-sky-100">Technicians &amp; HVAC</span>
            </div>
            <div className="bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md rounded-xl p-3.5 text-center space-y-1 transition-colors">
              <span className="font-bold text-white block">Car Owners</span>
              <span className="text-[10px] text-sky-100">Fleet Hosts &amp; Rentals</span>
            </div>
            <div className="bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md rounded-xl p-3.5 text-center space-y-1 transition-colors">
              <span className="font-bold text-white block">E-commerce Vendors</span>
              <span className="text-[10px] text-sky-100">Retail &amp; Utilities</span>
            </div>
            <div className="bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md rounded-xl p-3.5 text-center space-y-1 transition-colors">
              <span className="font-bold text-white block">Product Sellers</span>
              <span className="text-[10px] text-sky-100">Satvik Goods &amp; Puja</span>
            </div>
            <div className="bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md rounded-xl p-3.5 text-center space-y-1 transition-colors">
              <span className="font-bold text-white block">Technology Partners</span>
              <span className="text-[10px] text-sky-100">API &amp; Cloud Infra</span>
            </div>
            <div className="bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md rounded-xl p-3.5 text-center space-y-1 transition-colors">
              <span className="font-bold text-white block">Business Partners</span>
              <span className="text-[10px] text-sky-100">Regional Outreach</span>
            </div>
          </div>

          <div className="pt-2 relative z-10">
            <Link
              to="/partners"
              className="shiny-btn inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-white hover:bg-sky-50 text-sky-700 font-extrabold text-sm shadow-xl shadow-sky-950/20 transition-all transform hover:-translate-y-0.5"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4 ml-2 text-sky-700" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION I: COMPANY VISION AND MISSION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="shiny-glass rounded-3xl p-8 sm:p-14 border-2 border-sky-100 shadow-xl shadow-sky-500/5 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4 border-b lg:border-b-0 lg:border-r border-sky-100 pb-8 lg:pb-0 lg:pr-8">
            <span className="shiny-badge inline-flex items-center text-xs font-bold text-sky-700 uppercase tracking-widest font-serif px-3 py-1 rounded-full">
              <Compass className="w-4 h-4 mr-1.5" />
              Company Vision
            </span>
            <h3 className="font-serif font-bold text-2xl text-slate-900">
              Accessible Digital Opportunity
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light italic">
              "To build accessible and scalable digital platforms that simplify everyday needs and create opportunities for people and businesses."
            </p>
          </div>

          <div className="space-y-4 lg:pl-4">
            <span className="shiny-badge inline-flex items-center text-xs font-bold text-orange-700 uppercase tracking-widest font-serif px-3 py-1 rounded-full">
              <Sparkles className="w-4 h-4 mr-1.5" />
              Company Mission
            </span>
            <h3 className="font-serif font-bold text-2xl text-slate-900">
              Technology &amp; Specialized Platforms
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light italic">
              "To combine technology, practical business solutions, and specialized online platforms to improve digital access, convenience, and collaboration."
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION J: LATEST UPDATES (Database-driven) */}
      {/* ========================================================================= */}
      {news && news.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="shiny-badge inline-block text-xs font-bold text-sky-700 uppercase tracking-widest font-serif px-3 py-1 rounded-full">
                Corporate Communications
              </span>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-slate-950">
                Latest Updates &amp; Announcements
              </h2>
            </div>
            <Link
              to="/news"
              className="shiny-badge inline-flex items-center text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-800 px-3.5 py-1.5 rounded-full"
            >
              All Updates →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item._id}
                className="shiny-card bg-gradient-to-br from-white via-sky-50/25 to-white rounded-2xl p-6 border-2 border-sky-100 hover:border-sky-400 shadow-md hover:shadow-xl hover:shadow-sky-500/15 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-sky-600">{item.category}</span>
                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 hover:text-sky-600 transition-colors">
                    <Link to={`/news/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <Link
                  to={`/news/${item.slug}`}
                  className="text-xs font-bold text-sky-600 inline-flex items-center group pt-2"
                >
                  <span>Read Announcement</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION K: FINAL CTA (Vibrant Light Electric Blue Theme) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 rounded-3xl p-8 sm:p-14 text-white border border-sky-300/40 shadow-2xl shadow-sky-500/25 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle atmospheric glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="text-xs font-bold text-gold-300 uppercase tracking-widest font-serif">
              Get Started
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-white">
              Have a Digital Idea? Let's Build It Together.
            </h2>
            <p className="text-xs sm:text-base text-sky-100 leading-relaxed font-normal">
              Connect with our team to discuss software development, mobile applications, digital marketing, or opportunities across our digital platforms.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto relative z-10">
            <Link
              to="/contact"
              className="shiny-btn px-7 py-3.5 rounded-2xl bg-white hover:bg-sky-50 text-sky-700 font-extrabold text-sm text-center shadow-xl shadow-sky-950/20 transition-all transform hover:-translate-y-0.5"
            >
              Discuss Your Project
            </Link>
            <Link
              to="/contact"
              className="shiny-btn px-7 py-3.5 rounded-2xl border-2 border-white hover:bg-white/15 text-white font-bold text-sm text-center transition-all shadow-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
