import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Globe,
  Monitor,
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

export const HomePage = () => {
  const { settings } = useSettings();
  const [portfolio, setPortfolio] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [portfolioRes, newsRes] = await Promise.all([
          publicApi.getPortfolio(),
          publicApi.getNews(),
        ]);
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
    <div className="space-y-10 sm:space-y-12 pb-16">
      <SeoMeta
        title="Home"
        description="Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners."
        keywords="Namah Siddham Corporation Private Limited, Namah Siddham, CIN U77100MP2026PTC087531, Bhopal IT Company, IT Services Madhya Pradesh, Website Development, Custom Software, Digital Platforms, HomeServixo, Carrento, Jainamshree, SuperiorMart, Aggregator Business Model"
      />

      {/* ========================================================================= */}
      {/* SECTION A: HERO BANNER (Radiant Sky-Blue Atmosphere & Shiny Elements)    */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E0F2FE]/80 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 pt-8 sm:pt-12 pb-8 sm:pb-10 border-b border-sky-200/80">
        {/* Soft atmospheric glowing ambient orbs */}
        <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#0284C7_1.5px,transparent_1.5px)] [background-size:26px_26px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="space-y-5 max-w-5xl mx-auto">
            {/* Clean, Elegant Headline strictly in 2 Lines */}
            <h1 className="font-sans font-black text-[18px] xs:text-[21px] sm:text-3xl md:text-[36px] lg:text-[42px] xl:text-[46px] text-brand-navy tracking-tight leading-tight sm:leading-snug">
              <span className="block sm:whitespace-nowrap">
                Empowering Businesses Through Technology,
              </span>
              <span className="block sm:whitespace-nowrap text-gradient-ns mt-1 sm:mt-1.5">
                Innovation &amp; Digital Transformation
              </span>
            </h1>

            {/* Properly Center-Aligned 3-Paragraph Narrative */}
            <div className="max-w-3xl mx-auto space-y-4 text-center">
              <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed text-center">
                At <strong className="font-bold text-brand-navy">Namah Siddham Corporation Private Limited</strong>, we believe that technology is more than just a tool — it is a powerful force for transforming ideas into opportunities and businesses into digital success stories.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-center">
                We combine our expertise in website development, custom software solutions, mobile application development, and digital marketing with a growing ecosystem of innovative digital products designed to simplify everyday needs and connect people, businesses, and opportunities. From helping businesses establish a strong online presence and streamline their operations to building specialized platforms such as <span className="font-semibold text-brand-blue">HomeServixo</span>, <span className="font-semibold text-brand-orange">Carrento</span>, <span className="font-semibold text-amber-700">Jainamshree</span>, and <span className="font-semibold text-emerald-700">SuperiorMart</span>, our vision is to create meaningful digital experiences that bring convenience, connectivity, and new possibilities to the modern world.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-center">
                Whether you are a startup with a bold idea, an established business ready to embrace digital transformation, or a customer or partner looking to be part of an evolving digital ecosystem, Namah Siddham aims to bring the right technology, practical solutions, and forward-thinking approach to help you move ahead with confidence.
              </p>
            </div>

            {/* Shiny CTAs matching Logo Palette */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
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
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: COMPANY INTRODUCTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="shiny-glass rounded-3xl p-6 sm:p-8 border border-sky-200/90 shadow-xl shadow-sky-500/10 space-y-5">
          <div className="max-w-4xl space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="shiny-badge inline-flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest font-mono px-3 py-1 rounded-full shrink-0">
                Corporate Overview
              </span>
              <h2 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-brand-navy">
                One Company.{' '}
                <span className="text-gradient-ns">Two Digital Growth Verticals.</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              <strong className="text-brand-navy">Namah Siddham Corporation Private Limited</strong> operates across two complementary business domains. We combine engineering excellence for custom digital solutions with the strategic development of focused online marketplaces and aggregator networks.
            </p>
          </div>

          {/* Two Professional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            {/* Card 1: IT Services (Electric Sky Blue Theme) */}
            <div className="shiny-card bg-gradient-to-br from-white via-sky-50/50 to-sky-100/30 rounded-3xl p-7 border-2 border-sky-200/80 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/15 transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <span className="inline-block text-xs font-bold text-sky-700 bg-sky-100 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  Vertical 01
                </span>
                <h3 className="font-serif font-bold text-2xl text-slate-900 group-hover:text-sky-600 transition-colors">
                  IT Services and Digital Solutions
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

            {/* Card 2: Digital Products & Aggregators (Blue Theme matching Vertical 1) */}
            <div className="shiny-card bg-gradient-to-br from-white via-sky-50/50 to-sky-100/30 rounded-3xl p-7 border-2 border-sky-200/80 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/15 transition-all space-y-4 flex flex-col justify-between group">
              <div className="space-y-3">
                <span className="inline-block text-xs font-bold text-sky-700 bg-sky-100 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  Vertical 02
                </span>
                <h3 className="font-serif font-bold text-2xl text-slate-900 group-hover:text-sky-600 transition-colors">
                  Digital Products and Aggregator Platforms
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Specialized multi-sided platforms connecting consumers with vetted home technicians, mobility fleet hosts, authentic satvik merchants, and multi-category e-commerce sellers.
                </p>
              </div>
              <div className="pt-4 border-t border-sky-100">
                <Link
                  to="/products"
                  className="inline-flex items-center text-sm font-bold text-sky-600 hover:text-sky-700 group"
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
      {/* SECTION C: WHY CHOOSE US (Streamlined & Attractive 4-Pillar Architecture)  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-4xl space-y-2.5">
          <span className="shiny-badge inline-flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest font-mono px-3 py-1 rounded-full w-fit">
            Our Strengths
          </span>
          <h2 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-brand-navy">
            Why Choose <span className="text-gradient-ns">Namah Siddham</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            A structured, engineering-first approach engineered for digital scalability, partner growth, and dependable operations.
          </p>
        </div>

        {/* 4 Sleek, High-Impact Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1 */}
          <div className="shiny-card bg-gradient-to-b from-white via-sky-50/30 to-white rounded-2xl p-6 border-2 border-sky-100 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/15 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Full-Stack
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                Modern Engineering
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-performance web, mobile, and cloud architectures built with React, Node.js, and microservices.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="shiny-card bg-gradient-to-b from-white via-sky-50/30 to-white rounded-2xl p-6 border-2 border-sky-100 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/15 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Enterprise
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                Tailored Solutions
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Custom ERP, CRM, and management software designed to solve concrete business operational needs.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="shiny-card bg-gradient-to-b from-white via-sky-50/30 to-white rounded-2xl p-6 border-2 border-sky-100 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/15 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                  <Workflow className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Scalable
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                Scalable Architecture
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Secure REST APIs, modular microservices, and indexed databases built to handle growing volumes.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="shiny-card bg-gradient-to-b from-white via-sky-50/30 to-white rounded-2xl p-6 border-2 border-sky-100 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/15 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                  <Handshake className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Ecosystem
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                Partner-First Trust
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transparent workflows, verified merchant networks, and dependable collaborative growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION F: HOW OUR BUSINESS MODEL WORKS (Modern Connected Pipeline)        */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-sky-50/80 via-white to-sky-50/50 text-slate-800 py-8 sm:py-10 border-y border-sky-100 relative overflow-hidden">
        {/* Soft atmospheric ambient glow */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-sky-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="max-w-4xl space-y-2.5">
            <span className="shiny-badge inline-flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest font-mono px-3 py-1 rounded-full w-fit">
              Operational Framework
            </span>
            <h2 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-brand-navy">
              How Our Business Model <span className="text-gradient-ns">Creates Value</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              A streamlined 4-stage digital pipeline connecting real consumer needs with specialized platforms and verified partners.
            </p>
          </div>

          {/* Connected Visual Pipeline */}
          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-20 right-20 h-0.5 bg-gradient-to-r from-sky-200 via-sky-400 to-sky-200 -translate-y-6 -z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
              {/* Step 1 */}
              <div className="shiny-card bg-white border-2 border-sky-100 hover:border-sky-300 rounded-2xl p-6 text-center space-y-3 hover:shadow-lg hover:shadow-sky-500/10 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold text-sm mx-auto flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform">
                  01
                </div>
                <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                  Identify Need
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Everyday consumer requirement identified in home repair, mobility, satvik essentials, or retail.
                </p>
              </div>

              {/* Step 2 */}
              <div className="shiny-card bg-white border-2 border-sky-100 hover:border-sky-300 rounded-2xl p-6 text-center space-y-3 hover:shadow-lg hover:shadow-sky-500/10 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white font-bold text-sm mx-auto flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform">
                  02
                </div>
                <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                  Dedicated Platform
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Routed through specialized properties (HomeServixo, Carrento, Jainamshree, SuperiorMart).
                </p>
              </div>

              {/* Step 3 */}
              <div className="shiny-card bg-white border-2 border-sky-100 hover:border-sky-300 rounded-2xl p-6 text-center space-y-3 hover:shadow-lg hover:shadow-sky-500/10 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm mx-auto flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  03
                </div>
                <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                  Verified Match
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Matched with identity-vetted technicians, certified car fleet hosts, or verified retail merchants.
                </p>
              </div>

              {/* Step 4 */}
              <div className="shiny-card bg-white border-2 border-sky-100 hover:border-sky-300 rounded-2xl p-6 text-center space-y-3 hover:shadow-lg hover:shadow-sky-500/10 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-sm mx-auto flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  04
                </div>
                <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Fulfillment &amp; Trust
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dependable service fulfilled according to transparent pricing and verified partner standards.
                </p>
              </div>
            </div>
          </div>

          {/* Clean, Sleek Model Notice Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-sky-200/90 rounded-2xl px-6 py-4 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 text-xs text-slate-600">
              <Info className="w-4 h-4 text-sky-600 shrink-0" />
              <span>
                Platforms operate under specialized sector frameworks powered by Namah Siddham's holding architecture.
              </span>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center text-xs font-bold text-sky-700 hover:text-sky-800 whitespace-nowrap group shrink-0"
            >
              <span>Explore Platforms</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION G: PORTFOLIO */}
      {/* ========================================================================= */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-4xl space-y-2.5">
            <span className="shiny-badge inline-flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest font-mono px-3 py-1 rounded-full w-fit">
              Engineering Showcase
            </span>
            <h2 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-brand-navy">
              Selected Projects &amp;{' '}
              <span className="text-gradient-blue">Case Studies</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Completed software architectures, digital platform demonstrations, and internal technology implementations.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="shiny-badge inline-flex items-center text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-800 px-4 py-2 rounded-full shrink-0"
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
        <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-blue-600 rounded-3xl p-6 sm:p-10 text-white border border-sky-300/40 shadow-2xl shadow-sky-500/25 space-y-6 relative overflow-hidden">
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
        <div className="shiny-glass rounded-3xl p-6 sm:p-10 border-2 border-sky-100 shadow-xl shadow-sky-500/5 grid grid-cols-1 lg:grid-cols-2 gap-8">
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 rounded-3xl p-6 sm:p-10 text-white border border-sky-300/40 shadow-2xl shadow-sky-500/25 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
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
