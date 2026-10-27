import React, { useState } from 'react';
import { ExternalLink, MessageCircle, Compass, Radio } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: y * -15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-14 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic & Astronomical Identity */}
          <div className="lg:col-span-7 flex flex-col z-10">
            {/* Celestial coordinate kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4 tracking-wider uppercase">
              <span className="text-[#caa1ad]">Ingeniería en Sistemas</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Exploración & Arquitectura</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-[#a24f61]">Sector 2026</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 text-balance">
              {PERSONAL_INFO.name}
              <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-300 to-[#caa1ad]">
                {PERSONAL_INFO.title}
              </span>
            </h1>

            {/* Philosophical Mission Statement */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8">
              {PERSONAL_INFO.tagline}
            </p>

            {/* Direct Actions: WhatsApp & KALTEK.TECH */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              {/* Primary: Direct WhatsApp Contact */}
              <a
                href={PERSONAL_INFO.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#25d366]/20 via-[#25d366]/30 to-[#128c7e]/40 hover:from-[#25d366]/30 hover:to-[#128c7e]/60 border border-[#25d366]/40 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-2.5 shadow-lg shadow-[#25d366]/10 hover:shadow-[#25d366]/25 group"
              >
                <div className="w-5 h-5 rounded-full bg-[#25d366]/30 border border-[#25d366]/50 flex items-center justify-center text-[#25d366] group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-3.5 h-3.5 fill-[#25d366]" />
                </div>
                <span>Contactarme por WhatsApp</span>
              </a>

              {/* Secondary: KALTEK.TECH */}
              <a
                href={PERSONAL_INFO.kaltekUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm group"
              >
                <span>Visitar KALTEK.TECH</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#caa1ad] group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Tertiary: Explore Mission Profile */}
              <a
                href="#universo"
                onClick={(e) => scrollTo(e, '#universo')}
                className="px-4 py-3 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-[#caa1ad]" />
                <span>Explorar Universo</span>
              </a>
            </div>

            {/* Minimal telemetry coordinates */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#25d366]" />
                <span>Canal Activo: {PERSONAL_INFO.whatsapp.rawNumber}</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <span className="text-slate-300">pablobroca.com</span>
            </div>
          </div>

          {/* Right Column: Original Astronaut Centerpiece in a Full Space Scene */}
          <div
            className="lg:col-span-5 flex items-center justify-center relative select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              }}
            >
              {/* Outer Deep Space Orbital Tracks */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none animate-spin"
                style={{ animationDuration: '70s' }}
                viewBox="0 0 400 400"
              >
                <circle
                  cx="200"
                  cy="200"
                  r="185"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                  strokeDasharray="4 14"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  fill="none"
                  stroke="rgba(122, 46, 55, 0.22)"
                  strokeWidth="1.2"
                />
                {/* Orbiting celestial satellites */}
                <circle cx="200" cy="15" r="3" fill="#caa1ad" />
                <circle cx="385" cy="200" r="2.5" fill="#a24f61" />
                <circle cx="50" cy="200" r="2" fill="rgba(255,255,255,0.4)" />
              </svg>

              {/* Counter-rotating inner telemetry ring */}
              <svg
                className="absolute inset-5 w-[calc(100%-40px)] h-[calc(100%-40px)] pointer-events-none animate-spin"
                style={{ animationDuration: '95s', animationDirection: 'reverse' }}
                viewBox="0 0 400 400"
              >
                <circle
                  cx="200"
                  cy="200"
                  r="170"
                  fill="none"
                  stroke="rgba(68, 38, 105, 0.25)"
                  strokeWidth="1"
                  strokeDasharray="8 20"
                />
              </svg>

              {/* Ambient backdrop glow strictly matching astronaut helmet colors */}
              <div className="absolute w-[270px] h-[270px] rounded-full bg-gradient-to-tr from-[#3b2361]/50 via-[#7a2e37]/35 to-transparent blur-2xl animate-pulse-subtle pointer-events-none" />

              {/* Astronaut Logo Container (The Hero Explorer) */}
              <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl p-1 bg-gradient-to-b from-[#3b2361]/50 via-white/10 to-[#7a2e37]/50 shadow-[0_0_60px_rgba(18,12,43,0.85)] backdrop-blur-sm animate-orbital">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#090715] border border-white/15 relative group">
                  <img
                    src={PERSONAL_INFO.logoPath}
                    alt="Astronauta original de Pablo Broca"
                    className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-104"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Minimal floating telemetry badges */}
              <div className="absolute -bottom-2 -left-2 bg-[#0c091f]/90 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 shadow-md flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a24f61]" />
                <span>Explorar · Construir · Resolver</span>
              </div>

              <div className="absolute -top-1 -right-1 bg-[#0c091f]/90 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 shadow-md">
                <span>Ingeniero en Sistemas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
