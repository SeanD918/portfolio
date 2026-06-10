import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

function useScrollReveal(animClass = 'scroll-reveal', delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add(animClass);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => el.classList.add('active'), delay);
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, animClass]);
  return ref;
}

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  const headerRef = useScrollReveal('scroll-reveal', 0);
  const card1Ref = useScrollReveal('scroll-reveal-scale', 100);
  const card2Ref = useScrollReveal('scroll-reveal-scale', 250);
  const card3Ref = useScrollReveal('scroll-reveal-scale', 400);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const webSkills = [
    { name: 'React (18/19)', val: 90 },
    { name: 'JavaScript (ES6+) / TS', val: 85 },
    { name: 'Node.js & Express.js', val: 80 },
    { name: 'SQL (PostgreSQL / SQLite)', val: 75 },
    { name: 'REST & WebSocket APIs', val: 85 }
  ];

  const mobileSkills = [
    { name: 'React Native', val: 85 },
    { name: 'Redux / Zustand State', val: 80 },
    { name: 'iOS & Android Layouts', val: 85 },
    { name: 'Offline Sync & SQLite', val: 70 },
    { name: 'Push Notification Services', val: 75 }
  ];

  const systemsSkills = [
    { name: 'C/C++ Programming', val: 80 },
    { name: 'Python (Scripting & CV)', val: 80 },
    { name: 'Git & GitHub Workflows', val: 85 },
    { name: 'Data Structures & OOP', val: 85 },
    { name: 'Embedded Hardware / IoT', val: 75 }
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

  const SkillBar = ({ skill, index, barColor, textColor }) => (
    <div key={index} className="flex flex-col gap-base">
      <div className="flex justify-between text-[13px]">
        <span className={isDark ? 'text-on-surface-variant font-medium' : 'text-gray-500 font-medium'}>{skill.name}</span>
        <span className={`font-mono font-bold ${textColor}`}>{skill.val}%</span>
      </div>
      <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-black/8'}`}>
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
          style={{ width: animate ? `${skill.val}%` : '0%', transitionDelay: `${index * 100}ms` }}
        />
      </div>
    </div>
  );

  return (
    <section id="skills" className={`relative py-xl border-t ${isDark ? 'bg-background border-white/10' : 'bg-gray-50 border-gray-100'}`} ref={containerRef}>
      <div className="max-w-container-max mx-auto px-gutter flex flex-col gap-lg">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-xs">
          <span className="section-badge">Technical Stack</span>
          <h2 className={`font-display-xl text-headline-lg font-bold mt-xs ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
            My{' '}
            <span style={gradientText}>Skills Matrix</span>
          </h2>
          <div className="section-divider w-32 mt-sm" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-md">

          {/* Web Development */}
          <div ref={card1Ref} className={`glass-panel p-md rounded-xl flex flex-col gap-md hover-lift transition-all duration-500 ${
            isDark ? 'hover:shadow-[0_0_30px_rgba(0,219,233,0.08)]' : 'hover:shadow-[0_20px_40px_rgba(30,48,243,0.1)]'
          }`}>
            <div className={`flex items-center gap-xs border-b pb-sm ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
              <span className={`material-symbols-outlined ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>code</span>
              <h3 className={`font-headline-md text-[17px] font-semibold ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>Web Development</h3>
            </div>
            <div className="flex flex-col gap-sm">
              {webSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} index={index}
                  barColor={isDark ? 'bg-primary-fixed-dim shadow-[0_0_8px_#00dbe9]' : 'bg-brand-blue'}
                  textColor={isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}
                />
              ))}
            </div>
          </div>

          {/* Mobile Development */}
          <div ref={card2Ref} className={`glass-panel p-md rounded-xl flex flex-col gap-md hover-lift transition-all duration-500 ${
            isDark ? 'hover:shadow-[0_0_30px_rgba(255,225,109,0.08)]' : 'hover:shadow-[0_20px_40px_rgba(226,30,128,0.1)]'
          }`}>
            <div className={`flex items-center gap-xs border-b pb-sm ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
              <span className={`material-symbols-outlined ${isDark ? 'text-secondary-fixed' : 'text-brand-pink'}`}>smartphone</span>
              <h3 className={`font-headline-md text-[17px] font-semibold ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>Mobile Development</h3>
            </div>
            <div className="flex flex-col gap-sm">
              {mobileSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} index={index}
                  barColor={isDark ? 'bg-secondary-fixed shadow-[0_0_8px_#ffe16d]' : 'bg-brand-pink'}
                  textColor={isDark ? 'text-secondary-fixed' : 'text-brand-pink'}
                />
              ))}
            </div>
          </div>

          {/* Systems & Software */}
          <div ref={card3Ref} className={`glass-panel p-md rounded-xl flex flex-col gap-md hover-lift transition-all duration-500`}>
            <div className={`flex items-center gap-xs border-b pb-sm ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
              <span className={`material-symbols-outlined ${isDark ? 'text-outline' : 'text-gray-500'}`}>dns</span>
              <h3 className={`font-headline-md text-[17px] font-semibold ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>Systems &amp; Software</h3>
            </div>
            <div className="flex flex-col gap-sm">
              {systemsSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} index={index}
                  barColor={isDark ? 'bg-outline' : 'bg-gray-400'}
                  textColor={isDark ? 'text-outline' : 'text-gray-400'}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
