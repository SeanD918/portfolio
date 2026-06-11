import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

// Floating particle dots (like reference design)
function HeroDots() {
  return (
    <div className="hero-dots" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="hero-dot"
          style={{
            left: `${8 + (i * 7.5) % 90}%`,
            width: `${3 + (i % 3)}px`,
            height: `${3 + (i % 3)}px`,
            animationDuration: `${8 + (i * 1.3) % 12}s`,
            animationDelay: `${(i * 0.7) % 6}s`,
          }}
        />
      ))}
    </div>
  );
}

// SVG dot column (from reference design)
const SVG_DOTS_PATH = "M227.7,12788.6c-105-35-200-141-222-248c-43-206,163-412,369-369c155,32,275,190,260,339c-11,105-90,213-190,262C383.7,12801.6,289.7,12808.6,227.7,12788.6z M1507.7,12788.6c-151-50-253-216-222-362c25-119,136-230,254-255c194-41,395,142,375,339c-11,105-90,213-190,262C1663.7,12801.6,1569.7,12808.6,1507.7,12788.6z M227.7,11508.6c-105-35-200-141-222-248c-43-206,163-412,369-369c155,32,275,190,260,339c-11,105-90,213-190,262C383.7,11521.6,289.7,11528.6,227.7,11508.6z M1507.7,11508.6c-151-50-253-216-222-362c25-119,136-230,254-255c194-41,395,142,375,339c-11,105-90,213-190,262C1663.7,11521.6,1569.7,11528.6,1507.7,11508.6z";

