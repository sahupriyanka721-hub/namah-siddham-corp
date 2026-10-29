import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Monitor,
  Code2,
  Smartphone,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';

const getServiceIcon = (icon) => {
  switch (icon) {
    case 'Code2':
    case 'Cpu':
      return Cpu;
    case 'Smartphone':
      return Smartphone;
    case 'TrendingUp':
      return TrendingUp;
    case 'Globe':
    case 'Monitor':
    default:
      return Monitor;
  }
};

const serviceImageMap = {
  'web-development': '/assets/services/web-development.jpg',
  'custom-software': '/assets/services/custom-software.jpg',
  'mobile-apps': '/assets/services/mobile-apps.jpg',
  'digital-marketing': '/assets/services/digital-marketing.jpg',
};

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await publicApi.getServices();
        setServices(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      <SeoMeta
        title="IT Services & Digital Solutions"
        description="Comprehensive IT services including Website Development, Custom Software, Mobile Applications, and Digital Marketing by Namah Siddham Corporation Private Limited."
        keywords="Website Development Bhopal, Custom Software ERP CRM, Mobile App Development Android iOS, Digital Marketing SEO Agency, Namah Siddham IT Services, Corporate Software Engineering, Bhopal IT Company"
      />

      {/* Header Banner (Radiant Sky-Blue Theme matching Logo) */}
      <section className="bg-gradient-to-b from-[#E0F2FE]/80 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 py-16 sm:py-20 border-b border-sky-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="shiny-badge inline-flex items-center space-x-2 px-4.5 py-1.5 rounded-full text-sky-800 text-xs font-semibold font-mono uppercase tracking-wider">
            <span>Vertical 1: IT Services and Digital Solutions</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-brand-navy tracking-tight">
            IT Services &amp; <span className="text-gradient-blue">Digital Solutions</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
            We engineer high-performance web applications, tailored ERP software, mobile apps, and search marketing architectures designed to solve business bottlenecks.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            return (
              <div
                key={service.slug || service._id}
                className="shiny-card bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-sky-300 shadow-md hover:shadow-xl hover:shadow-sky-500/10 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-5">
                  {/* Service 3D Isometric Landscape Illustration */}
                  <Link
                    to={`/services/${service.slug}`}
                    className="block relative overflow-hidden rounded-2xl bg-sky-50 aspect-[16/9] border border-sky-100 shadow-xs group-hover:border-sky-300 transition-all"
                  >
                    <img
                      src={serviceImageMap[service?.slug] || service?.coverImage || `/assets/services/${service?.slug}.jpg`}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        const fallback = serviceImageMap[service?.slug];
                        if (fallback && e.target.src !== window.location.origin + fallback) {
                          e.target.src = fallback;
                        }
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-mono font-bold text-royal-700 bg-white border border-sky-200 px-3 py-1 rounded-full shadow-xs">
                        Capability 0{index + 1}
                      </span>
                    </div>
                  </Link>

                  <div>
                    <h2 className="font-serif font-bold text-2xl text-navy-900 group-hover:text-royal-600 transition-colors">
                      <Link to={`/services/${service.slug}`}>{service.title}</Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-surface-500 mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {service.keyFeatures && (
                    <div className="space-y-2 pt-2 border-t border-surface-200">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-royal-600 font-serif block">
                        Key Capabilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-navy-800">
                        {service.keyFeatures.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle2 className="w-3.5 h-3.5 text-royal-500 mr-1.5 mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-surface-200 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-bold text-royal-600 hover:text-royal-700"
                  >
                    <span>Full Service Specifications</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>

                  <Link
                    to="/contact"
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-200 text-navy-800 transition-colors"
                  >
                    Request Proposal
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-sky-50 via-white to-sky-50/60 rounded-3xl p-8 sm:p-12 text-slate-800 border-2 border-sky-100 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-slate-950">Full-Stack Capability</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We own the full stack — from componentized React frontends and Tailwind styling to robust Node.js APIs and optimized MongoDB database schemas.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-slate-950">Data Security &amp; RBAC</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Strict server-side validation, role-based authorization, bcrypt encryption, and sanitized inputs ensure confidentiality of sensitive business records.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-xl text-slate-950">Production Deliverables</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every deliverable includes clean documentation, source repository handover, responsive testing on multiple viewports, and administrative training.
            </p>
          </div>
        </div>
      </section>

      {/* Project CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-surface-200 shadow-soft-sm max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif font-black text-2xl sm:text-3xl text-navy-900">
            Have a Specific Software or Website Requirement?
          </h2>
          <p className="text-xs sm:text-sm text-surface-500 max-w-xl mx-auto">
            Our technology team in Bhopal evaluates scope, prepares technical architecture plans, and delivers production-oriented digital assets.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 transition-all"
            >
              <span>Submit Project Requirements</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
