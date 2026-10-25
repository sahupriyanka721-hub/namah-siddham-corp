import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Monitor,
  Cpu,
  Smartphone,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
  Layers,
  Phone,
  Mail,
  Home,
  Car,
  ShoppingBag,
  Store,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const serviceLinks = [
  {
    name: 'Website Development',
    path: '/services/web-development',
    desc: 'Corporate sites, landing pages & dynamic web portals',
    tag: 'Web & Portals',
    icon: Monitor,
    color: 'blue',
  },
  {
    name: 'Custom Software Development',
    path: '/services/custom-software',
    desc: 'Business management systems, ERP, CRM & tailored software',
    tag: 'ERP, CRM & Cloud',
    icon: Cpu,
    color: 'indigo',
  },
  {
    name: 'Mobile Application Development',
    path: '/services/mobile-apps',
    desc: 'Native & cross-platform Android & iOS applications',
    tag: 'iOS & Android',
    icon: Smartphone,
    color: 'emerald',
  },
  {
    name: 'Digital Marketing & SEO',
    path: '/services/digital-marketing',
    desc: 'SEO, performance marketing, social reach & lead generation',
    tag: 'SEO & Growth',
    icon: TrendingUp,
    color: 'orange',
  },
];

const serviceColorMap = {
  blue: {
    container:
      'bg-gradient-to-br from-blue-500/10 via-sky-500/15 to-blue-600/10 text-brand-blue border-sky-200/80 group-hover:bg-gradient-to-tr group-hover:from-brand-blue group-hover:to-blue-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-brand-blue/25',
    mobileContainer: 'bg-sky-100 text-brand-blue border-sky-200',
    tag: 'bg-sky-50 text-brand-blue border-sky-200/60',
    hoverText: 'group-hover:text-brand-blue',
  },
  indigo: {
    container:
      'bg-gradient-to-br from-indigo-500/10 via-purple-500/15 to-indigo-600/10 text-indigo-600 border-indigo-200/80 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-indigo-600/25',
    mobileContainer: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    tag: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    hoverText: 'group-hover:text-indigo-600',
  },
  emerald: {
    container:
      'bg-gradient-to-br from-emerald-500/10 via-teal-500/15 to-cyan-600/10 text-emerald-700 border-emerald-200/80 group-hover:bg-gradient-to-tr group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-emerald-600/25',
    mobileContainer: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    tag: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
    hoverText: 'group-hover:text-emerald-700',
  },
  orange: {
    container:
      'bg-gradient-to-br from-amber-500/10 via-orange-500/15 to-amber-600/10 text-brand-orange border-orange-200/80 group-hover:bg-gradient-to-tr group-hover:from-brand-orange group-hover:to-amber-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-brand-orange/25',
    mobileContainer: 'bg-orange-100 text-brand-orange border-orange-200',
    tag: 'bg-orange-50 text-brand-orange border-orange-200/60',
    hoverText: 'group-hover:text-brand-orange',
  },
};

