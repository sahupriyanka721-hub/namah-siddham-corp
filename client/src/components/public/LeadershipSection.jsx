import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users2,
  Linkedin,
  ShieldCheck,
  Award,
  ArrowRight,
  Briefcase,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { mockTeam } from '../../data/mockData';

export const LeadershipSection = ({ team = [], className = '' }) => {
  // Use passed team or fallback to mockTeam, ensuring only published members are shown sorted by order
  const displayTeam = (team && team.length > 0 ? team : mockTeam)
    .filter((m) => m.isPublished !== false)
    .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99));

  return (
    <section
      id="leadership"
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 ${className}`}
    >
      {/* Centered Section Header */}
      <div className="max-w-3xl mx-auto space-y-3 text-center flex flex-col items-center">
        <span className="shiny-badge inline-flex items-center text-xs font-bold text-brand-blue uppercase tracking-widest font-mono px-3.5 py-1 rounded-full">
          <Users2 className="w-3.5 h-3.5 mr-1.5 text-brand-blue" />
          Corporate Governance
        </span>

        <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-brand-navy text-center">
          Leadership &amp; <span className="text-gradient-ns">Governance Team</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-center max-w-2xl">
          Meet the board of directors and corporate management guiding Namah Siddham Corporation Private Limited with a commitment to integrity, technology excellence, and transparent stakeholder value.
        </p>

        <div className="pt-1">
          <Link
            to="/team"
            className="shiny-badge inline-flex items-center text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-800 px-4 py-1.5 rounded-full transition-all"
          >
            <span>View Full Governance Profile</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>
      </div>

      {/* Leadership Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {displayTeam.map((member, index) => {
          const isDirector =
            member.designation?.toLowerCase().includes('director') ||
            member.role?.toLowerCase().includes('director');

          return (
            <div
              key={member._id || index}
              className="shiny-card bg-gradient-to-br from-white via-sky-50/20 to-white rounded-3xl p-7 border-2 border-sky-100 hover:border-sky-400 shadow-md hover:shadow-xl hover:shadow-sky-500/15 transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-4">
                {/* Member Header */}
                <div className="flex items-start space-x-4">
                  {/* Photo or Avatar */}
                  <div className="relative shrink-0">
                    {member.profileImage ? (
                      <img
                        src={member.profileImage}
                        alt={member.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-200 group-hover:border-sky-400 shadow-sm transition-all"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                        isDirector
                          ? 'from-amber-50 to-amber-100 text-amber-700 border-amber-200'
                          : 'from-sky-50 to-sky-100 text-sky-700 border-sky-200'
                      } flex items-center justify-center font-bold text-xl border-2 shadow-xs group-hover:scale-105 transition-transform ${
                        member.profileImage ? 'hidden' : 'flex'
                      }`}
                    >
                      {isDirector ? (
                        <Award className="w-8 h-8 text-amber-600" />
                      ) : (
                        <Users2 className="w-8 h-8 text-sky-600" />
                      )}
                    </div>
                  </div>

                  {/* Name & Designation */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-brand-blue transition-colors truncate">
                        {member.name}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                          isDirector
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-sky-50 text-sky-700 border-sky-200'
                        }`}
                      >
                        {member.designation || member.role || 'Corporate Management'}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Corporate Board</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Biography */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {member.biography || member.bio}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-sky-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                  <Briefcase className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Namah Siddham Corporation</span>
                </div>

                {(member.linkedinUrl || member.socialLinks?.linkedin) && (
                  <a
                    href={member.linkedinUrl || member.socialLinks?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 hover:text-brand-orange font-bold inline-flex items-center space-x-1 transition-colors group/link"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-sky-600 group-hover/link:text-brand-orange" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Statutory Governance Note Bar */}
      <div className="bg-gradient-to-r from-sky-50/80 via-white to-sky-50/80 border border-sky-200/90 rounded-2xl p-4 sm:p-5 shadow-xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center space-x-3 text-center sm:text-left">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            <strong className="text-slate-900 font-semibold">Statutory Compliance:</strong> Registered under the Companies Act, 2013 (CIN: U77100MP2026PTC087531) with MCA, Government of India.
          </span>
        </div>
        <Link
          to="/team"
          className="text-sky-700 hover:text-sky-800 font-bold whitespace-nowrap inline-flex items-center group shrink-0"
        >
          <span>Meet Governance Team</span>
          <ChevronRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default LeadershipSection;
