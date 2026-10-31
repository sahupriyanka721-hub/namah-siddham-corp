import React from 'react';
import { Search, PenTool, MonitorCheck, RefreshCw } from 'lucide-react';

export const OurApproachSection = ({ className = '' }) => {
  const steps = [
    {
      number: 'Step 01',
      title: 'Understand',
      description: 'Understand the business, its users, challenges, and objectives.',
      icon: Search,
      color: 'blue',
    },
    {
      number: 'Step 02',
      title: 'Design',
      description: 'Plan intuitive user experiences and practical digital solutions.',
      icon: PenTool,
      color: 'amber',
    },
    {
      number: 'Step 03',
      title: 'Develop',
      description: 'Build websites, software, applications, and platform features with a focus on quality and usability.',
      icon: MonitorCheck,
      color: 'blue',
    },
    {
      number: 'Step 04',
      title: 'Improve',
      description: 'Use feedback and evolving requirements to refine and enhance digital experiences.',
      icon: RefreshCw,
      color: 'orange',
    },
  ];

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 ${className}`}>
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="shiny-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
          <span className="font-mono uppercase tracking-wider">Our Approach</span>
        </div>
        <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-brand-navy tracking-tight leading-tight">
          How We Create Value
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          We bring business requirements and technology together through a structured, customer-focused approach.
        </p>
      </div>

      {/* 4 Process Steps (Horizontal Process on Desktop, Vertical Timeline on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isBlue = step.color === 'blue';
          const isOrange = step.color === 'orange';

          return (
            <div
              key={idx}
              className={`bg-white rounded-3xl p-6 sm:p-7 border-2 transition-all space-y-3 group relative shadow-sm hover:shadow-md ${
                isBlue
                  ? 'border-sky-100 hover:border-sky-300'
                  : isOrange
                  ? 'border-sky-100 hover:border-orange-300'
                  : 'border-sky-100 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold ${
                    isBlue
                      ? 'bg-sky-50 text-brand-blue'
                      : isOrange
                      ? 'bg-orange-50 text-brand-orange'
                      : 'bg-amber-50 text-amber-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    isBlue
                      ? 'text-sky-700 bg-sky-100'
                      : isOrange
                      ? 'text-orange-800 bg-orange-100'
                      : 'text-amber-800 bg-amber-100'
                  }`}
                >
                  {step.number}
                </span>
              </div>
              <h3
                className={`font-serif font-bold text-xl text-brand-navy transition-colors ${
                  isBlue
                    ? 'group-hover:text-brand-blue'
                    : isOrange
                    ? 'group-hover:text-brand-orange'
                    : 'group-hover:text-amber-600'
                }`}
              >
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurApproachSection;
