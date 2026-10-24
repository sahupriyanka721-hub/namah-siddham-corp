import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';

export const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await publicApi.getPortfolio();
        setProjects(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const types = ['All', 'Demonstration Project', 'Internal Product', 'Client Project'];

  const filteredProjects = projects.filter((p) => {
    if (selectedType === 'All') return true;
    return p.projectType === selectedType;
  });

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Portfolio & Case Studies"
        description="Explore software engineering architectures, digital platforms, and demonstration projects delivered by Namah Siddham Corporation Private Limited."
        keywords="Software Engineering Portfolio, Case Studies, Full Stack Projects, Architecture Demonstrations, Namah Siddham Works, ERP System Implementation, Mobile App Portfolio"
      />

      {/* Header Banner (Radiant Sky-Blue Theme matching Logo) */}
      <section className="bg-gradient-to-b from-[#E0F2FE]/80 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 py-16 sm:py-20 border-b border-sky-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="shiny-badge inline-flex items-center space-x-2 px-4.5 py-1.5 rounded-full text-sky-800 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5 mr-1 text-sky-600" />
            <span>Engineering Showcase &amp; Implementations</span>
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-slate-950 tracking-tight">
            Portfolio &amp; Case Studies
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-normal">
            A transparent overview of our completed software systems, multi-vendor aggregator architectures, and internal digital platforms.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-surface-200 pb-4">
          <span className="text-xs font-bold text-surface-400 uppercase tracking-wider mr-2 font-mono flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" />
            Filter By:
          </span>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedType === type
                  ? 'bg-royal-500 text-white shadow-soft-sm'
                  : 'bg-white text-surface-600 border border-surface-200 hover:bg-surface-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-royal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-xs text-surface-500">Loading portfolio projects...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.slug || project._id}
                className="shiny-card bg-gradient-to-br from-white via-sky-50/20 to-white rounded-3xl overflow-hidden border-2 border-sky-100 hover:border-sky-400 shadow-md hover:shadow-xl hover:shadow-sky-500/15 transition-all flex flex-col justify-between"
              >
                <div className="p-7 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-royal-600 uppercase tracking-wider font-mono">
                      {project.industry}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        project.projectType === 'Client Project'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : project.projectType === 'Internal Product'
                          ? 'bg-orange-100 text-orange-800 border border-orange-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      {project.projectType}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-navy-900 hover:text-royal-600 transition-colors">
                    <Link to={`/portfolio/${project.slug}`}>{project.name}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-surface-500 leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Technologies tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-surface-100 border border-surface-200 text-navy-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-7 py-4 bg-surface-50 border-t border-surface-200 flex items-center justify-between text-xs">
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="font-bold text-royal-600 hover:underline flex items-center"
                  >
                    <span>Read Case Study</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>

                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-surface-500 hover:text-navy-900 inline-flex items-center"
                    >
                      <span>Visit Live Link</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-surface-200">
            <h3 className="font-serif font-bold text-lg text-navy-900">No Projects Found</h3>
            <p className="text-xs text-surface-500 mt-1">
              No portfolio projects currently match the selected filter.
            </p>
          </div>
        )}
      </section>

      {/* Corporate Engineering Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-100 rounded-3xl p-8 sm:p-12 border border-surface-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="font-serif font-bold text-xl text-navy-900">
              Need a Custom Software or Marketplace Build?
            </h3>
            <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
              We specialize in custom web applications, multi-tenant databases, API integrations, and scalable business workflows.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm shrink-0 shadow-md shadow-sky-500/20 transition-all"
          >
            <span>Discuss Your Project</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
