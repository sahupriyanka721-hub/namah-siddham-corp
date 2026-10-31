import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Smartphone,
  TrendingUp,
  Wrench,
  Car,
  ShoppingBag,
  Store,
} from 'lucide-react';
import './HeroSection.css';

// 8 Slider slides strictly in the specified order with verified 16:9 images
export const heroSlides = [
  {
    id: 'web-dev',
    category: 'IT SERVICES',
    categoryColor: 'sky',
    title: 'Website Development',
    description: 'Building powerful digital experiences for modern businesses.',
    image: '/assets/services/web-development.jpg',
    fallbackImage: '/assets/services/web-dev.jpg',
    icon: Code2,
    alt: 'Professional website displayed on desktop monitor and laptop UI - Namah Siddham Corporation',
  },
  {
    id: 'custom-software',
    category: 'IT SERVICES',
    categoryColor: 'sky',
    title: 'Custom Software Development',
    description: 'Smart software solutions that simplify business operations.',
    image: '/assets/services/custom-software.jpg',
    fallbackImage: '/assets/services/software-dev.jpg',
    icon: Cpu,
    alt: 'Enterprise custom software dashboard with analytics and workflow screens - Namah Siddham Corporation',
  },
  {
    id: 'mobile-apps',
    category: 'IT SERVICES',
    categoryColor: 'sky',
    title: 'Mobile Application Development',
    description: 'Turning innovative ideas into powerful mobile experiences.',
    image: '/assets/services/mobile-apps.jpg',
    fallbackImage: '/assets/services/mobile-dev.jpg',
    icon: Smartphone,
    alt: 'Modern smartphones displaying attractive mobile application UI/UX - Namah Siddham Corporation',
  },
  {
    id: 'digital-marketing',
    category: 'IT SERVICES',
    categoryColor: 'sky',
    title: 'Digital Marketing',
    description: 'Strengthening brands and connecting businesses with customers.',
    image: '/assets/services/digital-marketing.jpg',
    fallbackImage: '/assets/services/custom-software.jpg',
    icon: TrendingUp,
    alt: 'Digital marketing analytics dashboard with SEO and campaigns - Namah Siddham Corporation',
  },
  {
    id: 'homeservixo',
    category: 'OUR PRODUCTS',
    categoryColor: 'gold',
    title: 'HomeServixo',
    description: 'Connecting customers with reliable home service solutions.',
    image: '/assets/platforms/homeservixo.jpg',
    fallbackImage: '/assets/services/custom-software.jpg',
    icon: Wrench,
    alt: 'HomeServixo appliance repair and on-demand home service booking application - Namah Siddham Corporation',
  },
  {
    id: 'carrento',
    category: 'OUR PRODUCTS',
    categoryColor: 'gold',
    title: 'Carrento',
    description: 'Making car rentals and mobility more convenient.',
    image: '/assets/platforms/carrento.jpg',
    fallbackImage: '/assets/services/custom-software.jpg',
    icon: Car,
    alt: 'Carrento premium car rental and smart mobility booking platform - Namah Siddham Corporation',
  },
  {
    id: 'jainamshree',
    category: 'OUR PRODUCTS',
    categoryColor: 'gold',
    title: 'Jainamshree',
    description: 'Bringing community, culture and commerce together.',
    image: '/assets/platforms/jainamshree.jpg',
    fallbackImage: '/assets/services/custom-software.jpg',
    icon: Store,
    alt: 'Jainamshree Jain community-focused spiritual and pooja essentials marketplace - Namah Siddham Corporation',
  },
  {
    id: 'superiormart',
    category: 'OUR PRODUCTS',
    categoryColor: 'gold',
    title: 'SuperiorMart',
    description: 'A digital marketplace for everyday shopping needs.',
    image: '/assets/platforms/superiormart.jpg',
    fallbackImage: '/assets/services/custom-software.jpg',
    icon: ShoppingBag,
    alt: 'SuperiorMart multi-category digital shopping and e-commerce platform - Namah Siddham Corporation',
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  const totalSlides = heroSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Autoplay timer: 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Smooth scroll handler
  const handleSmoothScroll = (targetId, fallbackUrl) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (fallbackUrl) {
      window.location.href = fallbackUrl;
    }
  };

  // Reusable 16:9 Image Slider Component
  const renderSlider = () => (
    <div
      className="w-full relative group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Namah Siddham IT Services & Digital Products Showcase"
    >
      {/* 16:9 Aspect Ratio Outer Frame */}
      <div
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full aspect-[16/9] relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-sky-200/90 shadow-2xl shadow-sky-900/15 bg-slate-900 ring-1 ring-white/40"
      >
        {/* Slides rendering */}
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          const SlideIcon = slide.icon;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Background 16:9 Image with gentle Ken Burns motion on active */}
              <img
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                className={`w-full h-full object-cover object-center ${isActive ? 'hero-ken-burns' : ''}`}
                onError={(e) => {
                  if (slide.fallbackImage && e.target.src !== slide.fallbackImage) {
                    e.target.src = slide.fallbackImage;
                  }
                }}
              />

              {/* Subtle top dark gradient for counter visibility */}
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

              {/* Top Bar with Category Pill & Slide Counter */}
              <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-5 flex items-center justify-between z-20 pointer-events-none">
                <span
                  className={`inline-flex items-center space-x-1.5 text-[9px] sm:text-[10px] font-mono font-extrabold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md shadow-sm ${
                    slide.categoryColor === 'gold'
                      ? 'bg-amber-950/70 text-[#F5C542] border border-[#F5C542]/50'
                      : 'bg-slate-900/70 text-sky-300 border border-sky-400/40'
                  }`}
                >
                  <SlideIcon className="w-3 h-3" />
                  <span>{slide.category}</span>
                </span>

                <span className="font-mono text-[10px] sm:text-xs font-bold text-white/90 bg-black/40 backdrop-blur-md border border-white/20 px-2 sm:px-2.5 py-0.5 rounded-full shadow-sm">
                  {String(index + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                </span>
              </div>

              {/* Bottom Overlay with Subtle Dark Gradient */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 pt-12 sm:pt-16 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent z-20 flex flex-col justify-end">
                <div className="space-y-1 sm:space-y-1.5">
                  <h3 className="font-heading font-black text-base sm:text-xl md:text-2xl text-white tracking-tight drop-shadow-md">
                    {slide.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-200 leading-snug font-normal drop-shadow-sm line-clamp-2 max-w-xl">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Previous Navigation Arrow */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md border border-white/25 shadow-lg transition-all transform hover:scale-105 active:scale-95 opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Next Navigation Arrow */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md border border-white/25 shadow-lg transition-all transform hover:scale-105 active:scale-95 opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Small Pagination Dots Below Slider */}
      <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 pt-3 sm:pt-4">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F5C542]/50 ${
                isActive
                  ? 'w-7 sm:w-8 h-2.5 bg-[#F5C542] rounded-full shadow-sm shadow-[#F5C542]/50'
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400 rounded-full'
              }`}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E0F2FE]/80 via-[#F0F8FF] to-[#E6F2FC] text-slate-900 py-10 sm:py-14 lg:py-16 border-b border-sky-200/80">
      {/* Soft atmospheric ambient glow orbs matching official brand palette */}
      <div className="hero-glow-orb absolute -top-24 left-1/4 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="hero-glow-orb absolute top-20 right-10 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="hero-glow-orb absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-amber-400/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#0284C7_1.5px,transparent_1.5px)] [background-size:26px_26px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* DESKTOP TWO-COLUMN LAYOUT (lg: and above)                                */}
        {/* Left: 48% width | Right: 52% width | Balanced Vertical Alignment         */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-10 xl:gap-14">
          
          {/* Left Column (48% width) */}
          <div className="w-[48%] space-y-5 text-left">
            {/* Corporate Identification Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-800 bg-white border border-sky-200/90 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span>Namah Siddham Corporation Private Limited</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-black text-3xl xl:text-[42px] 2xl:text-[46px] text-brand-navy tracking-tight leading-[1.18]">
              Empowering Businesses Through{' '}
              <span className="text-brand-blue">Technology</span>,{' '}
              <span className="text-gradient-ns">Innovation</span> &amp;{' '}
              <span className="text-gradient-blue">Digital Transformation</span>
            </h1>

            {/* Supporting Text - 4 Exact Paragraphs */}
            <div className="space-y-3.5 text-xs xl:text-sm text-slate-700 leading-relaxed font-normal text-left">
              <p>
                At <strong className="font-bold text-brand-navy">Namah Siddham Corporation Private Limited</strong>, we believe that technology is more than just a tool — it is a powerful force for transforming ideas into opportunities and businesses into digital success stories.
              </p>
              <p>
                We combine our expertise in website development, custom software solutions, mobile application development, and digital marketing with a growing ecosystem of innovative digital products designed to simplify everyday needs and connect people, businesses, and opportunities.
              </p>
              <p>
                From helping businesses establish a strong online presence and streamline their operations to building specialized platforms such as <span className="font-semibold text-brand-blue">HomeServixo</span>, <span className="font-semibold text-brand-orange">Carrento</span>, <span className="font-semibold text-amber-700">Jainamshree</span>, and <span className="font-semibold text-emerald-700">SuperiorMart</span>, our vision is to create meaningful digital experiences that bring convenience, connectivity, and new possibilities to the modern world.
              </p>
              <p>
                Whether you are a startup with a bold idea, an established business ready to embrace digital transformation, or a customer or partner looking to be part of an evolving digital ecosystem, Namah Siddham aims to bring the right technology, practical solutions, and forward-thinking approach to help you move ahead with confidence.
              </p>
            </div>

            {/* Highlight Statement using Golden-Yellow Accent */}
            <div className="relative p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-transparent border-l-4 border-[#F5C542] shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-lg bg-[#F5C542]/20 text-amber-700 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-xs xl:text-sm font-bold text-brand-navy leading-relaxed font-sans">
                  “We don't just build digital solutions — we create possibilities for businesses to grow, people to connect, and ideas to move forward.”
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-row items-center space-x-4">
              <button
                onClick={() => handleSmoothScroll('services', '/services')}
                className="shiny-btn inline-flex items-center justify-center px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-xs xl:text-sm shadow-xl shadow-sky-500/30 hover:shadow-sky-400/50 transition-all transform hover:-translate-y-0.5 border border-sky-300/40"
              >
                <span>Explore Our IT Services</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={() => handleSmoothScroll('ecosystem', '/products')}
                className="shiny-btn inline-flex items-center justify-center px-7 py-3.5 rounded-2xl bg-white hover:bg-orange-500 text-orange-600 hover:text-white border-2 border-orange-400/80 font-bold text-xs xl:text-sm transition-all transform hover:-translate-y-0.5 shadow-md shadow-orange-500/10"
              >
                <span>Discover Our Products</span>
              </button>
            </div>
          </div>

          {/* Right Column (52% width) - 16:9 Animated Image Slider */}
          <div className="w-[52%] flex flex-col justify-center">
            {renderSlider()}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET LAYOUT (< lg)                                            */}
        {/* Sequence: 1. Headline & Text -> 2. Slider -> 3. Highlight Statement & CTAs */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex flex-col space-y-6 text-left">
          
          {/* 1. Headline & Supporting Text */}
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold text-sky-800 bg-white border border-sky-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span>Namah Siddham Corporation</span>
            </div>

            <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl text-brand-navy tracking-tight leading-tight">
              Empowering Businesses Through{' '}
              <span className="text-brand-blue">Technology</span>,{' '}
              <span className="text-gradient-ns">Innovation</span> &amp;{' '}
              <span className="text-gradient-blue">Digital Transformation</span>
            </h1>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal text-left">
              <p>
                At <strong className="font-bold text-brand-navy">Namah Siddham Corporation Private Limited</strong>, we believe that technology is more than just a tool — it is a powerful force for transforming ideas into opportunities and businesses into digital success stories.
              </p>
              <p>
                We combine our expertise in website development, custom software solutions, mobile application development, and digital marketing with a growing ecosystem of innovative digital products designed to simplify everyday needs and connect people, businesses, and opportunities.
              </p>
              <p>
                From helping businesses establish a strong online presence and streamline their operations to building specialized platforms such as <span className="font-semibold text-brand-blue">HomeServixo</span>, <span className="font-semibold text-brand-orange">Carrento</span>, <span className="font-semibold text-amber-700">Jainamshree</span>, and <span className="font-semibold text-emerald-700">SuperiorMart</span>, our vision is to create meaningful digital experiences that bring convenience, connectivity, and new possibilities to the modern world.
              </p>
              <p>
                Whether you are a startup with a bold idea, an established business ready to embrace digital transformation, or a customer or partner looking to be part of an evolving digital ecosystem, Namah Siddham aims to bring the right technology, practical solutions, and forward-thinking approach to help you move ahead with confidence.
              </p>
            </div>
          </div>

          {/* 2. Right Side 16:9 Slider on Mobile */}
          <div className="w-full py-1">
            {renderSlider()}
          </div>

          {/* 3. Highlight Statement using Golden-Yellow Accent */}
          <div className="relative p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-transparent border-l-4 border-[#F5C542] shadow-sm">
            <div className="flex items-start space-x-2.5">
              <div className="p-1 rounded-lg bg-[#F5C542]/20 text-amber-700 shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-brand-navy leading-relaxed font-sans">
                “We don't just build digital solutions — we create possibilities for businesses to grow, people to connect, and ideas to move forward.”
              </p>
            </div>
          </div>

          {/* 4. Mobile-friendly CTA Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center space-y-2.5 sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => handleSmoothScroll('services', '/services')}
              className="shiny-btn inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-sky-500/30 transition-all active:scale-[0.98]"
            >
              <span>Explore Our IT Services</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <button
              onClick={() => handleSmoothScroll('ecosystem', '/products')}
              className="shiny-btn inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-white hover:bg-orange-500 text-orange-600 hover:text-white border-2 border-orange-400/80 font-bold text-xs sm:text-sm transition-all active:scale-[0.98] shadow-sm"
            >
              <span>Discover Our Products</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
