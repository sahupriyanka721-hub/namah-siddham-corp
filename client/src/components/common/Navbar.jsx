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
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200/90'
          : 'bg-white py-3 sm:py-3.5 border-b border-slate-100 shadow-sm'
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
            {/* Logo Image directly on pure white header for 100% natural blend */}
            <div className="relative flex items-center justify-center p-0.5 rounded-xl group-hover:scale-105 transition-all">
              <img
                src="/assets/namah-siddham-logo.jpg"
                onError={(e) => {
                  if (!e.target.dataset.triedPng) {
                    e.target.dataset.triedPng = 'true';
                    e.target.src = '/assets/namah-siddham-logo.png';
                  } else {
                    e.target.onerror = null;
                    e.target.src = '/assets/namah-siddham-emblem.svg';
                  }
                }}
                alt="Namah Siddham Corporation Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain rounded-lg"
              />
            </div>

            {/* Typography in exact corporate colors (Dark Navy + Royal Blue + Gold) */}
            <div className="flex flex-col">
              <span className="font-heading font-black text-base sm:text-lg text-slate-900 tracking-wide leading-tight group-hover:text-royal-600 transition-colors">
                NAMAH SIDDHAM
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-royal-600 tracking-[0.2em] uppercase font-mono">
                  CORPORATION
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80 font-mono tracking-wider">
                  BHOPAL, MP
                </span>
              </div>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* 2. DESKTOP NAVIGATION LINKS (Exact 9 Prompt Links)         */}
          {/* ========================================================= */}
          <nav className="hidden xl:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/') && location.pathname === '/'
                  ? 'text-royal-600 bg-royal-50 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-royal-600 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/about')
                  ? 'text-royal-600 bg-royal-50 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-royal-600 hover:bg-slate-50'
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
                className={`inline-flex items-center px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  isActive('/services')
                    ? 'text-royal-600 bg-royal-50 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-royal-600 hover:bg-slate-50'
                }`}
              >
                <span>IT Services</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-royal-500" />
              </Link>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 px-2 z-50 text-slate-900 mt-1 animate-in fade-in slide-in-from-top-2">
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
                        className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-royal-50/80 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-royal-100 text-royal-600 flex items-center justify-center shrink-0 group-hover:bg-royal-600 group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-royal-600">
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
                className={`inline-flex items-center px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  isActive('/products') || isActive('/ecosystem')
                    ? 'text-orange-600 bg-orange-50 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
                }`}
              >
                <span>Our Products</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-orange-500" />
              </Link>

              {productsDropdown && (
                <div className="absolute top-full left-0 w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 px-2 z-50 text-slate-900 mt-1 animate-in fade-in slide-in-from-top-2">
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
                      className="flex items-start justify-between p-2.5 rounded-xl hover:bg-orange-50/80 transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600">
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
                  ? 'text-royal-600 bg-royal-50 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-royal-600 hover:bg-slate-50'
              }`}
            >
              Portfolio
            </Link>

            <Link
              to="/business-model"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/business-model')
                  ? 'text-royal-600 bg-royal-50 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-royal-600 hover:bg-slate-50'
              }`}
            >
              Business Model
            </Link>

            <Link
              to="/partners"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/partners')
                  ? 'text-royal-600 bg-royal-50 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-royal-600 hover:bg-slate-50'
              }`}
            >
              Partner With Us
            </Link>

            <Link
              to="/careers"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/careers')
                  ? 'text-royal-600 bg-royal-50 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-royal-600 hover:bg-slate-50'
              }`}
            >
              Careers
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                isActive('/contact')
                  ? 'text-royal-600 bg-royal-50 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-royal-600 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* ========================================================= */}
          {/* 3. PROMINENT CALL-TO-ACTION BUTTONS (Blue & Orange)       */}
          {/* ========================================================= */}
          <div className="hidden xl:flex items-center space-x-2.5 shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center px-3.5 py-2 text-xs font-bold rounded-xl text-orange-600 border-2 border-orange-500/80 hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-0.5 shadow-xs"
            >
              Explore Products
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-4.5 py-2.5 text-xs font-extrabold rounded-xl bg-gradient-to-r from-royal-600 to-royal-500 hover:from-royal-700 hover:to-royal-600 text-white shadow-md shadow-royal-500/25 transition-all transform hover:-translate-y-0.5"
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
              className="inline-flex items-center px-4 py-2 text-xs font-extrabold rounded-xl bg-royal-600 hover:bg-royal-700 text-white shadow-sm"
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
              className="flex items-center justify-center w-full px-5 py-3 rounded-xl bg-gradient-to-r from-royal-600 to-royal-500 text-white font-extrabold text-sm text-center shadow-md shadow-royal-500/25"
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
