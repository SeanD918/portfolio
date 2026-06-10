import React, { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

function useScrollReveal(animClass = 'scroll-reveal', delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add(animClass);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('active'), delay);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, animClass]);
  return ref;
}

export default function About() {
  const { isDark } = useTheme();
  const headerRef = useScrollReveal('scroll-reveal', 0);
  const webTextRef = useScrollReveal('scroll-reveal-left', 100);
  const webImgRef = useScrollReveal('scroll-reveal-right', 250);
  const mobileImgRef = useScrollReveal('scroll-reveal-left', 100);
  const mobileTextRef = useScrollReveal('scroll-reveal-right', 250);

  const gradientText = {
    backgroundImage: isDark
      ? 'linear-gradient(135deg, #7df4ff, #00dbe9)'
      : 'linear-gradient(135deg, #1e30f3, #e21e80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  };

  return (
    <section id="about" className={`relative py-xl border-t ${
      isDark ? 'bg-surface-container-lowest border-white/10' : 'bg-white border-gray-100'
    }`}>
      <div className="max-w-container-max mx-auto px-gutter flex flex-col gap-xl">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-xs">
          <span className="section-badge">About Me</span>
          <h2 className={`font-display-xl text-headline-lg font-bold mt-xs ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
            My{' '}
            <span style={gradientText}>Expertise</span>
          </h2>
          <div className="section-divider w-32 mt-sm" />
        </div>

        {/* Web Systems Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg items-center">
          <div
            ref={webTextRef}
            className={`md:col-span-7 glass-panel p-md md:p-lg rounded-xl flex flex-col gap-sm order-2 md:order-1 hover-lift ${
              isDark ? '' : 'border-brand-blue/10'
            }`}
          >
            <div className="flex items-center gap-xs">
              <span className={`material-symbols-outlined ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>lan</span>
              <span className={`font-label-caps text-label-caps ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>ARCHITECTURE &amp; SCALE</span>
            </div>
            <h2 className={`font-headline-lg text-headline-lg font-bold ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
              Web Systems
            </h2>
            <p className={`font-body-md ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
              Building robust backends and dynamic frontends that handle complexity with grace.
              From microservices architecture to SEO-optimized single-page applications, I bridge
              the gap between heavy-duty data and pixel-perfect interfaces.
            </p>
            <div className="flex flex-wrap gap-xs mt-sm">
              {['NODE.JS', 'REACT', 'POSTGRESQL', 'AWS'].map(t => (
                <span key={t} className={`px-3 py-1 rounded-full font-label-caps text-[10px] border ${
                  isDark
                    ? 'bg-primary-fixed-dim/10 border-primary-fixed-dim/20 text-primary-fixed-dim'
                    : 'bg-brand-blue/8 border-brand-blue/20 text-brand-blue'
                }`}>{t}</span>
              ))}
            </div>
          </div>
          <div
            ref={webImgRef}
            className={`md:col-span-5 order-1 md:order-2 h-64 md:h-80 overflow-hidden rounded-xl border ${
              isDark ? 'border-white/10' : 'border-gray-100'
            }`}
          >
            <img
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              alt="Server hardware illuminated by cyan LED lights"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU9eF_ZGeOdxy0Zfg_uv2OC9RLyIpJnxu5SSl5KyqmSaw2saPEUbfBCDd7po8OuiiNV0dofM0ba5IxpSb3DpqXhEmwOQRTZD-5mGuh-6p6p8LUb_FOVXfOA0xDXadxxapzTc_N0ChLpb5rICcESlUo7m6CXgptdcd37ek7ruzupmgdqUrAGmydu_tjyEsz3UVgDQ0HBKu_h2egQzXaFr_Ax_tsQGsa5N9oFAbY5qhS0FZ2W5_VvR7_Hhq3cKdtVIsQIRMUf6Ob0Kg"
            />
          </div>
        </div>

        {/* Mobile Apps Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg items-center">
          <div
            ref={mobileImgRef}
            className={`md:col-span-5 h-64 md:h-80 overflow-hidden rounded-xl border ${
              isDark ? 'border-white/10' : 'border-gray-100'
            }`}
          >
            <img
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              alt="Smartphone displaying a vibrant dark UI"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDONcTfVseZ5tfvOddGO72tfK4g7wdAXGfvg6WIsNXyFJkdUYNH49zy-fwk-q9Xv8IjZUidqgWT-6f6oVnwky_DgMbOAcs7daH5T-phEjx5ev8yW3kWPIWEAXBLH-7m6TrfMRxI_OP3yJDgl3MFtqty-nD1PhGs0Dx3XYpArdEffys67T3nle0vpFxosH74SrD5WrAXHAD2PFQh4RQvLjWa6wrtY7dWunznREWlNsM2JWwYhw4V-0PI0TF_I_jl-l6DSKMfcruz71o"
            />
          </div>
          <div
            ref={mobileTextRef}
            className={`md:col-span-7 glass-panel p-md md:p-lg rounded-xl flex flex-col gap-sm hover-lift ${
              isDark ? '' : 'border-brand-pink/10'
            }`}
          >
            <div className="flex items-center gap-xs">
              <span className={`material-symbols-outlined ${isDark ? 'text-secondary-fixed' : 'text-brand-pink'}`}>touch_app</span>
              <span className={`font-label-caps text-label-caps ${isDark ? 'text-secondary-fixed' : 'text-brand-pink'}`}>NATIVE EXPERIENCES</span>
            </div>
            <h2 className={`font-headline-lg text-headline-lg font-bold ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
              Mobile Apps
            </h2>
            <p className={`font-body-md ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
              Delivering buttery-smooth performance and native-feeling interactions across iOS and
              Android. My approach focuses on ergonomic design, offline-first capabilities, and
              expressive animations that define modern mobile luxury.
            </p>
            <div className="flex flex-wrap gap-xs mt-sm">
              {['REACT NATIVE', 'EXPO', 'FIREBASE', 'REANIMATED'].map(t => (
                <span key={t} className={`px-3 py-1 rounded-full font-label-caps text-[10px] border ${
                  isDark
                    ? 'bg-secondary-fixed/10 border-secondary-fixed/20 text-secondary-fixed'
                    : 'bg-brand-pink/8 border-brand-pink/20 text-brand-pink'
                }`}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
