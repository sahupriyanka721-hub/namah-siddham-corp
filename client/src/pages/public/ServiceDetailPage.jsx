import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Globe,
  Monitor,
  Code2,
  Cpu,
  Smartphone,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Workflow,
  PackageCheck,
  Building,
  HelpCircle,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';
import { Button } from '../../components/common/Button';

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

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    city: '',
    budgetRange: '',
    projectDescription: '',
    preferredContactMethod: 'Email',
    consent: true,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(null);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const res = await publicApi.getServiceBySlug(slug);
        setService(res.data?.data || null);
        setRelated(res.data?.related || []);
      } catch (err) {
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!formData.name || !formData.email || !formData.phone || !formData.city || !formData.projectDescription) {
      setFormError('Please fill in your name, email, phone number, city, and project description.');
      return;
    }

    if (!formData.consent) {
      setFormError('Please provide consent to proceed with your project inquiry.');
      return;
    }

    setFormSubmitting(true);
    try {
      const payload = {
        ...formData,
        serviceRequired: service?.title || 'Website Development',
      };
      const res = await publicApi.submitContact(payload);
      if (res.data?.success) {
        setFormSuccess({
          message: res.data.message || 'Inquiry submitted successfully.',
          referenceId: res.data.referenceId,
        });
        setFormData({
          name: '',
          businessName: '',
          email: '',
          phone: '',
          city: '',
          budgetRange: '',
          projectDescription: '',
          preferredContactMethod: 'Email',
          consent: true,
        });
      }
    } catch (err) {
      setFormError(
        err.response?.data?.message || 'Failed to submit inquiry. Please check your connection and try again.'
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-royal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-surface-500 text-xs">Loading service specifications...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-navy-900">Service Not Found</h2>
        <p className="text-surface-500 text-xs sm:text-sm">
          The requested IT service could not be located or is currently unpublished.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center text-xs font-bold text-royal-600 hover:underline"
        >
          ← Return to All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title={service.seoTitle || service.title}
        description={service.seoDescription || service.shortDescription}
      />

      {/* Header Banner (Radiant Sky-Blue Theme matching Logo) with 3D Tech Visual Showcase */}
      <section className="bg-gradient-to-b from-[#E0F2FE]/90 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 py-12 sm:py-16 border-b border-sky-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left: Service Information & Metadata */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <Link to="/" className="hover:text-royal-600">
                  Home
                </Link>
                <span>/</span>
                <Link to="/services" className="hover:text-royal-600">
                  IT Services
                </Link>
                <span>/</span>
                <span className="text-royal-600 font-semibold">{service.title}</span>
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2">
                  <span className="text-xs font-bold text-royal-700 bg-white border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider font-mono shadow-xs">
                    Vertical 1: IT Solutions
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono">
                    Production Architecture
                  </span>
                </div>
                <h1 className="font-serif font-black text-2xl sm:text-4xl lg:text-5xl text-slate-950 tracking-tight leading-tight">
                  {service.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              {/* Fast Highlights Badges */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-700">
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-sky-100 shadow-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-royal-600 mr-1.5 shrink-0" />
                  Scalable Systems
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-sky-100 shadow-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-royal-600 mr-1.5 shrink-0" />
                  Security Enforced
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-white border border-sky-100 shadow-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-royal-600 mr-1.5 shrink-0" />
                  Bespoke Engineering
                </span>
              </div>
            </div>

            {/* Right: Bespoke 16:9 Widescreen Landscape 3D Tech Illustration Showcase Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-xl border-2 border-sky-200 hover:border-sky-300 transition-all duration-300 group relative">
                {/* Visual Label */}
                <div className="flex items-center justify-between pb-2 px-1 text-[11px] font-mono text-slate-500 border-b border-sky-100 mb-2.5">
                  <span className="font-bold text-brand-blue flex items-center">
                    <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse mr-1.5" />
                    16:9 Widescreen Architecture Showcase
                  </span>
                  <span className="text-slate-400 font-semibold">Namah Siddham IT</span>
                </div>

                {/* 16:9 Landscape 3D Illustration Image */}
                <div className="relative overflow-hidden rounded-2xl bg-sky-50 aspect-[16/9] flex items-center justify-center">
                  <img
                    src={serviceImageMap[service?.slug] || serviceImageMap[slug] || service?.coverImage || `/assets/services/${service?.slug || slug}.jpg`}
                    alt={`${service.title} Architecture Showcase`}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    onError={(e) => {
                      const fallback = serviceImageMap[service?.slug] || serviceImageMap[slug];
                      if (fallback && e.target.src !== window.location.origin + fallback) {
                        e.target.src = fallback;
                      }
                    }}
                  />
                  {/* Subtle bottom badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 px-3 py-1.5 rounded-xl border border-sky-200 shadow-xs flex items-center justify-between">
                    <span className="text-[11px] font-bold text-brand-navy truncate">
                      {service.title}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-brand-blue uppercase shrink-0 ml-2">
                      16:9 Landscape
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Service Details & Sections */}
        <div className="lg:col-span-8 space-y-12">
          {/* 1. Overview */}
          <section className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm space-y-4">
            <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif block">
              Overview
            </span>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-navy-900">
              Service Capabilities &amp; Scope
            </h2>
            <div className="text-xs sm:text-sm text-surface-600 leading-relaxed space-y-3">
              <p>{service.detailedDescription}</p>
            </div>

            {service.keyFeatures && service.keyFeatures.length > 0 && (
              <div className="pt-4 border-t border-surface-200 space-y-3">
                <span className="text-xs font-bold text-navy-900 uppercase tracking-wider block">
                  Core Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-navy-800">
                  {service.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-royal-500 mr-2 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 2. Problems Addressed & Solutions Provided */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problems Addressed */}
            <div className="bg-white rounded-3xl p-7 border border-surface-200 shadow-soft-sm space-y-4">
              <div className="flex items-center space-x-2 text-orange-600 font-serif font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Problems We Address</span>
              </div>
              <ul className="space-y-2.5 text-xs text-surface-600">
                {(service.problemsSolved?.length > 0
                  ? service.problemsSolved
                  : [
                      'Inefficient manual processes and data entry bottlenecks',
                      'Outdated interfaces that do not convert mobile visitors',
                      'Unreliable data security and fragmented database storage',
                    ]
                ).map((prob, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 mt-1.5 shrink-0" />
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions Provided */}
            <div className="bg-white rounded-3xl p-7 border border-surface-200 shadow-soft-sm space-y-4">
              <div className="flex items-center space-x-2 text-royal-600 font-serif font-bold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>Our Technical Solutions</span>
              </div>
              <ul className="space-y-2.5 text-xs text-surface-600">
                {(service.solutionsProvided?.length > 0
                  ? service.solutionsProvided
                  : [
                      'High-performance full-stack architectures built for scalability',
                      'Mobile-first responsive designs optimized for core web vitals',
                      'Enterprise role-based security with audit trail visibility',
                    ]
                ).map((sol, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-royal-500 mr-2 mt-1.5 shrink-0" />
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Development Process */}
          {service.process && service.process.length > 0 && (
            <section className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif flex items-center">
                  <Workflow className="w-4 h-4 mr-1.5" />
                  Engineering Methodology
                </span>
                <h3 className="font-serif font-bold text-xl text-navy-900">
                  Our Structured Development Process
                </h3>
              </div>

              <div className="space-y-4">
                {service.process.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-surface-50 border border-surface-200 flex items-start space-x-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-royal-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {step.step || idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-navy-900">{step.title}</h4>
                      <p className="text-xs text-surface-500 mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 4. Typical Deliverables & Industries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deliverables */}
            {service.deliverables && service.deliverables.length > 0 && (
              <div className="bg-white rounded-3xl p-7 border border-surface-200 shadow-soft-sm space-y-4">
                <div className="flex items-center space-x-2 text-navy-900 font-serif font-bold text-xs uppercase tracking-wider">
                  <PackageCheck className="w-4 h-4 text-royal-600" />
                  <span>Typical Deliverables</span>
                </div>
                <ul className="space-y-2 text-xs text-surface-600">
                  {service.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-3.5 h-3.5 text-royal-500 mr-2 mt-0.5 shrink-0" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Industries Served */}
            {service.industriesServed && service.industriesServed.length > 0 && (
              <div className="bg-white rounded-3xl p-7 border border-surface-200 shadow-soft-sm space-y-4">
                <div className="flex items-center space-x-2 text-navy-900 font-serif font-bold text-xs uppercase tracking-wider">
                  <Building className="w-4 h-4 text-royal-600" />
                  <span>Supported Industries</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.industriesServed.map((ind, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-lg bg-surface-100 border border-surface-200 text-navy-800 font-medium"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 5. FAQs */}
          {service.faq && service.faq.length > 0 && (
            <section className="bg-white rounded-3xl p-8 border border-surface-200 shadow-soft-sm space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-royal-600 uppercase tracking-widest font-serif flex items-center">
                  <HelpCircle className="w-4 h-4 mr-1.5" />
                  Transparency &amp; FAQ
                </span>
                <h3 className="font-serif font-bold text-xl text-navy-900">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-4">
                {service.faq.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface-50 border border-surface-200 space-y-1.5">
                    <h5 className="font-bold text-xs sm:text-sm text-navy-900">{item.question}</h5>
                    <p className="text-xs text-surface-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Working Project Inquiry Form */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl p-7 border border-surface-200 shadow-soft-lg space-y-6 sticky top-24">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-600 font-serif">
                Direct Inquiry
              </span>
              <h3 className="font-serif font-bold text-xl text-navy-900 mt-1">
                Discuss Your Requirements
              </h3>
              <p className="text-xs text-surface-500 mt-1">
                Connect with our engineering team regarding {service.title}.
              </p>
            </div>

            {/* Success Notification */}
            {formSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1 text-xs">
                <div className="flex items-center font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  <span>Submission Confirmed</span>
                </div>
                <p>{formSuccess.message}</p>
                <div className="font-mono text-[10px] pt-1">
                  Reference: <span className="font-bold">{formSuccess.referenceId}</span>
                </div>
              </div>
            )}

            {/* Error Notification */}
            {formError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center space-x-2 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-navy-900 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">Business Name (Optional)</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g. Sharma Enterprises"
                  className="w-full px-3.5 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@business.com"
                    className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy-900 mb-1">
                    Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-navy-900 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Bhopal"
                    className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy-900 mb-1">Preferred Contact</label>
                  <select
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 font-medium"
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-900 mb-1">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder={`Describe your requirements for ${service.title}...`}
                  className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 rounded text-royal-600 focus:ring-royal-500"
                />
                <label htmlFor="consent" className="text-[11px] text-surface-500 leading-tight">
                  I consent to Namah Siddham Corporation processing my details for this project communication.
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={formSubmitting}
                icon={Send}
                className="w-full py-2.5 text-xs font-bold"
              >
                Submit Project Requirements
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
