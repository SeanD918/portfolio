import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

const GithubIcon = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { isDark } = useTheme();

  const projectsData = [
    {
      id: 1, category: 'web',
      title: 'AI Biometric Recognition',
      desc: 'An advanced, multi-task computer vision platform that leverages deep learning for real-time biometric tracking, gender estimation, animals recgonition, and American Sign Language (ASL) translation.',
      longDesc: 'Designed a high-performance web interface integrating real-time computer vision models for simultaneous biometric tracking. Connects to a robust backend server to process live video streams, instantly executing facial analysis, gender estimation, and American Sign Language (ASL) gesture decoding through a seamless, low-latency data pipeline.',
      challenge: 'High CPU usage, frame-rate drops, and UI lag when handling simultaneous real-time video processing streams and multi-task model predictions in the browser.',
      solution: 'Optimized inference pipelines by implementing web workers for asynchronous frame processing. Maintained a fluid 60 FPS UI by throttling state updates and leveraging efficient landmark tracking coordinates.',
      specs: [
        { label: 'Frontend', val: 'React 19, Chart.js' },
        { label: 'Backend', val: 'Node.js, Express' },
        { label: 'Database', val: 'PostgreSQL, Redis ,Mongodb' },
        { label: 'Protocol', val: 'WebSockets (Socket.io)' }
      ],
      tags: ['REACT', 'NODE.JS', 'POSTGRESQL', 'SOCKET.IO', 'DOCKER', 'PYTHON'],
      github: '#',
      demo: 'https://ai-recognition-gules.vercel.app/'
    },
    {
      id: 2, category: 'web',
      title: 'Solar Energy Solutions',
      desc: 'A modern, responsive solar energy company website showcasing services, products, and renewable energy solutions with an elegant design.',
      longDesc: 'Designed and developed a full-featured solar energy company website with a focus on performance and user experience. The site features smooth animations, responsive layouts, and engaging sections to present solar products, services, and company information effectively.',
      challenge: 'Delivering a visually compelling and high-performance website that clearly communicates complex solar energy offerings to a broad audience.',
      solution: 'Built with modern web technologies ensuring fast load times, accessibility, and seamless animations. Deployed on Vercel for global CDN delivery and instant scalability.',
      specs: [
        { label: 'Frontend', val: 'React.js' },
        { label: 'Styling', val: 'CSS / Tailwind' },
        { label: 'Deployment', val: 'Vercel' },
        { label: 'Performance', val: 'Optimized & Responsive' }
      ],
      tags: ['REACT', 'NODE.JS', 'LEAFLET'],
      github: '#',
      demo: 'https://solar-six-nu.vercel.app'
    },
    {
      id: 3, category: 'mobile',
      title: 'SmartHome Remote Controller',
      desc: 'A clean mobile dashboard interfacing with smart home appliances via low-overhead MQTT.',
      longDesc: 'Mobile automation app using React Native. Configured communication to an active MQTT broker, sending payload instructions to relays and tracking sensors in real-time.',
      challenge: 'Maintaining real-time state alerts and sensor feeds while the app is in the background.',
      solution: 'Configured native iOS & Android background service hooks and integrated Expo push notification systems to issue warnings on high temperature limits.',
      specs: [
        { label: 'Client Framework', val: 'React Native' },
        { label: 'State Store', val: 'Zustand' },
        { label: 'Protocol Layer', val: 'MQTT (WebSockets)' },
        { label: 'Notifications', val: 'APNS & FCM' }
      ],
      tags: ['REACT NATIVE', 'MQTT', 'ZUSTAND', 'EXPO'],
      github: 'https://github.com/iheb-dev/smarthome-controller',
      demo: '#'
    },
    {
      id: 4, category: 'web',
      title: 'E-LEARNING',
      desc: 'A scalable, full-stack e-learning platform engineered to deliver dynamic educational content, optimized exam repositories, and low-latency asset distribution for Tunisian Baccalaureate students under heavy traffic loads.',
      longDesc: 'Engineered a scalable e-learning web platform tailored for Tunisian Baccalaureate students. Developed a highly responsive frontend unified with a robust RESTful API to serve dynamic educational content, structured exam repositories, and automated revision modules, optimizing end-to-end data delivery for thousands of active users.',
      challenge: 'Handling high latency and connection dropouts when thousands of concurrent users are simultaneously streaming/downloading heavy PDF exam corrections, causing database connection pools to exhaust and blocking frontend UI rendering.',
      solution: 'Designed an asynchronous file-serving pipeline offloading heavy assets to cloud storage. Implemented Redis connection pooling and optimized database queries using indexes on exam types and years, while utilizing client-side data fetching rules (like caching or throttling) to ensure instant UI responsiveness.',
      specs: [
        { label: 'Runtime', val: 'Node.js' },
        { label: 'Database', val: 'PostgreSQL, MongoDB' },
        { label: 'Testing', val: 'Jest (94% coverage)' }
      ],
      tags: ['NODE.JS', 'REACT JS', 'MONGODB', 'JEST'],
      github: '#',
      demo: 'https://bac-web-iys2.vercel.app/'
    }
  ];

  const filteredProjects = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);

  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    if (headerRef.current) {
      headerRef.current.classList.add('scroll-reveal');
      observer.observe(headerRef.current);
    }
    if (gridRef.current) {
      Array.from(gridRef.current.children).forEach((child, i) => {
        child.classList.add('scroll-reveal-scale');
        child.style.transitionDelay = `${i * 120}ms`;
        observer.observe(child);
      });
    }
    return () => observer.disconnect();
  }, [filter]);

  const gradientText = {
    backgroundImage: isDark
      ? 'linear-gradient(135deg, #7df4ff, #00dbe9)'
      : 'linear-gradient(135deg, #1e30f3, #e21e80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  };

  const activeBtn = isDark
    ? 'bg-primary-fixed-dim/15 border-primary-fixed-dim text-primary-fixed-dim font-bold'
    : 'border-brand-blue text-white font-bold';

  const inactiveBtn = isDark
    ? 'border-white/10 text-on-surface-variant hover:text-white hover:border-white/30'
    : 'border-gray-200 text-gray-500 hover:text-brand-blue hover:border-brand-blue/40';

  return (
    <section id="projects" className={`relative py-xl border-t ${isDark ? 'bg-background border-white/10' : 'bg-gray-50 border-gray-100'}`}>
      <div className="max-w-container-max mx-auto px-gutter flex flex-col gap-lg">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-xs">
          <span className="section-badge">Portfolio</span>
          <h2 className={`font-display-xl text-headline-lg font-bold mt-xs ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
            Featured{' '}
            <span style={gradientText}>Projects</span>
          </h2>
          <div className="section-divider w-32 mt-sm" />
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-3 mt-xs flex-wrap">
          {[['all', 'All Projects'], ['web', 'Web Development'], ['mobile', 'Mobile Development']].map(([val, label]) => (
            <button
              key={val}
              className={`px-5 py-2 rounded-full font-label-caps text-[10px] tracking-widest uppercase border transition-all ${filter === val ? activeBtn : inactiveBtn
                }`}
              style={filter === val && !isDark ? {
                backgroundImage: 'linear-gradient(135deg, #1e30f3, #e21e80)',
                borderColor: 'transparent'
              } : {}}
              onClick={() => setFilter(val)}
            >{label}</button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-sm">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`glass-panel p-md rounded-xl flex flex-col gap-sm transition-all duration-300 relative group hover-lift ${isDark ? 'hover:border-white/20' : 'hover:border-gray-200'
                }`}
            >
              <div className={`flex justify-between items-center border-b pb-sm ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                <div className="flex items-center gap-xs">
                  <span className={`material-symbols-outlined ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>
                    {project.category === 'mobile' ? 'smartphone' : 'terminal'}
                  </span>
                  <span className={`font-label-caps text-[10px] tracking-widest uppercase font-bold ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>
                    {project.category}
                  </span>
                </div>
                <div className="flex items-center gap-sm">
                  <a href={project.github} target="_blank" rel="noreferrer"
                    className={`transition-colors ${isDark ? 'text-on-surface-variant hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}>
                    <GithubIcon size={16} />
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer"
                    className={`transition-colors ${isDark ? 'text-on-surface-variant hover:text-white' : 'text-gray-400 hover:text-gray-700'}`}>
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </a>
                </div>
              </div>

              <h3 className={`font-headline-md text-[19px] font-semibold mt-xs ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
                {project.title}
              </h3>

              <p className={`text-[14px] font-body-md leading-relaxed flex-grow ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-xs mt-sm pb-md">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className={`px-2.5 py-0.5 rounded-full font-label-caps text-[9px] tracking-widest uppercase border ${isDark ? 'bg-white/5 border-white/10 text-on-surface-variant' : 'bg-gray-100 border-gray-200 text-gray-500'
                    }`}>{tag}</span>
                ))}
              </div>

              <button
                className={`px-6 py-2.5 border font-label-caps text-[10px] tracking-widest uppercase rounded-lg active:scale-95 transition-all w-fit mt-auto font-bold ${isDark
                  ? 'border-primary-fixed-dim/30 text-primary-fixed-dim hover:bg-primary-fixed-dim/10'
                  : 'border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5'
                  }`}
                onClick={() => setSelectedProject(project)}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`glass-panel max-w-2xl w-full p-md md:p-lg rounded-xl flex flex-col gap-md relative max-h-[90vh] overflow-y-auto ${isDark ? '' : 'border-gray-200 shadow-2xl'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`absolute top-4 right-4 material-symbols-outlined cursor-pointer transition-colors ${isDark ? 'text-on-surface-variant hover:text-white' : 'text-gray-400 hover:text-gray-700'
                }`}
              onClick={() => setSelectedProject(null)}
            >close</button>

            <div className="flex flex-col gap-xs">
              <span className={`font-label-caps text-[10px] tracking-widest uppercase font-bold ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>
                {selectedProject.category === 'mobile' ? 'Mobile App Project' : 'Web Systems & Infrastructure'}
              </span>
              <h3 className={`font-headline-lg text-headline-lg font-bold ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
                {selectedProject.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-md mt-sm">
              <div className="md:col-span-7 flex flex-col gap-sm">
                <h4 className={`font-bold text-[14px] ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>Project Overview</h4>
                <p className={`text-[14px] leading-relaxed ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>{selectedProject.longDesc}</p>

                <h4 className={`font-bold text-[14px] mt-xs ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>Technical Challenge</h4>
                <p className={`text-[14px] leading-relaxed ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>{selectedProject.challenge}</p>

                <h4 className={`font-bold text-[14px] mt-xs ${isDark ? 'text-secondary-fixed' : 'text-brand-pink'}`}>Engineered Solution</h4>
                <p className={`text-[14px] leading-relaxed ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>{selectedProject.solution}</p>
              </div>

              <div className="md:col-span-5 flex flex-col gap-sm">
                <h4 className={`font-bold text-[14px] ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>Technical Specs</h4>
                <div className={`flex flex-col gap-xs border p-sm rounded-lg font-mono text-[12px] ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}>
                  {selectedProject.specs.map((spec, idx) => (
                    <div key={idx} className={`flex flex-col border-b pb-xs last:border-b-0 last:pb-0 ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                      <span className={`text-[10px] ${isDark ? 'text-on-surface-variant' : 'text-gray-400'}`}>{spec.label}</span>
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{spec.val}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-xs mt-sm">
                  <a href={selectedProject.github} target="_blank" rel="noreferrer"
                    className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 font-label-caps text-[11px] tracking-widest uppercase rounded-lg active:scale-95 transition-all font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #1e30f3, #e21e80)' }}>
                    <GithubIcon size={12} /> Code
                  </a>
                  <a href={selectedProject.demo} target="_blank" rel="noreferrer"
                    className={`flex-grow flex items-center justify-center gap-2 px-4 py-2.5 border font-label-caps text-[11px] tracking-widest uppercase rounded-lg active:scale-95 transition-all font-bold ${isDark ? 'border-primary-fixed-dim text-primary-fixed-dim hover:bg-primary-fixed-dim/10' : 'border-brand-blue text-brand-blue hover:bg-brand-blue/5'
                      }`}>
                    Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
