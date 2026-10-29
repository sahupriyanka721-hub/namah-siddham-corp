import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  LogIn,
  Home,
  Car,
  ShoppingBag,
  Store,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const serviceLinks = [
  {
    name: 'Website Development',
    path: '/services/web-development',
    desc: 'Corporate sites, landing pages & dynamic web applications',
    hoverText: 'group-hover:text-brand-blue',
    hoverBg: 'hover:bg-sky-50/70',
  },
  {
    name: 'Custom Software Development',
    path: '/services/custom-software',
    desc: 'Business management systems, ERP, CRM & tailored software',
    hoverText: 'group-hover:text-brand-navy',
    hoverBg: 'hover:bg-slate-50/80',
  },
  {
    name: 'Mobile Application Development',
    path: '/services/mobile-apps',
    desc: 'Android & iOS customer and partner applications',
    hoverText: 'group-hover:text-brand-orange',
    hoverBg: 'hover:bg-orange-50/70',
  },
  {
    name: 'Digital Marketing & SEO',
    path: '/services/digital-marketing',
    desc: 'SEO, digital campaigns, social visibility & lead generation',
    hoverText: 'group-hover:text-amber-700',
    hoverBg: 'hover:bg-amber-50/70',
  },
];

const productLinks = [
  {
    name: 'HomeServixo',
    fullName: 'HomeServixo — Home Services & Appliance Repair',
    path: '/products/homeservixo',
    category: 'Home Services & Appliance Repair Platform',
    status: 'Under Development',
    url: 'https://homeservixo.in',
    icon: Home,
    iconBox: 'bg-sky-50 text-brand-blue border-sky-200 group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue',
    hoverText: 'group-hover:text-brand-blue',
    hoverBg: 'hover:bg-sky-50/70',
  },
  {
    name: 'Carrento',
    fullName: 'Carrento — Mobility & Car Rental Platform',
    path: '/products/carrento',
    category: 'Mobility & Car Rental Platform',
    status: 'Under Development',
    url: 'https://carrento.in',
    icon: Car,
    iconBox: 'bg-orange-50 text-brand-orange border-orange-200 group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange',
    hoverText: 'group-hover:text-brand-orange',
    hoverBg: 'hover:bg-orange-50/70',
  },
  {
    name: 'Jainamshree',
    fullName: 'Jainamshree — Jain Community E-commerce Marketplace',
    path: '/products/jainamshree',
    category: 'Jain Community E-commerce Marketplace',
    status: 'Under Development',
    url: 'https://jainamshree.online',
    icon: ShoppingBag,
    iconBox: 'bg-amber-50 text-amber-700 border-amber-200 group-hover:bg-brand-gold group-hover:text-brand-navy group-hover:border-brand-gold',
    hoverText: 'group-hover:text-amber-700',
    hoverBg: 'hover:bg-amber-50/70',
  },
  {
    name: 'SuperiorMart',
    fullName: 'SuperiorMart — Multi-category E-commerce Marketplace',
    path: '/products/superiormart',
    category: 'Multi-category E-commerce Marketplace',
    status: 'Under Development',
    url: 'https://superiormart.in',
    icon: Store,
    iconBox: 'bg-slate-100 text-brand-navy border-slate-300 group-hover:bg-brand-navy group-hover:text-brand-gold group-hover:border-brand-navy',
    hoverText: 'group-hover:text-brand-navy',
    hoverBg: 'hover:bg-slate-50/80',
  },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

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
      className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
        scrolled
          ? 'shadow-md py-2.5 border-b border-sky-200'
          : 'py-3 sm:py-3.5 border-b border-sky-100 shadow-xs'
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
            {/* Elegant Solid Logo Container (No Transparency) */}
            <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-white border-2 border-sky-200 shadow-xs group-hover:scale-105 group-hover:border-sky-400 group-hover:shadow-md transition-all">
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

            {/* Typography in exact corporate logo color combination (Royal Blue 'N' + Sunburst Orange 'S') */}
            <div className="flex flex-col justify-center">
              <span className="font-heading font-black text-base sm:text-lg tracking-wide leading-tight transition-transform group-hover:scale-[1.02]">
                <span className="text-brand-blue">NAMAH</span>{' '}
                <span className="text-brand-orange">SIDDHAM</span>
              </span>
            </div>
          </Link>

          {/* ========================================================= */}
          {/* 2. DESKTOP NAVIGATION LINKS (Clean, Spacious Corporate Nav) */}
          {/* ========================================================= */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 2xl:space-x-2">
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
                <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-2xl border border-sky-200 py-3 px-2 z-50 text-slate-900 mt-2 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                  {/* Top Logo Brand Line */}
                  <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-orange -mx-2 -mt-3 mb-2" />

                  <div className="px-3 py-1.5 border-b border-sky-100 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue font-mono">
                      Vertical 1: IT Solutions
                    </span>
                    <span className="text-[9px] text-slate-400">4 Core Capabilities</span>
                  </div>
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block p-2.5 rounded-xl ${item.hoverBg} transition-colors group`}
                    >
                      <div className={`text-xs font-bold text-brand-navy ${item.hoverText} transition-colors`}>
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 leading-snug mt-0.5">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 px-2 border-t border-sky-100 mt-1">
                    <Link
                      to="/services"
                      className="text-xs font-bold text-brand-blue hover:text-brand-orange hover:underline flex items-center justify-between p-1.5 transition-colors"
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
                    ? 'text-brand-orange font-bold bg-orange-50'
                    : 'text-slate-700 hover:text-brand-orange hover:bg-orange-50'
                }`}
              >
                <span>Product Ecosystem</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-orange-500" />
              </Link>

              {productsDropdown && (
                <div className="absolute top-full left-0 w-96 bg-white rounded-2xl shadow-2xl border border-orange-200 py-3 px-2 z-50 text-slate-900 mt-2 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                  {/* Top Logo Brand Line */}
                  <div className="h-1 bg-gradient-to-r from-brand-orange via-brand-gold to-brand-blue -mx-2 -mt-3 mb-2" />

                  <div className="px-3 py-1.5 border-b border-orange-100 mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange font-mono">
                      Vertical 2: Digital Marketplaces
                    </span>
                    <span className="text-[9px] text-slate-400">4 Platforms</span>
                  </div>
                  {productLinks.map((prod) => {
                    const Icon = prod.icon;
                    return (
                      <Link
                        key={prod.name}
                        to={prod.path}
                        title={`${prod.fullName} (${prod.status})`}
                        className={`flex items-center space-x-3 p-2.5 rounded-xl bg-white hover:bg-orange-50/90 border border-transparent hover:border-orange-100 transition-all duration-150 group`}
                      >
                        {/* Logo Color Aligned Icon Box */}
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all shadow-xs ${prod.iconBox}`}>
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className={`text-xs font-bold text-brand-navy ${prod.hoverText} transition-colors`}>
                              {prod.name}
                            </span>
                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-mono shrink-0">
                              {prod.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 font-medium leading-snug group-hover:text-slate-950 transition-colors mt-0.5">
                            {prod.category}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-2 px-2 border-t border-orange-100 mt-1">
                    <Link
                      to="/products"
                      className="text-xs font-bold text-brand-orange hover:text-brand-blue hover:underline flex items-center justify-between p-1.5 transition-colors"
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
          {/* 3. SIGN IN / PORTAL BUTTON (Desktop)                      */}
          {/* ========================================================= */}
          <div className="hidden lg:flex items-center pl-1 shrink-0">
            {isAuthenticated ? (
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center px-3.5 py-1.5 text-xs font-bold rounded-xl text-brand-navy hover:text-brand-blue bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="inline-flex items-center px-3.5 py-1.5 text-xs font-bold rounded-xl text-brand-navy hover:text-brand-blue bg-slate-50 hover:bg-sky-50/90 border border-slate-200/90 hover:border-sky-300 transition-all shadow-xs group"
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5 text-brand-blue group-hover:translate-x-0.5 transition-transform" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* ========================================================= */}
          {/* 4. MOBILE MENU HAMBURGER BUTTON                           */}
          {/* ========================================================= */}
          <div className="flex lg:hidden items-center">
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
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-4 pb-8 space-y-3 max-h-[85vh] overflow-y-auto shadow-2xl">
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
                Vertical 2: Product Ecosystem
              </div>
              <div className="space-y-1 mt-1">
                {productLinks.map((prod) => (
                  <Link
                    key={prod.name}
                    to={prod.path}
                    title={`${prod.fullName} (${prod.status})`}
                    className="flex flex-col pl-6 pr-3 py-2 text-xs font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 group-hover:text-brand-orange transition-colors">{prod.name}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 font-mono">
                        {prod.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {prod.category}
                    </div>
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

          {/* Mobile Sign In */}
          <div className="pt-2 border-t border-slate-100">
            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 text-brand-navy hover:text-brand-blue border border-slate-200 text-xs font-bold transition-all shadow-xs"
            >
              <LogIn className="w-4 h-4 text-brand-blue" />
              <span>{isAuthenticated ? "Admin Dashboard" : "Sign In"}</span>
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
