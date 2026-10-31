import React from 'react';
import {
  Lightbulb,
  Code2,
  Layers,
  Sparkles,
  TrendingUp,
  Users2,
  RefreshCw,
} from 'lucide-react';

export const MissionSection = ({ className = '' }) => {
  const missionPoints = [
    {
      icon: Code2,
      color: 'blue',
      title: 'Enabling Digital Transformation',
      description:
        'Help businesses establish and strengthen their digital presence through websites, custom software, mobile applications, and digital marketing solutions.',
    },
    {
      icon: Layers,
      color: 'orange',
      title: 'Building Purpose-Driven Platforms',
      description:
        'Develop and improve specialized digital products designed to connect customers, businesses, sellers, service providers, and partners.',
    },
    {
      icon: Sparkles,
      color: 'amber',
      title: 'Creating Better Digital Experiences',
      description:
        'Focus on usability, intuitive design, accessibility, and customer convenience in the solutions we build.',
    },
    {
      icon: TrendingUp,
      color: 'blue',
      title: 'Supporting Business Efficiency',
      description:
        'Develop technology that helps organizations streamline workflows, organize information, and manage business activities more effectively.',
    },
    {
      icon: Users2,
      color: 'orange',
      title: 'Encouraging Collaboration',
      description:
        'Create opportunities for businesses and platform participants to connect, collaborate, and serve their respective audiences.',
    },
    {
      icon: RefreshCw,
      color: 'amber',
      title: 'Growing Through Continuous Innovation',
      description:
        'Improve our solutions through learning, feedback, responsible technology adoption, and a commitment to quality.',
    },
  ];

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 ${className}`}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="shiny-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-brand-blue text-xs font-semibold bg-white border border-sky-200 shadow-xs">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 mr-1" />
          <span className="font-mono uppercase tracking-wider">Our Mission</span>
        </div>
        <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-brand-navy tracking-tight leading-tight">
          Turning Business Challenges into{' '}
          <span className="text-gradient-ns">Digital Opportunities</span>.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Our mission is to develop practical technology solutions and digital platforms that address real business needs, simplify processes, and create meaningful connections. We are committed to:
        </p>
      </div>

      {/* 6 Mission Points in Modern Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {missionPoints.map((point, index) => {
          const Icon = point.icon;
          const isBlue = point.color === 'blue';
          const isOrange = point.color === 'orange';

          return (
            <div
              key={index}
              className={`bg-white rounded-3xl p-6 sm:p-7 border-2 transition-all space-y-3.5 group shadow-sm hover:shadow-xl ${
                isBlue
                  ? 'border-sky-100 hover:border-sky-300 hover:shadow-sky-500/10'
                  : isOrange
                  ? 'border-sky-100 hover:border-amber-300 hover:shadow-orange-500/10'
                  : 'border-sky-100 hover:border-amber-300 hover:shadow-amber-500/10'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 border ${
                  isBlue
                    ? 'bg-sky-50 border-sky-200 text-brand-blue'
                    : isOrange
                    ? 'bg-orange-50 border-orange-200 text-brand-orange'
                    : 'bg-amber-50 border-amber-200 text-amber-600'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3
                className={`font-serif font-bold text-lg text-brand-navy transition-colors ${
                  isBlue
                    ? 'group-hover:text-brand-blue'
                    : isOrange
                    ? 'group-hover:text-brand-orange'
                    : 'group-hover:text-amber-600'
                }`}
              >
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {point.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mission Concluding Statement */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/80 border border-sky-200 text-center max-w-3xl mx-auto shadow-xs">
        <p className="text-xs sm:text-sm font-semibold text-brand-navy leading-relaxed">
          “Our mission is to combine technology with practical business thinking so that every solution we build serves a clear purpose.”
        </p>
      </div>
    </section>
  );
};

export default MissionSection;
