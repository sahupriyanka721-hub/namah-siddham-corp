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
    name: 'Digital Marketing',
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
    category: 'Mobility & Car Rental',
    status: 'Under Development',
    url: 'https://carrento.in',
  },
  {
    name: 'Jainamshree',
    path: '/products/jainamshree',
    category: 'Jain Community E-commerce',
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
          ? 'bg-navy-900/98 backdrop-blur-md shadow-soft-lg py-2.5 text-white border-b border-navy-800'
          : 'bg-navy-900 py-3.5 text-white border-b border-navy-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Brand Reference (Larger & with New NS Emblem) */}
          <Link to="/" className="flex items-center space-x-3.5 group focus:outline-none shrink-0 py-1">
            <div className="relative flex items-center justify-center p-1.5 rounded-2xl bg-white/10 border border-white/15 shadow-sm group-hover:border-royal-400/50 group-hover:bg-white/15 transition-all">
              <img
                src="/assets/namah-siddham-logo.png"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/namah-siddham-emblem.svg';
                }}
                alt="Namah Siddham Corporation Logo"
                className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-base sm:text-lg text-white tracking-wider leading-tight group-hover:text-royal-300 transition-colors">
                NAMAH SIDDHAM
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-royal-400 tracking-[0.22em] uppercase font-mono leading-none mt-1">
                CORPORATION
              </span>
              <span className="text-[9px] text-gold-400 tracking-wider font-semibold font-mono leading-none mt-1">
                PVT. LTD. &bull; BHOPAL
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'text-gold-400 bg-navy-800 font-bold'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isActive('/about')
                  ? 'text-gold-400 bg-navy-800 font-bold'
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
                className={`inline-flex items-center px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  isActive('/services')
                    ? 'text-gold-400 bg-navy-800 font-bold'
                    : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
                }`}
              >
                <span>IT Services</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-gold-400" />
              </Link>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-soft-xl border border-surface-200 py-3 px-2 z-50 text-navy-800 mt-1 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-surface-200 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-royal-600 font-serif">
                      Vertical 1: IT Solutions
                    </span>
                  </div>
                  {serviceLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-surface-100 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-royal-50 text-royal-600 flex items-center justify-center shrink-0 group-hover:bg-royal-500 group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-navy-900 group-hover:text-royal-600">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-surface-500 line-clamp-1 leading-snug">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-2 px-2 border-t border-surface-200 mt-1">
                    <Link
                      to="/services"
                      className="text-xs font-bold text-royal-600 hover:underline flex items-center justify-between p-1.5"
                    >
                      <span>Explore All Services</span>
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
                className={`inline-flex items-center px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  isActive('/products') || isActive('/ecosystem')
                    ? 'text-gold-400 bg-navy-800 font-bold'
                    : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
                }`}
              >
                <span>Our Products</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-gold-400" />
              </Link>

              {productsDropdown && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-soft-xl border border-surface-200 py-3 px-2 z-50 text-navy-800 mt-1 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-surface-200 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 font-serif">
                      Vertical 2: Digital Marketplaces
                    </span>
                  </div>
                  {productLinks.map((prod) => (
                    <Link
                      key={prod.name}
                      to={prod.path}
                      className="flex items-start justify-between p-2.5 rounded-xl hover:bg-surface-100 transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-bold text-navy-900 group-hover:text-royal-600">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-surface-500">{prod.category}</div>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                        {prod.status}
                      </span>
                    </Link>
                  ))}
                  <div className="pt-2 px-2 border-t border-surface-200 mt-1">
                    <Link
                      to="/products"
                      className="text-xs font-bold text-royal-600 hover:underline flex items-center justify-between p-1.5"
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
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isActive('/portfolio')
                  ? 'text-gold-400 bg-navy-800 font-bold'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Portfolio
            </Link>

            <Link
              to="/business-model"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isActive('/business-model')
                  ? 'text-gold-400 bg-navy-800 font-bold'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Business Model
            </Link>

            <Link
              to="/partners"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isActive('/partners')
                  ? 'text-gold-400 bg-navy-800 font-bold'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Partner With Us
            </Link>

            <Link
              to="/careers"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isActive('/careers')
                  ? 'text-gold-400 bg-navy-800 font-bold'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Careers
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                isActive('/contact')
                  ? 'text-gold-400 bg-navy-800 font-bold'
                  : 'text-surface-300 hover:text-white hover:bg-navy-800/60'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Prominent CTAs matching Logo Palette */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 text-xs font-bold rounded-xl text-orange-400 border border-orange-500/50 hover:bg-orange-500/10 hover:border-orange-400 hover:text-orange-300 transition-all transform hover:-translate-y-0.5"
            >
              Explore Our Products
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2.5 text-xs font-extrabold rounded-xl bg-gradient-to-r from-royal-500 to-royal-600 hover:from-royal-600 hover:to-royal-700 text-white shadow-lg shadow-royal-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Let's Discuss Your Project</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-surface-300 hover:text-white hover:bg-navy-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-navy-950 border-b border-navy-800 px-4 pt-4 pb-6 space-y-2 max-h-[85vh] overflow-y-auto">
          <Link
            to="/"
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-surface-200 hover:bg-navy-800"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-surface-200 hover:bg-navy-800"
          >
            About Us
          </Link>

          {/* Mobile Services Accordion */}
          <div className="py-1">
            <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 font-serif">
              IT Services & Solutions
            </div>
            {serviceLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block pl-6 pr-3 py-1.5 text-xs text-surface-300 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Products Accordion */}
          <div className="py-1">
            <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 font-serif">
              Our Products & Marketplaces
            </div>
            {productLinks.map((prod) => (
              <Link
                key={prod.name}
                to={prod.path}
                className="flex items-center justify-between pl-6 pr-3 py-1.5 text-xs text-surface-300 hover:text-white"
              >
                <span>{prod.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-800">
                  {prod.status}
                </span>
              </Link>
            ))}
          </div>

          <Link
            to="/portfolio"
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-surface-200 hover:bg-navy-800"
          >
            Portfolio
          </Link>
          <Link
            to="/business-model"
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-surface-200 hover:bg-navy-800"
          >
            Business Model
          </Link>
          <Link
            to="/partners"
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-surface-200 hover:bg-navy-800"
          >
            Partner With Us
          </Link>
          <Link
            to="/careers"
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-surface-200 hover:bg-navy-800"
          >
            Careers
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-surface-200 hover:bg-navy-800"
          >
            Contact Us
          </Link>

          {/* Mobile CTAs */}
          <div className="pt-4 border-t border-navy-800 flex flex-col space-y-2">
            <Link
              to="/contact"
              className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-royal-500 text-white font-bold text-sm text-center shadow-md"
            >
              Let's Discuss Your Project
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl border border-navy-700 text-surface-200 text-xs text-center font-medium"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
