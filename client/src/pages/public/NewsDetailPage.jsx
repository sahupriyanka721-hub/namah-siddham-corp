import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Newspaper, Share2 } from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { SeoMeta } from '../../components/public/SeoMeta';

export const NewsDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await publicApi.getNewsBySlug(slug);
        if (res.data?.data) {
          setArticle(res.data.data);
        } else {
          setError('Article not found.');
        }
      } catch (err) {
        setError('Article not found or currently unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-forest-900 border-t-gold-500 rounded-full animate-spin mx-auto" />
        <p className="text-xs text-charcoal-500">Loading announcement...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-forest-950">Article Not Found</h2>
        <p className="text-xs text-charcoal-600">{error}</p>
        <div>
          <Link
            to="/news"
            className="inline-flex items-center px-4 py-2 text-xs font-bold rounded-lg bg-forest-900 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <SeoMeta
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.summary}
      />

      {/* Top Banner (Luminous White & Royal Blue Theme matching Logo) */}
      <section className="bg-gradient-to-b from-white via-royal-50/25 to-surface-100 text-slate-900 py-14 sm:py-18 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <Link
            to="/news"
            className="inline-flex items-center text-xs text-slate-500 hover:text-royal-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Announcements
          </Link>

          <div className="flex items-center space-x-3 text-xs text-gold-600 font-semibold uppercase tracking-wider">
            <span>{article.category}</span>
            <span>•</span>
            <span className="flex items-center text-slate-500">
              <Calendar className="w-3.5 h-3.5 mr-1 text-royal-500" />
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="font-serif font-black text-2xl sm:text-4xl text-slate-950 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center space-x-2 text-xs text-slate-500 pt-2">
            <User className="w-3.5 h-3.5 text-royal-600" />
            <span>Authored by: {article.author}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sage-200 shadow-soft-sm space-y-8">
          {/* Summary Lead */}
          <div className="bg-sage-50 border-l-4 border-gold-500 p-5 rounded-r-xl text-sm sm:text-base font-medium text-forest-950 leading-relaxed italic">
            {article.summary}
          </div>

          {/* Body Content */}
          <div className="prose prose-forest max-w-none text-sm sm:text-base text-charcoal-800 leading-relaxed whitespace-pre-line space-y-4">
            {article.content}
          </div>

          {/* Article Footer */}
          <div className="pt-8 border-t border-sage-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
            <div>Published by Namah Siddham Corporation Communications</div>
            <Link
              to="/news"
              className="text-forest-900 font-bold hover:text-forest-700 inline-flex items-center"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Return to all announcements
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage;
