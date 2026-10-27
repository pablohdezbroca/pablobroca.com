import React from 'react';
import { MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const WhatsAppBeacon: React.FC = () => {
  return (
    <aside
      aria-label="Contacto por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      {/* Tooltip on desktop hover */}
      <div className="hidden md:flex items-center mr-3 px-3 py-1.5 rounded-lg bg-[#0c091f]/95 border border-white/10 text-xs text-white font-mono shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span>WhatsApp: {PERSONAL_INFO.whatsapp.rawNumber}</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={PERSONAL_INFO.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversación de WhatsApp con Pablo Broca"
        className="w-13 h-13 rounded-2xl bg-[#0d091a]/90 hover:bg-[#128c7e]/80 border border-[#25d366]/40 hover:border-[#25d366] text-[#25d366] hover:text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.25)] hover:shadow-[0_0_28px_rgba(37,211,102,0.45)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    </aside>
  );
};
