import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Compass,
  Lightbulb,
  Users2,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  Building,
  Code2,
  Layers,
  ArrowRight,
  Sparkles,
  Network,
  Zap,
  RefreshCw,
  Search,
  PenTool,
  MonitorCheck,
  Smartphone,
  TrendingUp,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { useSettings } from '../../context/SettingsContext';
import { SeoMeta } from '../../components/public/SeoMeta';

export const AboutPage = () => {
  const { settings } = useSettings();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await publicApi.getPageBySlug('about');
        if (res.data?.data) {
          setContent(res.data.data);
        }
      } catch (err) {
        console.warn('Using default about page content');
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const heroHeadline =
    content?.heroHeadline || 'One Company. Two Digital Growth Verticals.';
  const heroDesc =
    content?.heroDescription ||
    'Namah Siddham Corporation Private Limited combines IT expertise with a growing portfolio of digital platforms to help businesses establish their digital presence and connect customers, service providers, sellers, and partners.';

  const visionText =
    content?.sections?.vision ||
    'To build accessible and scalable digital platforms that simplify everyday needs and create opportunities for people and businesses.';

  const missionText =
    content?.sections?.mission ||
    'To combine technology, practical business solutions, and specialized online platforms to improve digital access, convenience, and collaboration.';

  return (
    <div className="space-y-20 pb-20">
      <SeoMeta
        title="About Us"
        description="Learn about Namah Siddham Corporation Private Limited, our mission, vision, Bhopal registered office, and two growth verticals across IT solutions and aggregator platforms."
      />

      {/* Header Banner (Radiant Sky-Blue Atmosphere matching Logo) */}
      <section className="bg-gradient-to-b from-[#E0F2FE]/80 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 py-14 sm:py-18 border-b border-sky-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="shiny-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
            <span>About Namah Siddham Corporation</span>
          </div>
          <h1 className="font-sans font-black text-[13px] xs:text-[15px] sm:text-lg md:text-2xl lg:text-[28px] xl:text-[32px] tracking-tight leading-tight whitespace-nowrap">
            <span className="text-brand-navy">Building Digital Solutions.</span>{' '}
            <span className="text-brand-blue">Connecting Opportunities.</span>{' '}
            <span className="text-gradient-ns inline-block">Empowering Growth.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-normal">
            Corporate Profile &amp; Digital Operating Philosophy • CIN: {settings.cin || 'U77100MP2026PTC087531'}
          </p>
        </div>
      </section>

      {/* Main Two-Column About Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Full Company Introduction & Content */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-sm sm:text-[15px]">
            
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                <strong className="text-brand-navy font-bold">Namah Siddham Corporation Private Limited</strong> is an India-based company focused on technology, digital innovation, and the development of business-oriented digital platforms.
              </p>

              <p>
                We believe technology should do more than establish an online presence. It should help businesses operate more efficiently, connect with their customers, simplify everyday processes, and unlock new opportunities for growth.
              </p>

              <p className="font-semibold text-brand-navy">
                Our work spans two complementary areas: IT services and digital products.
              </p>

              <p>
                Through our IT services, we support businesses in building their digital foundations with website development, custom software solutions, mobile application development, and digital marketing. From creating a professional online presence to developing tailored business systems, our objective is to translate business requirements into practical digital solutions.
              </p>

              <p>
                Alongside our services, we are building a portfolio of specialized digital platforms designed around real-world needs. Our ecosystem includes <strong className="text-brand-blue font-bold">HomeServixo</strong> for home services, <strong className="text-brand-orange font-bold">Carrento</strong> for car rental and mobility, <strong className="text-amber-700 font-bold">Jainamshree</strong> for Jain community-focused e-commerce, and <strong className="text-emerald-700 font-bold">SuperiorMart</strong> for multi-category online shopping. These platforms may be at different stages of development and operation.
              </p>

              <p>
                We bring together technology, business understanding, and a customer-focused mindset to develop solutions that connect people, businesses, service providers, and marketplace participants.
              </p>

              <p>
                At Namah Siddham, we see every digital initiative as an opportunity to make processes simpler, experiences better, and businesses more connected.
              </p>

              <p>
                Our journey is guided by a long-term commitment to building useful digital solutions, developing scalable platforms, and creating meaningful opportunities through technology.
              </p>
            </div>

            {/* Supporting Statement Box with Gold & Blue Accents */}
            <div className="pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-l-4 border-amber-500 border-y border-r border-amber-200/80 shadow-xs">
                <p className="text-sm sm:text-base font-bold text-brand-navy leading-relaxed">
                  “From a business website to a complete digital platform, we aim to turn ideas into practical digital experiences.”
                </p>
              </div>
            </div>

            {/* Statutory Corporate Details Bar */}
            <div className="pt-3 flex flex-wrap gap-4 border-t border-sky-100">
              <div className="border-l-2 border-brand-blue pl-3 py-0.5">
                <div className="text-[11px] text-slate-500 uppercase font-mono">Corporate Identity</div>
                <div className="text-xs sm:text-sm font-bold text-brand-navy font-mono">{settings.cin || 'U77100MP2026PTC087531'}</div>
              </div>
              <div className="border-l-2 border-brand-orange pl-3 py-0.5">
                <div className="text-[11px] text-slate-500 uppercase font-mono">Registered Office</div>
                <div className="text-xs sm:text-sm font-bold text-brand-navy">Bhopal, Madhya Pradesh, India</div>
              </div>
              <div className="border-l-2 border-amber-500 pl-3 py-0.5">
                <div className="text-[11px] text-slate-500 uppercase font-mono">Entity Type</div>
                <div className="text-xs sm:text-sm font-bold text-brand-navy">Private Limited Company</div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Visual with Blue and Gold Visual Accents & Brand Statement */}
          <div className="lg:col-span-5 space-y-5 sticky top-24">
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-sky-200/90 hover:border-amber-300 transition-all duration-300 group relative">
              
              {/* Top Accent Line */}
              <div className="h-1 bg-gradient-to-r from-brand-blue via-amber-400 to-brand-orange -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 rounded-t-3xl" />

              {/* High-Resolution Visual Representation */}
              <div className="relative overflow-hidden rounded-2xl bg-sky-50 aspect-[16/10] border border-sky-100 shadow-sm mb-4">
                <img
                  src="/assets/services/custom-software.jpg"
                  alt="Namah Siddham Technology, Software Development, Digital Commerce & Connected Platforms"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/services/web-development.jpg';
                  }}
                />
              </div>

              {/* Connected Business Ecosystem Grid */}
              <div className="space-y-2.5 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center justify-between">
                  <span>Connected Digital Verticals</span>
                  <span className="text-brand-orange">4 Platforms &amp; IT Services</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-brand-navy font-semibold flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
                    <span className="truncate">IT Services &amp; ERP</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-brand-navy font-semibold flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                    <span className="truncate">HomeServixo &amp; Repair</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-brand-navy font-semibold flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span className="truncate">Carrento &amp; Mobility</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-brand-navy font-semibold flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">Jainamshree &amp; Retail</span>
                  </div>
                </div>
              </div>

              {/* Bottom Subtle Brand Tagline */}
              <div className="mt-4 pt-3 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-brand-navy">Namah Siddham Corporation</span>
                <span className="text-amber-600 font-bold font-mono">Est. 2026</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: OUR VISION                                                     */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-[#F0F8FF] via-white to-sky-50/50 py-16 sm:py-20 border-y border-sky-200/70 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-sky-300/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Vision Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="shiny-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
                <Compass className="w-3.5 h-3.5 text-brand-blue mr-1.5" />
                <span>Our Vision</span>
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-brand-navy tracking-tight leading-tight">
                To Create a More{' '}
                <span className="text-brand-blue font-black underline decoration-sky-300 underline-offset-4">Connected</span>{' '}
                and{' '}
                <span className="text-gradient-ns font-black">Digitally</span>{' '}
                Empowered{' '}
                <span className="text-brand-orange font-black">Future</span>.
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  Our vision is to build a trusted ecosystem of digital solutions that helps businesses, individuals, and communities participate more effectively in an increasingly connected world.
                </p>
                <p>
                  We aspire to make technology more accessible, practical, and useful by developing digital platforms that simplify everyday needs and by helping businesses embrace digital transformation.
                </p>
                <p>
                  Through continuous learning, thoughtful innovation, and a focus on real-world problems, we aim to build solutions that connect opportunities with the people and businesses that need them.
                </p>
                <p>
                  We envision a future where digital tools help businesses reach wider audiences, manage operations more effectively, and create better experiences for their customers.
                </p>
              </div>
            </div>

            {/* Abstract Visual of Connected Digital Networks */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-sky-200 relative overflow-hidden group">
                <div className="h-1 bg-gradient-to-r from-brand-blue via-amber-400 to-brand-orange -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 rounded-t-3xl" />
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">
                      Connected Digital Network
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  {/* Connected Network Nodes Schematic */}
                  <div className="relative py-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 shadow-xs flex flex-col items-center space-y-1.5">
                        <Network className="w-6 h-6 text-brand-blue" />
                        <span className="text-xs font-bold text-brand-navy">Connected</span>
                        <span className="text-[10px] text-slate-500">Ecosystem</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 shadow-xs flex flex-col items-center space-y-1.5">
                        <Cpu className="w-6 h-6 text-brand-orange" />
                        <span className="text-xs font-bold text-brand-navy">Digital</span>
                        <span className="text-[10px] text-slate-500">Intelligence</span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs flex flex-col items-center space-y-1.5">
                        <Zap className="w-6 h-6 text-amber-600" />
                        <span className="text-xs font-bold text-brand-navy">Future</span>
                        <span className="text-[10px] text-slate-500">Opportunity</span>
                      </div>
                    </div>

                    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-amber-50 border border-sky-200 text-xs text-slate-600 leading-relaxed text-center">
                      Bridging everyday needs and enterprise workflows through reliable, purpose-driven digital technology.
                    </div>
                  </div>

                  <div className="pt-3 border-t border-sky-100 flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>Central Hub: Bhopal, MP</span>
                    <span className="text-brand-blue font-bold">Pan-India Reach</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: OUR MISSION                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="shiny-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
            <span>Our Mission</span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-brand-navy tracking-tight">
            Turning Business Challenges into <span className="text-gradient-ns">Digital Opportunities</span>.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Our mission is to develop practical technology solutions and digital platforms that address real business needs, simplify processes, and create meaningful connections. We are committed to:
          </p>
        </div>

        {/* 6 Mission Points in Modern Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Enabling Digital Transformation */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-sky-300 shadow-md hover:shadow-xl hover:shadow-sky-500/10 transition-all space-y-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-brand-blue group-hover:scale-105 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-navy group-hover:text-brand-blue transition-colors">
              Enabling Digital Transformation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Help businesses establish and strengthen their digital presence through websites, custom software, mobile applications, and digital marketing solutions.
            </p>
          </div>

          {/* Card 2: Building Purpose-Driven Platforms */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-amber-300 shadow-md hover:shadow-xl hover:shadow-orange-500/10 transition-all space-y-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-brand-orange group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-navy group-hover:text-brand-orange transition-colors">
              Building Purpose-Driven Platforms
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Develop and improve specialized digital products designed to connect customers, businesses, sellers, service providers, and partners.
            </p>
          </div>

          {/* Card 3: Creating Better Digital Experiences */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-sky-300 shadow-md hover:shadow-xl hover:shadow-sky-500/10 transition-all space-y-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-navy group-hover:text-amber-600 transition-colors">
              Creating Better Digital Experiences
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Focus on usability, intuitive design, accessibility, and customer convenience in the solutions we build.
            </p>
          </div>

          {/* Card 4: Supporting Business Efficiency */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-sky-300 shadow-md hover:shadow-xl hover:shadow-sky-500/10 transition-all space-y-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-brand-blue group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-navy group-hover:text-brand-blue transition-colors">
              Supporting Business Efficiency
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Develop technology that helps organizations streamline workflows, organize information, and manage business activities more effectively.
            </p>
          </div>

          {/* Card 5: Encouraging Collaboration */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-amber-300 shadow-md hover:shadow-xl hover:shadow-orange-500/10 transition-all space-y-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-brand-orange group-hover:scale-105 transition-transform">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-navy group-hover:text-brand-orange transition-colors">
              Encouraging Collaboration
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Create opportunities for businesses and platform participants to connect, collaborate, and serve their respective audiences.
            </p>
          </div>

          {/* Card 6: Growing Through Continuous Innovation */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-sky-300 shadow-md hover:shadow-xl hover:shadow-sky-500/10 transition-all space-y-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-navy group-hover:text-amber-600 transition-colors">
              Growing Through Continuous Innovation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Improve our solutions through learning, feedback, responsible technology adoption, and a commitment to quality.
            </p>
          </div>

        </div>

        {/* Mission Concluding Statement */}
        <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/80 border border-sky-200 text-center max-w-3xl mx-auto shadow-xs">
          <p className="text-xs sm:text-sm font-semibold text-brand-navy leading-relaxed">
            “Our mission is to combine technology with practical business thinking so that every solution we build serves a clear purpose.”
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: OUR APPROACH                                                   */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="shiny-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
            <span>Our Approach</span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-brand-navy tracking-tight">
            How We Create Value
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            We bring business requirements and technology together through a structured, customer-focused approach.
          </p>
        </div>

        {/* 4 Process Steps (Horizontal Process on Desktop, Vertical Timeline on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Step 1: Understand */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-md transition-all space-y-3 group relative">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-brand-blue flex items-center justify-center font-bold">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                Step 01
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors">
              Understand
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Understand the business, its users, challenges, and objectives.
            </p>
          </div>

          {/* Step 2: Design */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-amber-300 shadow-sm hover:shadow-md transition-all space-y-3 group relative">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <PenTool className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Step 02
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl text-brand-navy group-hover:text-amber-600 transition-colors">
              Design
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Plan intuitive user experiences and practical digital solutions.
            </p>
          </div>

          {/* Step 3: Develop */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-md transition-all space-y-3 group relative">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-brand-blue flex items-center justify-center font-bold">
                <MonitorCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                Step 03
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors">
              Develop
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Build websites, software, applications, and platform features with a focus on quality and usability.
            </p>
          </div>

          {/* Step 4: Improve */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-sky-100 hover:border-orange-300 shadow-sm hover:shadow-md transition-all space-y-3 group relative">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded-full">
                Step 04
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl text-brand-navy group-hover:text-brand-orange transition-colors">
              Improve
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Use feedback and evolving requirements to refine and enhance digital experiences.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: FINAL CALL TO ACTION                                           */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 rounded-3xl p-10 sm:p-14 text-white shadow-xl shadow-sky-500/20 space-y-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <h2 className="font-serif font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Your Next Digital Opportunity Starts Here.
          </h2>
          <p className="text-sm sm:text-base text-sky-100 max-w-2xl mx-auto leading-relaxed font-normal">
            Whether you are building a new business, modernizing existing operations, or exploring a digital platform idea, let's discuss how the right technology can help you move forward.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              to="/contact"
              className="shiny-btn inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-white text-brand-navy hover:bg-orange-500 hover:text-white font-extrabold text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/services"
              className="shiny-btn inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-sky-700/60 hover:bg-sky-700 text-white border border-sky-300/40 font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Our Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
