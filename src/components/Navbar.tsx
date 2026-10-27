import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['inicio', 'universo'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#07070e]/85 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-lg shadow-black/40'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark with Astronaut Icon */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-3 group whitespace-nowrap shrink-0"
            aria-label="Pablo Broca - Inicio"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#a24f61]/40 bg-[#120f26] p-0.5 shadow-[0_0_12px_rgba(122,46,55,0.25)] transition-transform duration-200 group-hover:scale-105">
              <img
                src={PERSONAL_INFO.logoPath}
                alt="Logo original Astronauta Pablo Broca"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-slate-100 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                {PERSONAL_INFO.title}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden sm:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-300">
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, '#inicio')}
              className={`transition-colors whitespace-nowrap relative py-1 ${
                activeSection === 'inicio' ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Inicio
            </a>
            <a
              href="#universo"
              onClick={(e) => handleNavClick(e, '#universo')}
              className={`transition-colors whitespace-nowrap relative py-1 ${
                activeSection === 'universo' ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Universo de Sistemas
            </a>
            <a
              href={PERSONAL_INFO.kaltekUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>KALTEK.TECH</span>
              <ExternalLink className="w-3 h-3 text-[#caa1ad]" />
            </a>
          </nav>

          {/* Zone 3: Direct WhatsApp Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={PERSONAL_INFO.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#25d366]/20 to-[#128c7e]/40 hover:from-[#25d366]/30 hover:to-[#128c7e]/60 border border-[#25d366]/40 rounded-lg shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 group"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25d366] fill-[#25d366]/40" />
              <span>WhatsApp: 998 158 1510</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/5 border border-white/10"
              aria-expanded={mobileMenuOpen}
              aria-label="Menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="sm:hidden fixed inset-0 z-50 bg-[#07070e]/95 backdrop-blur-xl flex flex-col p-6 animate-fadeIn"
        >
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src={PERSONAL_INFO.logoPath}
                alt="Logo Astronauta"
                className="w-8 h-8 rounded-full object-cover border border-white/20"
              />
              <span className="font-bold text-white text-sm">{PERSONAL_INFO.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 border border-white/10"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-8">
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, '#inicio')}
              className="text-base py-2 border-b border-white/5 text-slate-300 hover:text-white"
            >
              Inicio
            </a>
            <a
              href="#universo"
              onClick={(e) => handleNavClick(e, '#universo')}
              className="text-base py-2 border-b border-white/5 text-slate-300 hover:text-white"
            >
              Universo de Sistemas
            </a>
            <a
              href={PERSONAL_INFO.kaltekUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base py-2 border-b border-white/5 text-slate-300 hover:text-white flex items-center justify-between"
            >
              <span>Visitar KALTEK.TECH</span>
              <ExternalLink className="w-4 h-4 text-[#caa1ad]" />
            </a>
          </nav>

          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href={PERSONAL_INFO.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 text-xs font-semibold text-white bg-gradient-to-r from-[#25d366]/30 to-[#128c7e]/50 border border-[#25d366]/40 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-[#25d366]" />
              <span>Contactarme por WhatsApp (998 158 1510)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
