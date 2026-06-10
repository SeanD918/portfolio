import React from 'react';
import { useTheme } from '../ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <footer className={`w-full border-t py-10 px-gutter relative z-10 ${
      isDark ? 'bg-surface-container-lowest border-white/5' : 'bg-white border-gray-100'
    }`}>
      <div className="max-w-container-max mx-auto flex flex-col items-center gap-md">

        {/* Brand */}
        <span className="font-headline-md font-extrabold text-[24px]" style={gradientStyle}>
          R. IHEB
        </span>

        {/* Back to Top */}
        <button
          className={`w-10 h-10 border rounded-lg hover:scale-110 active:scale-90 transition-all flex items-center justify-center cursor-pointer ${
            isDark
              ? 'border-white/10 text-on-surface-variant hover:border-primary-fixed-dim hover:text-primary-fixed-dim'
              : 'border-gray-200 text-gray-400 hover:border-brand-blue hover:text-brand-blue'
          }`}
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
        </button>

        {/* Divider */}
        <div className="section-divider w-48" />

        <div className="flex flex-col items-center gap-xs text-center">
          <p className={`font-body-md text-[13px] ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
            &copy; {new Date().getFullYear()} R. Iheb. Handcrafted with React &amp; Plus Jakarta Sans. All Rights Reserved.
          </p>
          <p className={`font-label-caps text-[9px] tracking-widest uppercase ${isDark ? 'text-on-surface-variant/40' : 'text-gray-400'}`}>
            System status: ONLINE &bull; Latency: 12ms &bull; Version: 2.4.0
          </p>
        </div>
      </div>
    </footer>
  );
}
