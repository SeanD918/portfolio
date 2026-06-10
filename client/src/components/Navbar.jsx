import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'about', label: 'About', icon: 'terminal' },
    { id: 'skills', label: 'Skills', icon: 'bar_chart' },
    { id: 'timeline', label: 'Timeline', icon: 'history' },
    { id: 'projects', label: 'Projects', icon: 'layers' },
    { id: 'contact', label: 'Contact', icon: 'alternate_email' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id, e) => {
    if (e) e.preventDefault();
    setIsDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: id === 'home' ? 0 : el.offsetTop - 64, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* ── Top App Bar ── */}
      <header
        id="main-navbar"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled
            ? `${isDark
              ? 'bg-surface/85 backdrop-blur-xl border-b border-primary-fixed-dim/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
              : 'bg-white/90 backdrop-blur-xl border-b border-brand-blue/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
            } h-14`
            : 'bg-transparent border-b border-transparent shadow-none h-16'
          }`}
      >
        <div className="flex justify-between items-center h-full px-gutter max-w-container-max mx-auto">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-4">
            <span
              className={`md:hidden material-symbols-outlined cursor-pointer select-none transition-all hover:scale-110 active:scale-95 ${isDark ? 'text-primary-fixed-dim hover:text-primary' : 'text-brand-blue hover:text-brand-pink'
                }`}
              onClick={() => setIsDrawerOpen(true)}
            >
              menu
            </span>
            <span
              className="font-headline-md font-extrabold tracking-tight text-[22px] cursor-pointer select-none transition-all"
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(135deg, #7df4ff, #00dbe9)'
                  : 'linear-gradient(135deg, #1e30f3, #e21e80)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}
              onClick={(e) => handleNavClick('home', e)}
            >
              R. IHEB
            </span>
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-label-caps text-label-caps">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-1 transition-all duration-300 select-none font-semibold text-[11px] tracking-widest uppercase ${activeSection === item.id
                    ? isDark
                      ? 'text-primary-fixed active-tab-indicator drop-shadow-[0_0_8px_rgba(0,219,233,0.4)]'
                      : 'text-brand-blue active-tab-indicator'
                    : isDark
                      ? 'text-on-surface-variant hover:text-primary-fixed-dim'
                      : 'text-gray-500 hover:text-brand-blue'
                  }`}
                onClick={(e) => handleNavClick(item.id, e)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Night Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="theme-toggle-track relative"
              aria-label="Toggle theme"
            >
              <span className="theme-toggle-thumb">
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>
                  {isDark ? 'dark_mode' : 'light_mode'}
                </span>
              </span>
            </button>

            {/* Download CV */}
            <a
              href="/CV (1).pdf.pdf"
              download="R_Iheb_CV.pdf"
              className={`hidden sm:flex items-center gap-1.5 font-label-caps text-[10px] tracking-widest uppercase active:scale-95 transition-all select-none border rounded px-3 py-1.5 font-bold ${isDark
                  ? 'text-primary-fixed-dim hover:text-primary border-primary-fixed-dim/20 hover:border-primary-fixed-dim/50 bg-primary-fixed-dim/5 hover:bg-primary-fixed-dim/10'
                  : 'text-brand-blue hover:text-white border-brand-blue/30 hover:border-brand-blue bg-brand-blue/5 hover:bg-brand-blue'
                }`}
              title="Download CV"
            >
              <span className="material-symbols-outlined text-[15px]">download</span>
              <span>CV</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Navigation Drawer (Mobile) ── */}
      <div
        className={`fixed inset-y-0 left-0 w-80 z-[60] backdrop-blur-2xl border-r shadow-2xl transition-transform duration-300 ease-in-out ${isDark
            ? 'bg-surface-container-low/95 border-primary-fixed-dim/20'
            : 'bg-white/97 border-brand-blue/10'
          } ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full py-8">
          <div className="px-gutter mb-8 flex items-center justify-between">
            <div className="flex flex-col">
              <span
                className="font-headline-md font-bold text-[22px]"
                style={{
                  backgroundImage: isDark
                    ? 'linear-gradient(135deg, #7df4ff, #00dbe9)'
                    : 'linear-gradient(135deg, #1e30f3, #e21e80)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >R. IHEB</span>
              <span className={`text-[11px] font-label-caps mt-1 tracking-wider uppercase ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
                Software Engineer
              </span>
            </div>
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all group active:scale-90 ${isDark
                  ? 'border-white/5 bg-white/5 text-on-surface-variant hover:text-white hover:border-white/20'
                  : 'border-gray-200 bg-gray-50 text-gray-400 hover:text-gray-700 hover:border-gray-300'
                }`}
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined transition-transform duration-300 group-hover:rotate-90">close</span>
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-300 group ${isActive
                      ? isDark
                        ? 'bg-primary-fixed-dim/10 text-primary-fixed border-l-2 border-primary-fixed-dim font-bold'
                        : 'bg-brand-blue/8 text-brand-blue border-l-2 border-brand-blue font-bold'
                      : isDark
                        ? 'text-on-surface-variant hover:bg-white/5 hover:text-white hover:translate-x-1'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-brand-blue hover:translate-x-1'
                    }`}
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  <span className={`material-symbols-outlined text-[20px] transition-colors duration-300 ${isActive
                      ? isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'
                      : isDark ? 'text-on-surface-variant/70 group-hover:text-primary-fixed-dim' : 'text-gray-400 group-hover:text-brand-blue'
                    }`}>{item.icon}</span>
                  <span className="font-label-caps text-[11px] tracking-widest uppercase">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Theme Toggle in Drawer */}
          <div className="mt-6 px-gutter">
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg border transition-all ${isDark
                  ? 'border-white/5 bg-white/5 hover:bg-white/10'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
              <span className={`font-label-caps text-[11px] tracking-widest uppercase ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>

          <div className={`mt-auto px-gutter pt-8 border-t text-[10px] font-mono opacity-40 ${isDark ? 'border-white/5 text-on-surface-variant' : 'border-gray-200 text-gray-500'
            }`}>
            v2.4.0 • Built with Precision
          </div>
        </div>
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-[50] bg-black/60 backdrop-blur-sm fade-in"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* ── Bottom Nav Bar (Mobile Only) ── */}
      <nav className={`md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-50 backdrop-blur-xl border rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex justify-around items-center h-16 px-2 ${isDark
          ? 'bg-surface/85 border-white/10'
          : 'bg-white/92 border-gray-200/80'
        }`}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <div
              key={item.id}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-300 relative cursor-pointer group select-none ${isActive
                  ? isDark ? 'text-primary-fixed' : 'text-brand-blue'
                  : isDark ? 'text-on-surface-variant/70 hover:text-white' : 'text-gray-400 hover:text-brand-blue'
                }`}
              onClick={(e) => handleNavClick(item.id, e)}
            >
              <span className={`material-symbols-outlined text-[20px] transition-all duration-300 ${isActive ? 'scale-110' : 'group-active:scale-95'
                }`}>
                {item.icon}
              </span>
              <span className="font-label-caps text-[9px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
              {isActive && (
                <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-primary-fixed-dim shadow-[0_0_6px_#00dbe9]' : 'bg-brand-blue shadow-[0_0_6px_#1e30f3]'
                  }`} />
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
