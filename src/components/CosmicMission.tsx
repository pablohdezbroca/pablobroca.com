import React from 'react';
import { Terminal, Network, Shield, Zap, ExternalLink, MessageCircle, Radio, Orbit, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const CosmicMission: React.FC = () => {
  const pillarIcons = [Terminal, Network, Shield, Zap];

  return (
    <section id="universo" className="py-20 relative z-10 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header: The Space Mission Narrative */}
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-[#caa1ad] mb-2.5 flex items-center gap-2">
            <Orbit className="w-4 h-4 text-[#a24f61]" />
            <span>El Universo de Sistemas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Ingeniería en Exploración Continua
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* 4 Technical Orbital Satellites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PERSONAL_INFO.pillars.map((pillar, idx) => {
            const Icon = pillarIcons[idx % pillarIcons.length];
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl cosmic-border bg-[#090717]/65 hover:bg-[#110d29]/80 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#3b2361]/35 border border-white/10 flex items-center justify-center text-[#caa1ad] group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-[#a24f61] uppercase tracking-wider">
                      {pillar.orbit}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight mb-2 group-hover:text-[#caa1ad] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-white/[0.05] text-[10px] font-mono text-slate-500">
                  <span>{pillar.code}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Focus: Direct WhatsApp Transmission (Left) + KALTEK.TECH (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Direct WhatsApp Communication Beacon */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#090716]/80 border border-white/15 relative overflow-hidden flex flex-col justify-between shadow-xl">
            {/* Ambient subtle glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#25d366]/10 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#25d366] flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Canal Directo de Transmisión</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">{PERSONAL_INFO.whatsapp.display}</span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                ¿Conversamos sobre un proyecto?
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Escríbeme directamente a mi WhatsApp personal para evaluar soluciones en desarrollo web, infraestructura de redes, seguridad tecnológica o automatización.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <a
                href={PERSONAL_INFO.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#25d366]/30 to-[#128c7e]/50 hover:from-[#25d366]/40 hover:to-[#128c7e]/70 border border-[#25d366]/50 rounded-xl shadow-lg shadow-[#25d366]/15 hover:shadow-[#25d366]/30 transition-all duration-150 group"
              >
                <MessageCircle className="w-4 h-4 fill-[#25d366] text-[#25d366]" />
                <span>Contactarme por WhatsApp</span>
              </a>

              <span className="text-xs font-mono text-slate-400">
                Respuesta directa · {PERSONAL_INFO.whatsapp.rawNumber}
              </span>
            </div>
          </div>

          {/* Featured KALTEK.TECH Initiative Card */}
          <div className="md:col-span-5 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#18112d] via-[#100d22] to-[#25101a] border border-white/15 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-[#caa1ad] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#a24f61]" />
                  <span>Iniciativa Tecnológica</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-[#a24f61]" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                KALTEK.TECH
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Plataforma de ingeniería dedicada al diseño, despliegue y soporte de infraestructuras tecnológicas, redes seguras y soluciones digitales.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href={PERSONAL_INFO.kaltekUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-gradient-to-r from-[#3e2762] to-[#7a2e37] hover:from-[#4c3177] hover:to-[#913742] rounded-xl border border-white/10 shadow-md transition-all duration-150 group"
              >
                <span>Visitar KALTEK.TECH</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
