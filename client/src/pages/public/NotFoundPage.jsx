import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Layers, Code2 } from 'lucide-react';
import { SeoMeta } from '../../components/public/SeoMeta';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <SeoMeta title="Page Not Found (404)" />
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-surface-200 shadow-soft-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-royal-50 text-royal-600 font-serif font-black text-2xl flex items-center justify-center mx-auto border border-royal-200">
          404
        </div>
        <div className="space-y-2">
          <h1 className="font-serif font-bold text-2xl text-navy-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 leading-relaxed">
            The page or platform resource you requested does not exist or has been relocated.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white font-bold text-xs hover:from-sky-600 hover:to-blue-700 shadow-md shadow-sky-500/20"
          >
            <Home className="w-4 h-4 mr-1.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-sky-500 text-sky-700 font-semibold text-xs hover:bg-sky-50"
          >
            <span>Explore IT Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
