import React, { useState, useEffect } from 'react';
import { publicApi } from '../../api/publicApi';
import { useSettings } from '../../context/SettingsContext';
import { SeoMeta } from '../../components/public/SeoMeta';
import { AboutUsSection } from '../../components/public/AboutUsSection';
import { VisionSection } from '../../components/public/VisionSection';
import { MissionSection } from '../../components/public/MissionSection';
import { OurApproachSection } from '../../components/public/OurApproachSection';
import { FinalCTASection } from '../../components/public/FinalCTASection';

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

      {/* SECTION 1: ABOUT US */}
      <AboutUsSection />

      {/* SECTION 2: OUR VISION */}
      <VisionSection />

      {/* SECTION 3: OUR MISSION */}
      <MissionSection />

      {/* SECTION 4: OUR APPROACH */}
      <OurApproachSection />

      {/* SECTION 6: FINAL CALL TO ACTION */}
      <FinalCTASection />
    </div>
  );
};

export default AboutPage;
