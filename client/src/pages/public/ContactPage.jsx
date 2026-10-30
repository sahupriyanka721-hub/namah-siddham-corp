import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { useSettings } from '../../context/SettingsContext';
import { SeoMeta } from '../../components/public/SeoMeta';
import { Button } from '../../components/common/Button';

export const ContactPage = () => {
  const { settings } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    city: 'Bhopal, MP',
    serviceRequired: 'Website Development',
    projectDescription: '',
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessData(null);

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.projectDescription.trim()
    ) {
      setError('Please provide your name, email, mobile number, and message.');
      return;
    }

    if (!formData.consent) {
      setError('Please provide consent to proceed with your inquiry.');
      return;
    }

    setLoading(true);
    try {
      const res = await publicApi.submitContact(formData);
      if (res.data?.success) {
        setSuccessData({
          message:
            'Thank you for contacting Namah Siddham Corporation. Your inquiry has been received. Our team will review your message and get in touch using the contact details you provided.',
          referenceId: res.data.referenceId,
        });
        setFormData({
          name: '',
          businessName: '',
          email: '',
          phone: '',
          city: 'Bhopal, MP',
          serviceRequired: 'Website Development',
          projectDescription: '',
          consent: true,
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to submit inquiry. Please check details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Contact Us — Namah Siddham Corporation"
        description="Connect with Namah Siddham Corporation Private Limited to discuss website development, custom software, mobile applications, digital marketing, or opportunities related to our digital platforms."
        keywords="Contact Namah Siddham, Bhopal Office Address, IT Company Phone Email, Project Inquiries, CIN U77100MP2026PTC087531, Corporate Inquiry Bhopal, Partner With Us"
      />

      {/* Header Banner (Radiant Sky-Blue Theme matching Logo) */}
      <section className="bg-gradient-to-b from-[#E0F2FE]/80 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 py-16 border-b border-sky-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="shiny-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
            <Building2 className="w-3.5 h-3.5 mr-1 text-brand-blue" />
            <span>Contact Us</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-brand-navy tracking-tight">
            Let's Build Something <span className="text-gradient-ns">Meaningful Together.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
            Have a business idea, need a digital solution, or want to explore a partnership opportunity? We would be happy to hear from you. Connect with Namah Siddham Corporation Private Limited to discuss website development, custom software, mobile applications, digital marketing, or opportunities related to our digital platforms. Let's explore how technology can support your next step.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Exact Contact Cards & Company Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-200/90 shadow-lg space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">
                  Corporate Head Office
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-navy mt-1">
                  Namah Siddham Corporation Private Limited
                </h3>
              </div>

              {/* 3 Contact Cards from Prompt */}
              <div className="space-y-4">
                
                {/* Phone Card */}
                <a
                  href="tel:9516262715"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-sky-50/80 border border-sky-200 hover:border-sky-400 hover:bg-sky-100/70 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-sky-200 text-brand-blue flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-500 block">
                      Call Us
                    </span>
                    <span className="text-sm sm:text-base font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      9516262715
                    </span>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href="mailto:nscpl01@gmail.com"
                  className="flex items-center space-x-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 hover:border-amber-400 hover:bg-amber-100/70 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-amber-200 text-amber-600 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-500 block">
                      Email Us
                    </span>
                    <span className="text-sm sm:text-base font-bold text-brand-navy group-hover:text-amber-700 transition-colors">
                      nscpl01@gmail.com
                    </span>
                  </div>
                </a>

                {/* Location Card */}
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-brand-orange flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-500 block">
                      Our Location
                    </span>
                    <span className="text-sm sm:text-base font-bold text-brand-navy">
                      Bhopal, Madhya Pradesh, India
                    </span>
                  </div>
                </div>

              </div>

              {/* Statutory Details */}
              <div className="pt-4 border-t border-sky-100 text-xs font-mono text-slate-500 space-y-1">
                <div>CIN: <span className="font-bold text-brand-navy">{settings.cin || 'U77100MP2026PTC087531'}</span></div>
                <div>Entity: Private Limited Company (Incorporated in India)</div>
                <div>Office: Bhopal, Madhya Pradesh</div>
              </div>
            </div>
          </div>

          {/* Right: Contact & Project Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border-2 border-sky-200/90 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">
                Direct Communication
              </span>
              <h3 className="font-serif font-bold text-2xl text-brand-navy mt-1">
                Send an Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Please complete the form below. Your message will be securely stored and reviewed by our corporate team.
              </p>
            </div>

            {/* Success Message */}
            {successData && (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Inquiry Received Successfully</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                  {successData.message}
                </p>
                <div className="pt-1 text-xs font-mono text-emerald-950">
                  Reference Tracking ID: <span className="font-bold">{successData.referenceId}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-xs text-red-800 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Full Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider">
                    Business Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your Business or Organization"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* Email Address & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800 uppercase tracking-wider">
                  Inquiry Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue font-semibold text-slate-900"
                >
                  <option value="Website Development">Website Development</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Mobile Application Development">Mobile Application Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Business Partnership">Business Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800 uppercase tracking-wider">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements, ideas, or how we can collaborate..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue text-slate-900 font-medium"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="consentMain"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 rounded text-brand-blue focus:ring-brand-blue cursor-pointer"
                />
                <label htmlFor="consentMain" className="text-[11px] text-slate-600 leading-tight cursor-pointer">
                  I agree to allow Namah Siddham Corporation Private Limited to record and process these submitted details for the purpose of communicating regarding this business inquiry.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  icon={Send}
                  className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-brand-blue hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-sky-500/25 transition-all"
                >
                  Send Inquiry
                </Button>
              </div>

            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
