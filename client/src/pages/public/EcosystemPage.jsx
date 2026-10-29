import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Layers, ArrowUpRight, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';
import { CardSkeleton } from '../../components/common/Skeleton';

export const EcosystemPage = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadPlatforms = async () => {
      try {
        const res = await publicApi.getPlatforms();
        setPlatforms(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load platforms:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPlatforms();
  }, []);

  const categories = ['all', ...new Set(platforms.map((p) => p.category))];

  const filteredPlatforms = platforms.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      <SeoMeta
        title="Our Digital Products & Aggregator Platforms"
        description="Explore the portfolio of digital marketplaces and aggregator platforms operated by Namah Siddham Corporation Private Limited."
        keywords="Digital Products, Online Marketplaces, Aggregator Platforms India, HomeServixo, Carrento, Jainamshree, SuperiorMart, Home Services Repair Bhopal, Car Rental Mobility, Jain Ecommerce Satvik, Namah Siddham Ecosystem"
      />

      {/* Header Banner (Radiant Sky-Blue Atmosphere matching Logo) */}
      <section className="bg-gradient-to-b from-[#E0F2FE]/80 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 py-16 border-b border-sky-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-orange-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-brand-navy tracking-tight">
            Discover Our Products
          </h1>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-l-4 border-amber-400 border-y border-r border-amber-200 shadow-xs max-w-4xl">
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              <span className="font-bold text-amber-900 block mb-1">Design tip:</span>
              Hero section mein headline ko 2–3 lines mein rakhein, supporting text ko readable width dein aur final bold statement ko golden-yellow accent ke saath highlight karein. Isse website premium corporate brand jaisi lagegi aur visitors ko turant samajh aayega ki Namah Siddham IT services bhi provide karti hai aur apna digital product ecosystem bhi develop karti hai.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-surface-200 shadow-soft-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                  selectedCategory === cat
                    ? 'bg-navy-900 text-gold-400 shadow-sm'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                {cat === 'all' ? 'All Platforms' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-surface-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search platforms, sectors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-500 text-navy-900"
            />
          </div>
        </div>
      </section>

      {/* Platform Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : filteredPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlatforms.map((platform) => {
              const isLive = platform.status === 'Live';
              const isUnderDev = platform.status === 'Under Development';

              return (
                <div
                  key={platform.slug || platform._id}
                  className="shiny-card bg-gradient-to-br from-white via-orange-50/20 to-white rounded-3xl p-6 border-2 border-sky-100 hover:border-orange-300 shadow-md hover:shadow-xl hover:shadow-orange-500/15 transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-surface-500 uppercase tracking-wider truncate" title={platform.category}>
                        {platform.category}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 font-mono ${
                          isLive
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : isUnderDev
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-blue-100 text-blue-900 border border-blue-300'
                        }`}
                      >
                        {platform.status}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-navy-900 hover:text-royal-600 transition-colors" title={platform.name}>
                      <Link to={`/products/${platform.slug}`}>{platform.name}</Link>
                    </h3>

                    <p className="text-xs text-surface-500 line-clamp-3 leading-relaxed" title={platform.shortDescription}>
                      {platform.shortDescription}
                    </p>

                    {platform.keyFeatures && (
                      <div className="space-y-1.5 pt-1">
                        {platform.keyFeatures.slice(0, 3).map((feat, idx) => (
                          <div
                            key={idx}
                            title={feat}
                            className="flex items-start text-[11px] text-navy-800 group/feat cursor-default"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-royal-500 mr-1.5 mt-0.5 shrink-0" />
                            <span
                              className="line-clamp-1 group-hover/feat:line-clamp-none transition-all"
                              title={feat}
                            >
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-surface-200 flex items-center justify-between gap-2 text-xs">
                    <Link
                      to={`/products/${platform.slug}`}
                      className="font-bold text-navy-900 hover:text-royal-600"
                    >
                      View Details
                    </Link>

                    {platform.websiteUrl && (
                      <a
                        href={platform.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center font-bold px-3 py-1.5 rounded-lg transition-colors ${
                          isLive
                            ? 'bg-royal-500 hover:bg-royal-600 text-white'
                            : 'bg-surface-100 hover:bg-surface-200 text-navy-800'
                        }`}
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-surface-200 p-8">
            <Layers className="w-12 h-12 text-surface-400 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-lg text-navy-900">No Platforms Found</h3>
            <p className="text-xs text-surface-500 mt-1">
              Try adjusting your search criteria or view all platforms.
            </p>
          </div>
        )}
      </section>

      {/* Corporate Ecosystem Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 rounded-3xl p-8 sm:p-12 text-white border border-sky-400/30 text-center space-y-3 shadow-xl shadow-sky-500/20">
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
            Are you a service vendor or digital merchant?
          </h3>
          <p className="text-xs sm:text-sm text-sky-100 max-w-2xl mx-auto font-normal leading-relaxed">
            Each platform in our ecosystem is powered by certified independent professionals and merchants. Register your interest to partner with our growing marketplace network.
          </p>
          <div className="pt-2">
            <Link
              to="/partners"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-white hover:bg-sky-50 text-sky-700 text-xs font-extrabold shadow-md transition-all"
            >
              <span>Explore Partnership Opportunities</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 text-sky-700" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcosystemPage;
