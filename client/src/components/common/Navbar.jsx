import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Code2,
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
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const serviceLinks = [
  {
    name: 'Website Development',
    path: '/services/web-development',
    desc: 'Corporate sites, landing pages & dynamic web applications',
    icon: Globe,
  },
  {
    name: 'Custom Software Development',
    path: '/services/custom-software',
    desc: 'Business management systems, ERP, CRM & tailored software',
    icon: Code2,
  },
  {
    name: 'Mobile Application Development',
    path: '/services/mobile-apps',
    desc: 'Android & iOS customer and partner applications',
    icon: Smartphone,
  },
  {
    name: 'Digital Marketing & SEO',
    path: '/services/digital-marketing',
    desc: 'SEO, digital campaigns, social visibility & lead generation',
    icon: TrendingUp,
  },
];

const productLinks = [
  {
    name: 'HomeServixo',
    path: '/products/homeservixo',
    category: 'Home Services & Appliance Repair',
    status: 'Under Development',
    url: 'https://homeservixo.in',
  },
  {
    name: 'Carrento',
    path: '/products/carrento',
    category: 'Mobility & Car Rental Platform',
    status: 'Under Development',
    url: 'https://carrento.in',
  },
  {
    name: 'Jainamshree',
    path: '/products/jainamshree',
    category: 'Jain Community E-commerce Marketplace',
    status: 'Under Development',
    url: 'https://jainamshree.online',
  },
  {
    name: 'SuperiorMart',
    path: '/products/superiormart',
    category: 'Multi-category E-commerce Marketplace',
    status: 'Under Development',
    url: 'https://superiormart.in',
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
            {/* Elegant Logo Container (No harsh white box; subtle radiant brand-accent glass) */}
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
                <div className="absolute top-full left-0 w-84 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-sky-100 py-3 px-2 z-50 text-slate-900 mt-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-sky-100 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue font-mono">
                      Vertical 1: IT Solutions
                    </span>
                    <span className="text-[9px] text-slate-400">4 Core Capabilities</span>
                  </div>
                  {serviceLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-sky-50/80 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-sky-100 text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-brand-blue">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-2 px-2 border-t border-sky-100 mt-1">
                    <Link
                      to="/services"
                      className="text-xs font-bold text-brand-blue hover:underline flex items-center justify-between p-1.5"
                    >
                      <span>Explore All IT Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
                <div className="absolute top-full left-0 w-88 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100 py-3 px-2 z-50 text-slate-900 mt-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-orange-100 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange font-mono">
                      Vertical 2: Digital Marketplaces
                    </span>
                    <span className="text-[9px] text-slate-400">4 Platforms</span>
                  </div>
                  {productLinks.map((prod) => (
                    <Link
                      key={prod.name}
                      to={prod.path}
                      className="flex items-start justify-between p-2.5 rounded-xl hover:bg-orange-50/80 transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-brand-orange">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{prod.category}</div>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-mono">
                        {prod.status}
                      </span>
                    </Link>
                  ))}
                  <div className="pt-2 px-2 border-t border-orange-100 mt-1">
                    <Link
                      to="/products"
                      className="text-xs font-bold text-brand-orange hover:underline flex items-center justify-between p-1.5"
                    >
                      <span>Explore Platform Ecosystem</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
      {/* 6. MOBILE DRAWER MENU (Clean White Theme)                 */}
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

            {/* Mobile Services Accordion */}
            <div className="py-2 border-y border-slate-100 my-2">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-royal-600 font-mono">
                Vertical 1: IT Services &amp; Solutions
              </div>
              <div className="space-y-1 mt-1">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block pl-6 pr-3 py-2 text-xs font-medium text-slate-600 hover:text-royal-600 hover:bg-royal-50 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Products Accordion */}
            <div className="py-2 border-b border-slate-100 mb-2">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-600 font-mono">
                Vertical 2: Digital Marketplaces &amp; Products
              </div>
              <div className="space-y-1 mt-1">
                {productLinks.map((prod) => (
                  <Link
                    key={prod.name}
                    to={prod.path}
                    className="flex items-center justify-between pl-6 pr-3 py-2 text-xs font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                  >
                    <span>{prod.name}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 font-mono">
                      {prod.status}
                    </span>
                  </Link>
                ))}
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
