import React, { useState, useEffect } from 'react';
import { Users2, Linkedin, ShieldCheck, User } from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';
import { mockTeam } from '../../data/mockData';

export const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await publicApi.getTeam();
        const data = res.data?.data;
        if (data && data.length > 0) {
          setTeam(data);
        } else {
          setTeam(mockTeam);
        }
      } catch (err) {
        console.error('Failed to load team profiles:', err);
        setTeam(mockTeam);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Leadership & Governance"
        description="Meet the board of directors and corporate leadership team guiding Namah Siddham Corporation Private Limited."
      />

      {/* Header Banner (Radiant Sky-Blue Theme matching Logo) */}
      <section className="bg-gradient-to-b from-[#E0F2FE]/80 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 py-16 border-b border-sky-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="shiny-badge inline-flex items-center space-x-2 px-4.5 py-1.5 rounded-full text-sky-800 text-xs font-semibold bg-white border border-sky-200 shadow-xs">
            <Users2 className="w-3.5 h-3.5 mr-1 text-sky-600" />
            <span>Corporate Governance</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-brand-navy tracking-tight">
            Leadership &amp; <span className="text-gradient-ns">Board of Directors</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
            Namah Siddham Corporation Private Limited is guided by corporate leadership committed to building sustainable, ethical, and technology-driven digital platforms.
          </p>
        </div>
      </section>

      {/* Team Profiles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-sky-600 border-t-amber-500 rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-500 mt-3 font-medium">Loading leadership profiles...</p>
          </div>
        ) : team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member._id}
                className="shiny-card bg-white rounded-3xl border-2 border-sky-100 hover:border-sky-400 shadow-md hover:shadow-xl hover:shadow-sky-500/15 transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center space-x-4">
                    {member.profileImage ? (
                      <img
                        src={member.profileImage}
                        alt={member.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-200 group-hover:border-sky-400 transition-colors"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 text-brand-blue flex items-center justify-center font-bold text-xl border-2 border-sky-200 shrink-0 group-hover:scale-105 transition-transform ${
                        member.profileImage ? 'hidden' : 'flex'
                      }`}
                    >
                      <Users2 className="w-8 h-8 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-brand-blue transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-brand-orange uppercase tracking-wider font-mono">
                        {member.designation || member.role || 'Corporate Management'}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {member.biography || member.bio}
                  </p>
                </div>

                {(member.linkedinUrl || member.socialLinks?.linkedin) && (
                  <div className="px-6 py-3.5 bg-sky-50/60 border-t border-sky-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Professional Profile</span>
                    <a
                      href={member.linkedinUrl || member.socialLinks?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 hover:text-brand-orange transition-colors inline-flex items-center font-bold"
                    >
                      <Linkedin className="w-4 h-4 mr-1 text-sky-600" />
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border-2 border-sky-100 p-8 space-y-3 shadow-sm max-w-xl mx-auto">
            <ShieldCheck className="w-12 h-12 text-sky-700 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Corporate Governance Notice
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Leadership and director profiles are administered in accordance with corporate disclosures under the Companies Act, 2013.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TeamPage;
