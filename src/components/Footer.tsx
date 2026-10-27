import React from 'react';
import { ArrowUp, ExternalLink, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#05040a] pt-12 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Identity & Astronaut Mark */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#a24f61]/40 bg-[#120f26] p-0.5 shadow-[0_0_12px_rgba(122,46,55,0.25)] shrink-0">
              <img
                src={PERSONAL_INFO.logoPath}
                alt="Pablo Broca Astronauta"
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                {PERSONAL_INFO.title}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-400">
            <a
              href={PERSONAL_INFO.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25d366] hover:text-[#42f584] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#25d366]" />
              <span>WhatsApp: {PERSONAL_INFO.whatsapp.rawNumber}</span>
            </a>

            <a
              href={PERSONAL_INFO.kaltekUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#caa1ad] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>KALTEK.TECH</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Volver al inicio"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <div>
            © {PERSONAL_INFO.year} {PERSONAL_INFO.name}. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Exploración, Sistemas & Infraestructura</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
