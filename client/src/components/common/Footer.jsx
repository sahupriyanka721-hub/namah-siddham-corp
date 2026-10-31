import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-navy-950 text-surface-300 border-t border-navy-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
          {/* Column 1: Brand Logo & Introduction */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block focus:outline-none">
              <div className="flex items-center space-x-3.5">
                {/* Premium Dark Glass Logo Container (No harsh white box; rich dark glass & subtle rim) */}
                <div className="p-2.5 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-sky-500/30 shadow-xl shadow-sky-950/60 ring-1 ring-amber-400/20 group-hover:border-sky-400/60 transition-all">
                  <img
                    src="/assets/namah-siddham-emblem.svg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/namah-siddham-logo.svg';
                    }}
                    alt="Namah Siddham Corporation Logo"
                    className="h-12 sm:h-14 w-auto object-contain filter drop-shadow-md"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-lg text-white tracking-wider">
                    NAMAH SIDDHAM
                  </span>
                  <span className="text-[10px] font-bold text-sky-400 tracking-[0.2em] uppercase font-mono">
                    CORPORATION PRIVATE LIMITED
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-xs text-gold-400 font-mono tracking-wider font-semibold">
              CIN: {settings.cin || 'U77100MP2026PTC087531'}
            </p>
            <p className="text-xs sm:text-sm text-surface-400 leading-relaxed pr-4">
              {settings.footerContent?.aboutText ||
                'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-surface-400">
              <span className="inline-flex items-center text-sky-300 font-semibold">
                <ShieldCheck className="w-4 h-4 mr-1 text-sky-400" />
                {settings.companyType || 'Private Limited Company'}
              </span>
              <span>•</span>
              <span>Registered in Bhopal, MP, India</span>
            </div>
          </div>

          {/* Column 2: IT Services Links */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold tracking-wider uppercase font-serif border-b border-navy-800 pb-2 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mr-2" />
              IT Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/services/web-development"
                  className="hover:text-gold-400 transition-colors"
                >
                  Website Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services/custom-software"
                  className="hover:text-gold-400 transition-colors"
                >
                  Custom Software &amp; ERP
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-apps" className="hover:text-gold-400 transition-colors">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link
                  to="/services/digital-marketing"
                  className="hover:text-gold-400 transition-colors"
                >
                  Digital Marketing &amp; SEO
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/services"
                  className="text-xs text-sky-400 font-bold hover:underline inline-flex items-center"
                >
                  <span>All IT Services</span>
                  <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Platforms */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold tracking-wider uppercase font-serif border-b border-navy-800 pb-2 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2" />
              Digital Products
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/products/homeservixo"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between group"
                >
                  <span>HomeServixo</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/carrento"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between group"
                >
                  <span>Carrento</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/jainamshree"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between group"
                >
                  <span>Jainamshree</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products/superiormart"
                  className="hover:text-gold-400 transition-colors flex items-center justify-between group"
                >
                  <span>SuperiorMart</span>
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/products"
                  className="text-xs text-orange-400 font-bold hover:underline inline-flex items-center"
                >
                  <span>Product Ecosystem</span>
                  <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Registered Office & Contact */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold tracking-wider uppercase font-serif border-b border-navy-800 pb-2">
              Registered Office
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-surface-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span>
                  {settings.registeredOffice?.fullAddress ||
                    'Registered Office: Bhopal, Madhya Pradesh, India. CIN: U77100MP2026PTC087531'}
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`mailto:${settings.officialEmail || 'nscpl01@gmail.com'}`}
                  className="hover:text-white transition-colors truncate"
                >
                  {settings.officialEmail || 'nscpl01@gmail.com'}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`tel:${settings.officialPhone || '9516262715'}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.officialPhone || '9516262715'}
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-3 border-t border-navy-900 flex items-center space-x-3 text-xs">
              {settings.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {settings.socialLinks?.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              )}
              <Link to="/partners" className="text-gold-400 font-semibold hover:underline">
                Partner Inquiries
              </Link>
            </div>

            {/* Leadership & Team Link */}
            <div className="pt-2 text-xs">
              <Link to="/team" className="text-amber-400 font-bold hover:text-white transition-colors inline-flex items-center space-x-1">
                <span>Meet Leadership &amp; Board →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Links & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-surface-400 space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms-of-use" className="hover:text-gold-400 transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <Link to="/cookie-policy" className="text-sky-300 font-semibold hover:text-gold-400 transition-colors">
              Cookie Policy
            </Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-gold-400 transition-colors">
              Website Disclaimer
            </Link>
            <span>•</span>
            <Link to="/grievance" className="hover:text-gold-400 transition-colors">
              Grievance Contact
            </Link>
            <span>•</span>
            <Link to="/team" className="hover:text-gold-400 transition-colors">
              Leadership &amp; Governance
            </Link>
            <span>•</span>
            <Link to="/portfolio" className="hover:text-gold-400 transition-colors">
              Portfolio
            </Link>
            <span>•</span>
            <Link to="/careers" className="hover:text-gold-400 transition-colors">
              Careers
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <p>
              {settings.footerContent?.copyrightText ||
                '© 2026 Namah Siddham Corporation Private Limited. All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