const productLinks = [
  {
    name: 'HomeServixo',
    path: '/products/homeservixo',
    category: 'Home Services & Appliance Repair',
    status: 'Under Development',
    url: 'https://homeservixo.in',
    icon: Home,
    tag: 'On-Demand Services',
    color: 'emerald',
  },
  {
    name: 'Carrento',
    path: '/products/carrento',
    category: 'Mobility & Car Rental Platform',
    status: 'Under Development',
    url: 'https://carrento.in',
    icon: Car,
    tag: 'Mobility & Rentals',
    color: 'blue',
  },
  {
    name: 'Jainamshree',
    path: '/products/jainamshree',
    category: 'Jain Community E-commerce Marketplace',
    status: 'Under Development',
    url: 'https://jainamshree.online',
    icon: ShoppingBag,
    tag: 'Community E-com',
    color: 'orange',
  },
  {
    name: 'SuperiorMart',
    path: '/products/superiormart',
    category: 'Multi-category E-commerce Marketplace',
    status: 'Under Development',
    url: 'https://superiormart.in',
    icon: Store,
    tag: 'Retail & Multi-Vendor',
    color: 'indigo',
  },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  const servicesTimeoutRef = useRef(null);
  const productsTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setProductsDropdown(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-sky-100'
          : 'bg-white/90 backdrop-blur-md py-3 sm:py-3.5 border-b border-sky-100/80 shadow-sm shadow-sky-500/5'
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 via-amber-400 to-orange-500" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* ========================================================= */}
          {/* 1. BRAND LOGO (Prominent, High-Resolution NS Emblem)       */}
          {/* ========================================================= */}
          <Link
            to="/"
            className="flex items-center space-x-3 sm:space-x-3.5 group focus:outline-none shrink-0"
            title="Namah Siddham Corporation Private Limited"
          >
            {/* Elegant Logo Container */}
            <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-gradient-to-br from-sky-500/10 via-sky-400/5 to-amber-500/10 border border-sky-200/70 shadow-xs shadow-sky-500/10 group-hover:scale-105 group-hover:border-sky-300 group-hover:shadow-md transition-all">
              <img
                src="/assets/namah-siddham-emblem.svg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/namah-siddham-logo.svg';
                }}
                alt="Namah Siddham Corporation Logo"
                className="h-11 sm:h-12 md:h-13 w-auto object-contain filter drop-shadow-xs"
              />
            </div>

            {/* Typography in exact corporate colors (Dark Navy + Royal Blue + Gold) */}
            <div className="flex flex-col">
              <span className="font-heading font-black text-base sm:text-lg text-brand-navy tracking-wide leading-tight group-hover:text-brand-blue transition-colors">
                NAMAH SIDDHAM
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-brand-blue tracking-[0.2em] uppercase font-mono">
                  CORPORATION
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-brand-orange bg-amber-50/90 px-1.5 py-0.5 rounded border border-amber-200 font-mono tracking-wider">
                  BHOPAL, MP
                </span>
              </div>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* 2. DESKTOP NAVIGATION LINKS (Clean, Spacious Corporate Nav) */}
          {/* ========================================================= */}
          <nav className="hidden xl:flex items-center space-x-0.5 2xl:space-x-1">
            <Link
              to="/"
              className={`px-2.5 2xl:px-3 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                isActive('/') && location.pathname === '/'
                  ? 'text-brand-blue font-bold bg-sky-50/90'
                  : 'text-slate-700 hover:text-brand-blue hover:bg-sky-50/60'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-2.5 2xl:px-3 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                isActive('/about')
                  ? 'text-brand-blue font-bold bg-sky-50/90'
                  : 'text-slate-700 hover:text-brand-blue hover:bg-sky-50/60'
              }`}
            >
              About Us
            </Link>

            {/* IT Services Dropdown (Vertical 1: Royal Blue Accent) */}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(servicesTimeoutRef.current);
                setServicesDropdown(true);
              }}
              onMouseLeave={() => {
                servicesTimeoutRef.current = setTimeout(() => setServicesDropdown(false), 200);
              }}
            >
              <Link
                to="/services"
                className={`inline-flex items-center px-2.5 2xl:px-3 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                  isActive('/services')
                    ? 'text-brand-blue font-bold bg-sky-50/90'
                    : 'text-slate-700 hover:text-brand-blue hover:bg-sky-50/60'
                }`}
              >
                <span>IT Services</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-sky-500" />
              </Link>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-[420px] bg-white/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-sky-100 py-3.5 px-3 z-50 text-slate-900 mt-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-sky-100/80 mb-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue font-mono">
                        Vertical 1: IT Solutions
                      </span>
                    </div>
                    <span className="text-[9px] font-semibold text-slate-400 font-mono">
                      4 Core Capabilities
                    </span>
                  </div>

                  <div className="space-y-1">
                    {serviceLinks.map((item) => {
                      const Icon = item.icon;
                      const colorStyle = serviceColorMap[item.color] || serviceColorMap.blue;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center space-x-3.5 p-2.5 rounded-xl hover:bg-sky-50/70 border border-transparent hover:border-sky-100 transition-all duration-200 group"
                        >
                          {/* Professional Curated Icon Box */}
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${colorStyle.container}`}
                          >
                            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`text-xs font-bold text-slate-900 ${colorStyle.hoverText} transition-colors truncate`}
                              >
                                {item.name}
                              </span>
                              <span
                                className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded border shrink-0 ${colorStyle.tag}`}
                              >
                                {item.tag}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 leading-snug mt-0.5">
                              {item.desc}
                            </div>
                          </div>

                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-2.5 px-3 border-t border-sky-100/80 mt-2 flex items-center justify-between">
                    <Link
                      to="/services"
                      className="text-xs font-bold text-brand-blue hover:text-brand-orange hover:underline flex items-center space-x-1.5 transition-colors"
                    >
                      <span>Explore All IT Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[10px] text-slate-400 font-medium">Bhopal Tech Hub</span>
                  </div>
                </div>
              )}
            </div>

            {/* Our Products Dropdown (Vertical 2: Sunburst Orange Accent) */}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(productsTimeoutRef.current);
                setProductsDropdown(true);
              }}
              onMouseLeave={() => {
                productsTimeoutRef.current = setTimeout(() => setProductsDropdown(false), 200);
              }}
            >
              <Link
                to="/products"
                className={`inline-flex items-center px-2.5 2xl:px-3 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                  isActive('/products') || isActive('/ecosystem')
                    ? 'text-brand-orange font-bold bg-orange-50/90'
                    : 'text-slate-700 hover:text-brand-orange hover:bg-orange-50/60'
                }`}
              >
                <span>Our Products</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-orange-500" />
              </Link>

              {productsDropdown && (
                <div className="absolute top-full left-0 w-[420px] bg-white/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-orange-100 py-3.5 px-3 z-50 text-slate-900 mt-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-orange-100/80 mb-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange font-mono">
                        Vertical 2: Digital Marketplaces
                      </span>
                    </div>
                    <span className="text-[9px] font-semibold text-slate-400 font-mono">
                      4 Platforms
                    </span>
                  </div>

                  <div className="space-y-1">
                    {productLinks.map((prod) => {
                      const Icon = prod.icon;
                      const colorStyle = serviceColorMap[prod.color] || serviceColorMap.orange;
                      return (
                        <Link
                          key={prod.name}
                          to={prod.path}
                          className="flex items-center space-x-3.5 p-2.5 rounded-xl hover:bg-orange-50/70 border border-transparent hover:border-orange-100 transition-all duration-200 group"
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${colorStyle.container}`}
                          >
                            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-brand-orange transition-colors truncate">
                                {prod.name}
                              </span>
                              <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded border border-orange-200/60 bg-orange-50 text-brand-orange shrink-0">
                                {prod.tag}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 leading-snug mt-0.5">
                              {prod.category}
                            </div>
                          </div>

                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-mono shrink-0">
                            {prod.status}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-2.5 px-3 border-t border-orange-100/80 mt-2 flex items-center justify-between">
                    <Link
                      to="/products"
                      className="text-xs font-bold text-brand-orange hover:underline flex items-center space-x-1.5"
                    >
                      <span>Explore Platform Ecosystem</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[10px] text-slate-400 font-medium">Verified Status</span>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/portfolio"
              className={`px-2.5 2xl:px-3 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                isActive('/portfolio')
                  ? 'text-brand-blue font-bold bg-sky-50/90'
                  : 'text-slate-700 hover:text-brand-blue hover:bg-sky-50/60'
              }`}
            >
              Portfolio
            </Link>

            <Link
              to="/business-model"
              className={`px-2.5 2xl:px-3 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                isActive('/business-model')
                  ? 'text-brand-blue font-bold bg-sky-50/90'
                  : 'text-slate-700 hover:text-brand-blue hover:bg-sky-50/60'
              }`}
            >
              Business Model
            </Link>

            <Link
              to="/partners"
              className={`px-2.5 2xl:px-3 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                isActive('/partners')
                  ? 'text-brand-blue font-bold bg-sky-50/90'
                  : 'text-slate-700 hover:text-brand-blue hover:bg-sky-50/60'
              }`}
            >
              Partner With Us
            </Link>

            <Link
              to="/careers"
              className={`px-2.5 2xl:px-3 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                isActive('/careers')
                  ? 'text-brand-blue font-bold bg-sky-50/90'
                  : 'text-slate-700 hover:text-brand-blue hover:bg-sky-50/60'
              }`}
            >
              Careers
            </Link>

            <Link
              to="/contact"
              className={`px-2.5 2xl:px-3 py-1.5 text-[12.5px] 2xl:text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                isActive('/contact')
                  ? 'text-brand-blue font-bold bg-sky-50/90'
                  : 'text-slate-700 hover:text-brand-blue hover:bg-sky-50/60'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* ========================================================= */}
          {/* 3. PROMINENT CALL-TO-ACTION BUTTONS (Sleek, Balanced)     */}
          {/* ========================================================= */}
          <div className="hidden xl:flex items-center space-x-2 2xl:space-x-2.5 shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center px-3.5 py-2 text-xs font-bold rounded-xl text-brand-orange bg-orange-50/80 border border-orange-200/90 hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-2xs"
            >
              Explore Products
            </Link>
            <Link
              to="/contact"
              className="shiny-btn inline-flex items-center px-4.5 py-2 text-xs font-extrabold rounded-xl bg-gradient-to-r from-brand-blue via-sky-600 to-blue-600 hover:from-blue-700 hover:to-brand-blue text-white shadow-md shadow-brand-blue/25 hover:shadow-lg hover:shadow-brand-blue/35 transition-all transform hover:-translate-y-0.5 border border-sky-300/30"
            >
              <span>Let's Discuss Your Project</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* ========================================================= */}
          {/* 4. TABLET QUICK CTA (1024px - 1279px)                     */}
          {/* ========================================================= */}
          <div className="hidden lg:flex xl:hidden items-center space-x-2">
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 text-xs font-extrabold rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sm"
            >
              <span>Discuss Project</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {/* ========================================================= */}
          {/* 5. MOBILE MENU HAMBURGER BUTTON                           */}
          {/* ========================================================= */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-royal-600 hover:bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 6. MOBILE DRAWER MENU (Clean White Theme with Rich Icons) */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 px-5 pt-4 pb-8 space-y-3 max-h-[85vh] overflow-y-auto shadow-2xl">
          {/* Mobile Navigation List */}
          <div className="space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-royal-50 text-royal-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/about')
                  ? 'bg-royal-50 text-royal-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>

            {/* Mobile Services Accordion with Professional Symbols */}
            <div className="py-2.5 border-y border-slate-100 my-2">
              <div className="px-3 py-1 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue font-mono">
                  Vertical 1: IT Services &amp; Solutions
                </span>
                <span className="text-[9px] text-slate-400 font-mono">4 Services</span>
              </div>
              <div className="space-y-1.5 mt-2">
                {serviceLinks.map((item) => {
                  const Icon = item.icon;
                  const colorStyle = serviceColorMap[item.color] || serviceColorMap.blue;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center space-x-3 p-2 rounded-xl text-xs font-medium text-slate-700 hover:text-brand-blue hover:bg-sky-50/70 border border-transparent hover:border-sky-100 transition-colors"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${colorStyle.mobileContainer}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 truncate">{item.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{item.tag}</div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Products Accordion with Professional Symbols */}
            <div className="py-2.5 border-b border-slate-100 mb-2">
              <div className="px-3 py-1 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange font-mono">
                  Vertical 2: Digital Marketplaces &amp; Products
                </span>
                <span className="text-[9px] text-slate-400 font-mono">4 Platforms</span>
              </div>
              <div className="space-y-1.5 mt-2">
                {productLinks.map((prod) => {
                  const Icon = prod.icon;
                  const colorStyle = serviceColorMap[prod.color] || serviceColorMap.orange;
                  return (
                    <Link
                      key={prod.name}
                      to={prod.path}
                      className="flex items-center space-x-3 p-2 rounded-xl text-xs font-medium text-slate-700 hover:text-brand-orange hover:bg-orange-50/70 border border-transparent hover:border-orange-100 transition-colors"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${colorStyle.mobileContainer}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 truncate">{prod.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{prod.category}</div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 font-mono shrink-0">
                        {prod.status}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              to="/portfolio"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/portfolio')
                  ? 'bg-royal-50 text-royal-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Portfolio &amp; Case Studies
            </Link>
            <Link
              to="/business-model"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/business-model')
                  ? 'bg-royal-50 text-royal-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Business Model
            </Link>
            <Link
              to="/partners"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/partners')
                  ? 'bg-royal-50 text-royal-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Partner With Us
            </Link>
            <Link
              to="/careers"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/careers')
                  ? 'bg-royal-50 text-royal-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Careers
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/contact')
                  ? 'bg-royal-50 text-royal-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Drawer CTAs */}
          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2.5">
            <Link
              to="/contact"
              className="flex items-center justify-center w-full px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-sm text-center shadow-md shadow-sky-500/25"
            >
              <span>Let's Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white text-xs font-bold text-center"
            >
              Explore Our Products Ecosystem
            </Link>
          </div>

          {/* Quick Contact Line in Mobile Drawer */}
          <div className="pt-3 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
            <span>Bhopal, MP, India</span>
            <span className="font-mono text-royal-600 font-semibold">CIN: U77100MP2026PTC087531</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