function DotsColumn({ fill, style }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 191.6 1215.4"
      style={{ fill, ...style }}
      className="w-full h-auto"
    >
      <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
        {[12788.6, 11508.6, 10228.6, 8948.6, 7668.6, 6388.6, 5108.6, 3828.6, 2548.6, 1268.6].map((y) => (
          <React.Fragment key={y}>
            <path d={`M227.7,${y}c-105-35-200-141-222-248c-43-206,163-412,369-369c155,32,275,190,260,339c-11,105-90,213-190,262C383.7,${y+13},289.7,${y+20},227.7,${y}z`} />
            <path d={`M1507.7,${y}c-151-50-253-216-222-362c25-119,136-230,254-255c194-41,395,142,375,339c-11,105-90,213-190,262C1663.7,${y+13},1569.7,${y+20},1507.7,${y}z`} />
          </React.Fragment>
        ))}
      </g>
    </svg>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: id === 'home' ? 0 : el.offsetTop - 64, behavior: 'smooth' });
    }
  };

  const gradientStyle = {
    backgroundImage: isDark
      ? 'linear-gradient(135deg, #7df4ff, #00dbe9)'
      : 'linear-gradient(135deg, #1e30f3, #e21e80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  };

  return (
    <section id="home" className={`relative min-h-screen pt-16 flex flex-col items-center justify-center overflow-hidden ${
      isDark ? 'bg-background' : 'bg-white'
    }`}>
      {/* Floating dots background */}
      <HeroDots />

      {/* Gradient background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: isDark ? 'radial-gradient(circle, #00dbe9, transparent)' : 'radial-gradient(circle, #1e30f3, transparent)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: isDark ? 'radial-gradient(circle, #7df4ff, transparent)' : 'radial-gradient(circle, #e21e80, transparent)' }}
        />
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-lg items-center min-h-[calc(100vh-64px)]">
        {/* Left: Bio */}
        <div className={`flex flex-col gap-sm w-full transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div
            className="flex flex-col gap-sm w-full"
            style={{
              transform: `translateY(${scrollY * 0.08}px)`,
              opacity: Math.max(0, 1 - scrollY / 700),
              willChange: 'transform, opacity'
            }}
          >
            {/* Badge */}
            <div className="flex items-center gap-sm">
              <span
                className="section-badge animate-slide-down"
                style={{ animationDelay: '0.1s' }}
              >
                ✦ Design · Development · Engineering
              </span>
            </div>

            {/* Headline */}
            <h1 className={`font-display-xl text-display-xl-mobile md:text-display-xl leading-tight font-extrabold mt-sm ${
              isDark ? 'text-on-surface' : 'text-gray-900'
            }`}>
              Crafting Scalable{' '}
              <span style={gradientStyle}>Web Systems</span>
              {' '}&amp; Immersive{' '}
              <span style={gradientStyle}>Mobile Apps</span>
            </h1>

            <p className={`font-body-lg text-body-lg max-w-xl ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
              Computer Science &amp; Software Engineering student specializing in responsive
              fullstack web development (React, Node.js) and high-fidelity cross-platform
              mobile apps (React Native).
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-md mt-md">
              <button
                className="px-8 py-4 font-label-caps text-label-caps text-[11px] tracking-widest uppercase font-bold rounded-lg active:scale-95 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                style={{
                  backgroundImage: isDark
                    ? 'linear-gradient(135deg, #00dbe9, #7df4ff)'
                    : 'linear-gradient(135deg, #1e30f3, #e21e80)',
                  color: isDark ? '#002022' : '#fff'
                }}
                onClick={() => scrollToSection('projects')}
              >
                Explore Projects
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <a
                href="/CV_R_IHEB.pdf"
                download="CV_R_IHEB.pdf"
                className={`px-8 py-4 border-2 font-label-caps text-[11px] tracking-widest uppercase font-bold rounded-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 select-none ${
                  isDark
                    ? 'border-primary-fixed-dim text-primary-fixed-dim hover:bg-primary-fixed-dim/10'
                    : 'border-brand-blue text-brand-blue hover:bg-brand-blue/5'
                }`}
              >
                Download CV
                <span className="material-symbols-outlined text-[18px]">download</span>
              </a>

              <button
                className={`px-8 py-4 border font-label-caps text-[11px] tracking-widest uppercase font-bold rounded-lg active:scale-95 transition-all ${
                  isDark
                    ? 'border-white/10 text-on-surface-variant hover:bg-white/5 hover:text-white'
                    : 'border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Right: Profile Picture (reference design style) */}
        <div className={`flex justify-center md:justify-end items-center transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div
            className="relative"
            style={{
              transform: `translateY(${scrollY * 0.10}px) scale(${Math.max(0.85, 1 - scrollY / 2000)})`,
              opacity: Math.max(0, 1 - scrollY / 900),
              willChange: 'transform, opacity'
            }}
          >
            {/* SVG Dot Decorations (reference design) */}
            <div className="absolute pointer-events-none" style={{ width: '3vw', minWidth: 28, right: '1.5vw', top: '4vw' }}>
              <DotsColumn fill={isDark ? '#00dbe9' : '#fff'} />
            </div>
            <div className="absolute pointer-events-none" style={{ width: '3vw', minWidth: 28, right: '-4vw', top: '6vw' }}>
              <DotsColumn fill={isDark ? '#7df4ff' : '#1e30f3'} />
            </div>
            <div className="absolute pointer-events-none" style={{ width: '3vw', minWidth: 28, left: '1.5vw', bottom: '6vw' }}>
              <DotsColumn fill={isDark ? '#00dbe9' : '#fff'} />
            </div>
            <div className="absolute pointer-events-none" style={{ width: '3vw', minWidth: 28, left: '-4vw', bottom: '4vw' }}>
              <DotsColumn fill={isDark ? '#7df4ff' : '#1e30f3'} />
            </div>

            {/* Profile Picture with Gradient Ring */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group animate-float">
              {/* Spinning rings on hover */}
              <div className="absolute -inset-3 rounded-full border border-dashed opacity-0 group-hover:opacity-30 animate-[spin_40s_linear_infinite] pointer-events-none transition-all duration-500"
                style={{ borderColor: isDark ? '#00dbe9' : '#1e30f3' }} />
              <div className="absolute -inset-5 rounded-full border border-double opacity-0 group-hover:opacity-20 pointer-events-none transition-all duration-500"
                style={{ borderColor: isDark ? '#7df4ff' : '#e21e80' }} />

              {/* Ambient glow on hover */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
                style={{ background: isDark ? 'rgba(0,219,233,0.2)' : 'rgba(30,48,243,0.15)' }} />

              {/* Gradient ring container */}
              <div className="profile-gradient-ring w-full h-full rounded-full">
                <div className={`w-full h-full rounded-full overflow-hidden p-1 ${isDark ? 'bg-surface' : 'bg-white'}`}>
                  <img
                    alt="R. IHEB"
                    className="w-full h-full object-cover rounded-full transition-all duration-700 select-none"
                    src="/profile.jpg"
                  />
                </div>
              </div>

              {/* Technical Decorations */}
              <div className={`absolute -top-4 -right-4 w-14 h-14 flex items-center justify-center rounded-xl border shadow-lg animate-bounce glass-panel ${
                isDark ? 'border-primary-fixed-dim/40' : 'border-brand-blue/30'
              }`}>
                <span className={`material-symbols-outlined text-[22px] ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>code</span>
              </div>
              <div
                className={`absolute -bottom-2 -left-4 w-16 h-16 flex items-center justify-center rounded-xl border shadow-lg glass-panel ${
                  isDark ? 'border-secondary-fixed/40' : 'border-brand-pink/30'
                }`}
                style={{ animation: 'float 4s ease-in-out infinite' }}
              >
                <span className={`material-symbols-outlined text-[22px] ${isDark ? 'text-secondary-fixed' : 'text-brand-pink'}`}>smartphone</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
          scrollY > 80 ? 'opacity-0 translate-y-2' : 'opacity-60 translate-y-0'
        }`}
        aria-hidden="true"
      >
        <span className={`font-label-caps text-[9px] tracking-widest uppercase ${isDark ? 'text-on-surface-variant' : 'text-gray-400'}`}>scroll</span>
        <div className={`w-px h-8 animate-bounce ${isDark ? 'bg-primary-fixed-dim' : 'bg-brand-blue'}`} />
      </div>
    </section>
  );
}
