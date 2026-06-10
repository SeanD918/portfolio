import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

const GithubIcon = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: null, msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, msg: '' });
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', msg: 'Packet transmitted successfully! 🚀 I will get back to you shortly.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Oops! Something went wrong on the server.' });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Connection failed. Please verify that the Express server (port 3000) is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    [headerRef, infoRef, formRef].forEach((ref, i) => {
      if (ref.current) {
        ref.current.classList.add(i === 0 ? 'scroll-reveal' : i === 1 ? 'scroll-reveal-left' : 'scroll-reveal-right');
        ref.current.style.transitionDelay = `${i * 100}ms`;
        observer.observe(ref.current);
      }
    });
    return () => observer.disconnect();
  }, []);

  const gradientText = {
    backgroundImage: isDark
      ? 'linear-gradient(135deg, #7df4ff, #00dbe9)'
      : 'linear-gradient(135deg, #1e30f3, #e21e80)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  };

  const inputClass = `w-full border rounded-lg p-4 text-[15px] outline-none transition-all font-body-md ${
    isDark
      ? 'bg-white/5 border-white/10 focus:border-primary-fixed-dim text-white placeholder:text-on-surface-variant/40'
      : 'bg-white border-gray-200 focus:border-brand-blue text-gray-900 placeholder:text-gray-400 shadow-sm'
  }`;

  const contactLinks = [
    {
      href: 'mailto:iheb.r.dev@gmail.com',
      icon: <span className="material-symbols-outlined text-[22px]">mail</span>,
      label: 'EMAIL ME',
      value: 'iheb.r.dev@gmail.com',
      target: '_self'
    },
    {
      href: 'https://github.com/iheb-dev',
      icon: <GithubIcon size={22} />,
      label: 'GITHUB',
      value: 'github.com/iheb-dev',
      target: '_blank'
    },
    {
      href: 'https://linkedin.com/in/iheb-dev',
      icon: <LinkedinIcon size={22} />,
      label: 'LINKEDIN',
      value: 'linkedin.com/in/iheb-dev',
      target: '_blank'
    }
  ];

  return (
    <section id="contact" className={`relative py-xl border-t ${isDark ? 'bg-background border-white/10' : 'bg-white border-gray-100'}`}>
      <div className="max-w-container-max mx-auto px-gutter flex flex-col gap-lg">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-xs">
          <span className="section-badge">Communication</span>
          <h2 className={`font-display-xl text-headline-lg font-bold mt-xs ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
            Let's{' '}
            <span style={gradientText}>Connect</span>
          </h2>
          <div className="section-divider w-32 mt-sm" />
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg items-start mt-md">

          {/* Left: Contact Info */}
          <div ref={infoRef} className="md:col-span-5 flex flex-col gap-md">
            <h3 className={`font-headline-md text-[20px] font-semibold leading-tight ${isDark ? 'text-on-surface' : 'text-gray-900'}`}>
              Let's collaborate on software or mobile products!
            </h3>
            <p className={`text-[15px] font-body-md leading-relaxed ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>
              I am always open to discussing new opportunities, freelance web development,
              cross-platform mobile systems, or talking about clean code architectures.
            </p>

            <div className="flex flex-col gap-sm mt-xs">
              {contactLinks.map(({ href, icon, label, value, target }) => (
                <a key={label} href={href} target={target} rel="noreferrer"
                  className={`glass-panel p-sm rounded-xl flex items-center gap-sm transition-all duration-300 hover-lift ${
                    isDark ? 'hover:border-white/20' : 'hover:border-brand-blue/20'
                  }`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-primary-fixed-dim'
                      : 'bg-brand-blue/6 border-brand-blue/15 text-brand-blue'
                  }`}>
                    {icon}
                  </div>
                  <div>
                    <span className={`block font-label-caps text-[9px] tracking-widest uppercase ${isDark ? 'text-on-surface-variant' : 'text-gray-400'}`}>{label}</span>
                    <span className={`font-bold text-[14px] ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className={`flex flex-col gap-xs mt-sm border p-sm rounded-xl w-fit ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
            }`}>
              <span className={`font-label-caps text-[9px] tracking-widest uppercase ${isDark ? 'text-on-surface-variant' : 'text-gray-400'}`}>DISCORD CLIENT</span>
              <strong className={`font-mono text-[13px] font-bold ${isDark ? 'text-primary-fixed-dim' : 'text-brand-blue'}`}>iheb_dev#1234</strong>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div ref={formRef} className={`md:col-span-7 glass-panel p-md rounded-xl flex flex-col gap-sm ${
            isDark ? '' : 'border-gray-100'
          }`}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label htmlFor="name" className={`font-label-caps text-[10px] tracking-widest uppercase ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                    placeholder="e.g. John Doe" className={inputClass} required />
                </div>
                <div className="flex flex-col gap-xs">
                  <label htmlFor="email" className={`font-label-caps text-[10px] tracking-widest uppercase ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="e.g. john@example.com" className={inputClass} required />
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label htmlFor="subject" className={`font-label-caps text-[10px] tracking-widest uppercase ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="e.g. Project Inquiry" className={inputClass} required />
              </div>

              <div className="flex flex-col gap-xs">
                <label htmlFor="message" className={`font-label-caps text-[10px] tracking-widest uppercase ${isDark ? 'text-on-surface-variant' : 'text-gray-500'}`}>Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                  placeholder="Describe your project, stack requirements, and timeline..."
                  className={`${inputClass} min-h-[150px] resize-y`} required />
              </div>

              {status.type && (
                <div className={`p-4 rounded-lg border text-[14px] flex items-center gap-xs ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                }`}>
                  <span className="material-symbols-outlined text-[18px]">
                    {status.type === 'success' ? 'check_circle' : 'error'}
                  </span>
                  {status.msg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 font-label-caps text-[11px] tracking-widest uppercase font-bold rounded-lg active:scale-95 transition-all flex items-center justify-center gap-xs w-fit cursor-pointer text-white shadow-lg disabled:opacity-60"
                style={{ backgroundImage: 'linear-gradient(135deg, #1e30f3, #e21e80)' }}
              >
                {isSubmitting ? (
                  <>Transmitting...</>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
