import React, { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

export default function Timeline() {
  const { isDark } = useTheme();
  const headerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    if (headerRef.current) {
      headerRef.current.classList.add('scroll-reveal');
      observer.observe(headerRef.current);
    }
    itemRefs.current.forEach((el) => {
      if (el) {
        el.classList.add('scroll-reveal');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const events = [
    {
      id: 1,
      type: 'education',
      date: 'Sep 2024 - Present',
      title: 'B.S. in Software Engineering & Information Systems',
      org: 'Faculty of Sciences and Technology – Sidi Bouzid (FST-SBz)',
      desc: 'Currently pursuing a degree focused on software design, database systems, and modern information architectures at FST-SBz.',
      badge: 'Education',
      icon: 'education',
      accent: isDark ? 'text-primary-fixed-dim border-primary-fixed-dim/30 bg-primary-fixed-dim/10' : 'text-brand-blue border-brand-blue/20 bg-brand-blue/6',
      nodeColor: isDark ? 'bg-primary-fixed-dim' : 'bg-brand-blue',
      glowColor: isDark ? 'rgba(0,219,233,0.4)' : 'rgba(30,48,243,0.3)'
    },
    {
      id: 2,
      type: 'robotics',
      date: 'Apr 2024',
      title: 'Autonomous Robotics Hackathon - 2nd Place',
      org: 'State Engineering Arena (24-Hour Hackathon)',
      desc: 'Collaborated in a team of three to assemble and program an autonomous maze-solving mobile rover. Wrote real-time C++ pathfinding algorithms and calibrated PID controllers to handle high-speed wheel motion.',
      badge: 'Competition',
      icon: 'emoji_events',
      accent: isDark ? 'text-secondary-fixed border-secondary-fixed/30 bg-secondary-fixed/10' : 'text-brand-pink border-brand-pink/20 bg-brand-pink/6',
      nodeColor: isDark ? 'bg-secondary-fixed' : 'bg-brand-pink',
      glowColor: isDark ? 'rgba(255,225,109,0.4)' : 'rgba(226,30,128,0.3)'
    },
    {
      id: 3,
      type: 'web',
      date: 'Feb 2024 - Jul 2024',
      title: 'Freelance Web & Mobile Developer',
      org: 'Self-Employed',
      desc: 'Designed and deployed modern corporate web portals and cross-platform companion mobile apps. Utilized Node.js, SQLite, and React Native to deliver lightweight, high-performance digital products for local enterprises.',
      badge: 'Freelance',
      icon: 'laptop_mac',
      accent: isDark ? 'text-primary-fixed border-primary-fixed/30 bg-primary-fixed/10' : 'text-brand-blue border-brand-blue/20 bg-brand-blue/6',
      nodeColor: isDark ? 'bg-primary-fixed' : 'bg-brand-blue',
      glowColor: isDark ? 'rgba(125,244,255,0.4)' : 'rgba(30,48,243,0.3)'
    }

  ];

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
    <section id="timeline" className={`relative py-xl border-t ${isDark ? 'bg-surface-container-lowest border-white/10' : 'bg-white border-gray-100'
      }`}>
      <div className="max-w-container-max mx-auto px-gutter flex flex-col gap-lg">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-xs">
          <span className="section-badge">Journey</span>
          <h2 className={`font-display-xl text-headline-lg font-bold mt-xs ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
            My Technical{' '}
            <span style={gradientText}>Path</span>
          </h2>
          <div className="section-divider w-32 mt-sm" />
        </div>

        {/* Timeline List */}
        <div className={`relative max-w-3xl mx-auto mt-md pl-12 before:absolute before:w-0.5 before:left-4 before:top-2 before:bottom-2 before:rounded-full ${isDark
          ? 'before:bg-gradient-to-b before:from-primary-fixed-dim/60 before:via-white/10 before:to-transparent'
          : 'before:bg-gradient-to-b before:from-brand-blue/40 before:via-gray-200 before:to-transparent'
          }`}>
          {events.map((event, idx) => (
            <div
              key={event.id}
              ref={el => itemRefs.current[idx] = el}
              className="relative mb-lg last:mb-0 group"
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              {/* Timeline Node */}
              <div className={`absolute left-[-40px] top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 group-hover:scale-125 transition-all duration-300 ${isDark ? 'bg-background border-white/20 group-hover:border-primary-fixed-dim' : 'bg-white border-gray-200 group-hover:border-brand-blue'
                }`}
                style={{ boxShadow: `0 0 0 0px transparent`, }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 12px ${event.glowColor}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${event.nodeColor} transition-all`} />
              </div>

              {/* Event Card */}
              <div className={`glass-panel p-md rounded-xl flex flex-col gap-xs transition-all duration-300 hover-lift group-hover:translate-x-1 ${isDark ? 'hover:border-white/20' : 'hover:border-gray-200'
                }`}>
                <div className="flex flex-wrap items-center justify-between gap-sm">
                  <span className={`text-[12px] font-mono font-medium px-3 py-1 rounded-md border ${isDark ? 'text-on-surface-variant bg-white/5 border-white/10' : 'text-gray-500 bg-gray-50 border-gray-200'
                    }`}>
                    {event.date}
                  </span>
                  <span className={`text-[10px] font-label-caps px-3 py-1 rounded-full border ${event.accent}`}>
                    {event.badge}
                  </span>
                </div>

                <h3 className={`font-headline-md text-[18px] font-semibold mt-xs ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
                  {event.title}
                </h3>
                <strong className={`font-medium text-[13px] ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>
                  {event.org}
                </strong>
                <p className={`text-[14px] font-body-md mt-xs leading-relaxed ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
