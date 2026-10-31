import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FinalCTASection = ({ className = '' }) => {
  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${className}`}>
      <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 rounded-3xl p-10 sm:p-14 text-white shadow-xl shadow-sky-500/20 space-y-5 relative overflow-hidden">
        {/* Soft atmospheric radial glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        <h2 className="font-serif font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight relative z-10">
          Your Next Digital Opportunity Starts Here.
        </h2>

        <p className="text-sm sm:text-base text-sky-100 max-w-2xl mx-auto leading-relaxed font-normal relative z-10">
          Whether you are building a new business, modernizing existing operations, or exploring a digital platform idea, let's discuss how the right technology can help you move forward.
        </p>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 relative z-10">
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
  );
};

export default FinalCTASection;
