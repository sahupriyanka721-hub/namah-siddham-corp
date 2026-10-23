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
          ? 'bg-navy-950/98 backdrop-blur-md shadow-xl py-2.5 text-white border-b border-navy-800/80'
          : 'bg-navy-950 py-3 sm:py-3.5 text-white border-b border-navy-800/80'
      }`}
    >
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
            {/* Logo Badge Container (Bigger & Crisp) */}
            <div className="relative flex items-center justify-center p-1 sm:p-1.5 rounded-2xl bg-white shadow-md border border-slate-200 group-hover:scale-105 group-hover:shadow-royal-500/25 transition-all">
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
                className="h-12 sm:h-14 md:h-16 w-auto object-contain"
              />
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <span className="font-heading font-black text-base sm:text-lg text-white tracking-wide leading-tight group-hover:text-royal-300 transition-colors">
                NAMAH SIDDHAM
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-royal-400 tracking-[0.2em] uppercase font-mono">
                  CORPORATION
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-gold-400 bg-gold-400/10 px-1.5 py-0.5 rounded border border-gold-400/20 font-mono tracking-wider">
                  BHOPAL, MP
                </span>
              </div>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* 2. DESKTOP NAVIGATION LINKS (9 Prompt Links)               */}
          {/* ========================================================= */}
          <nav className="hidden xl:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/') && location.pathname === '/'
                  ? 'text-gold-400 bg-navy-800/90 font-bold shadow-sm'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/about')
                  ? 'text-gold-400 bg-navy-800/90 font-bold shadow-sm'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              About Us
            </Link>

            {/* IT Services Dropdown */}
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
                className={`inline-flex items-center px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  isActive('/services')
                    ? 'text-royal-300 bg-navy-800/90 font-bold shadow-sm'
                    : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
                }`}
              >
                <span>IT Services</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-royal-400" />
              </Link>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 px-2 z-50 text-navy-900 mt-1 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-royal-600 font-mono">
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
                        className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-royal-50/60 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-royal-100 text-royal-600 flex items-center justify-center shrink-0 group-hover:bg-royal-500 group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-navy-900 group-hover:text-royal-600">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-2 px-2 border-t border-slate-100 mt-1">
                    <Link
                      to="/services"
                      className="text-xs font-bold text-royal-600 hover:underline flex items-center justify-between p-1.5"
                    >
                      <span>Explore All IT Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Our Products Dropdown */}
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
                className={`inline-flex items-center px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  isActive('/products') || isActive('/ecosystem')
                    ? 'text-orange-400 bg-navy-800/90 font-bold shadow-sm'
                    : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
                }`}
              >
                <span>Our Products</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-orange-400" />
              </Link>

              {productsDropdown && (
                <div className="absolute top-full left-0 w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 px-2 z-50 text-navy-900 mt-1 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 font-mono">
                      Vertical 2: Digital Marketplaces
                    </span>
                    <span className="text-[9px] text-slate-400">4 Platforms</span>
                  </div>
                  {productLinks.map((prod) => (
                    <Link
                      key={prod.name}
                      to={prod.path}
                      className="flex items-start justify-between p-2.5 rounded-xl hover:bg-orange-50/60 transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-navy-900 group-hover:text-orange-600">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{prod.category}</div>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 font-mono">
                        {prod.status}
                      </span>
                    </Link>
                  ))}
                  <div className="pt-2 px-2 border-t border-slate-100 mt-1">
                    <Link
                      to="/products"
                      className="text-xs font-bold text-orange-600 hover:underline flex items-center justify-between p-1.5"
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
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/portfolio')
                  ? 'text-gold-400 bg-navy-800/90 font-bold shadow-sm'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Portfolio
            </Link>

            <Link
              to="/business-model"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/business-model')
                  ? 'text-gold-400 bg-navy-800/90 font-bold shadow-sm'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Business Model
            </Link>

            <Link
              to="/partners"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/partners')
                  ? 'text-gold-400 bg-navy-800/90 font-bold shadow-sm'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Partner With Us
            </Link>

            <Link
              to="/careers"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/careers')
                  ? 'text-gold-400 bg-navy-800/90 font-bold shadow-sm'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Careers
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/contact')
                  ? 'text-gold-400 bg-navy-800/90 font-bold shadow-sm'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* ========================================================= */}
          {/* 3. PROMINENT CALL-TO-ACTION BUTTONS                       */}
          {/* ========================================================= */}
          <div className="hidden xl:flex items-center space-x-2.5 shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center px-3.5 py-2 text-xs font-bold rounded-xl text-orange-400 border border-orange-500/40 hover:bg-orange-500/10 hover:border-orange-400 hover:text-orange-300 transition-all transform hover:-translate-y-0.5"
            >
              Explore Products
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-4.5 py-2.5 text-xs font-extrabold rounded-xl bg-gradient-to-r from-royal-500 to-royal-600 hover:from-royal-600 hover:to-royal-700 text-white shadow-lg shadow-royal-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Let's Discuss Your Project</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* ========================================================= */}
          {/* 4. TABLET & LAPTOP QUICK CTA (1024px - 1279px)            */}
          {/* ========================================================= */}
          <div className="hidden lg:flex xl:hidden items-center space-x-2">
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 text-xs font-extrabold rounded-xl bg-royal-500 text-white shadow-md"
            >
              <span>Discuss Project</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>

          {/* ========================================================= */}
          {/* 5. MOBILE MENU HAMBURGER BUTTON                           */}
          {/* ========================================================= */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-surface-200 hover:text-white hover:bg-navy-800/80 border border-navy-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 6. MOBILE DRAWER MENU                                     */}
      {/* ========================================================= */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-navy-950/98 backdrop-blur-xl border-b border-navy-800 px-5 pt-4 pb-8 space-y-3 max-h-[85vh] overflow-y-auto">
          {/* Mobile Navigation List */}
          <div className="space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-navy-800 text-gold-400 font-bold'
                  : 'text-surface-200 hover:bg-navy-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/about')
                  ? 'bg-navy-800 text-gold-400 font-bold'
                  : 'text-surface-200 hover:bg-navy-900'
              }`}
            >
              About Us
            </Link>

            {/* Mobile Services Accordion */}
            <div className="py-2 border-y border-navy-800/60 my-2">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                Vertical 1: IT Services &amp; Solutions
              </div>
              <div className="space-y-1 mt-1">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block pl-6 pr-3 py-2 text-xs font-medium text-surface-300 hover:text-white hover:bg-navy-900 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Products Accordion */}
            <div className="py-2 border-b border-navy-800/60 mb-2">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-400 font-mono">
                Vertical 2: Digital Marketplaces &amp; Products
              </div>
              <div className="space-y-1 mt-1">
                {productLinks.map((prod) => (
                  <Link
                    key={prod.name}
                    to={prod.path}
                    className="flex items-center justify-between pl-6 pr-3 py-2 text-xs font-medium text-surface-300 hover:text-white hover:bg-navy-900 rounded-lg"
                  >
                    <span>{prod.name}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-orange-950 text-orange-300 border border-orange-800 font-mono">
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
                  ? 'bg-navy-800 text-gold-400 font-bold'
                  : 'text-surface-200 hover:bg-navy-900'
              }`}
            >
              Portfolio &amp; Case Studies
            </Link>
            <Link
              to="/business-model"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/business-model')
                  ? 'bg-navy-800 text-gold-400 font-bold'
                  : 'text-surface-200 hover:bg-navy-900'
              }`}
            >
              Business Model
            </Link>
            <Link
              to="/partners"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/partners')
                  ? 'bg-navy-800 text-gold-400 font-bold'
                  : 'text-surface-200 hover:bg-navy-900'
              }`}
            >
              Partner With Us
            </Link>
            <Link
              to="/careers"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/careers')
                  ? 'bg-navy-800 text-gold-400 font-bold'
                  : 'text-surface-200 hover:bg-navy-900'
              }`}
            >
              Careers
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/contact')
                  ? 'bg-navy-800 text-gold-400 font-bold'
                  : 'text-surface-200 hover:bg-navy-900'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Drawer CTAs */}
          <div className="pt-4 border-t border-navy-800 flex flex-col space-y-2.5">
            <Link
              to="/contact"
              className="flex items-center justify-center w-full px-5 py-3 rounded-xl bg-gradient-to-r from-royal-500 to-royal-600 text-white font-extrabold text-sm text-center shadow-lg shadow-royal-500/25"
            >
              <span>Let's Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl border border-orange-500/50 text-orange-400 hover:bg-orange-500/10 text-xs font-bold text-center"
            >
              Explore Our Products Ecosystem
            </Link>
          </div>

          {/* Quick Contact Line in Mobile Drawer */}
          <div className="pt-3 text-[11px] text-surface-400 flex items-center justify-between border-t border-navy-900">
            <span>Bhopal, MP, India</span>
            <span className="font-mono text-gold-400">CIN: U77100MP2026PTC087531</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;