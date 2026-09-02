import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Code, Cpu, ExternalLink } from 'lucide-react';
import { HeroScene3D } from '../3d/HeroScene3D';
import { soundFx } from '../../utils/soundEffects';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface HeroSectionProps {
  onExploreWork: () => void;
  onConnect: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreWork, onConnect }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle radial emerald background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Identity badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-300 font-medium tracking-wide">
                RUDRA.DEV // DIGITAL HEADQUARTERS
              </span>
            </div>

            {/* Main Headings */}
            <div className="space-y-2">
              <div className="font-mono text-sm sm:text-base text-emerald-400/90 font-medium tracking-widest uppercase flex items-center gap-2">
                <span>HEY, I'M RUDRA.</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-6xl xl:text-7xl tracking-tight text-white leading-[1.08]">
                I BUILD <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200">
                  DIGITAL EXPERIENCES.
                </span>
              </h1>
            </div>

            {/* Role descriptors */}
            <p className="font-mono text-xs sm:text-sm text-emerald-500/80 tracking-wide font-medium">
              {PERSONAL_INFO.role}
            </p>

            {/* Supporting paragraph strictly matching prompt */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              A passionate developer building modern web applications, AI-powered experiences, and ambitious digital products.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                id="hero-explore-btn"
                onClick={() => {
                  soundFx.playClick();
                  onExploreWork();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="group px-7 py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-display font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:bg-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] flex items-center gap-2.5 active:scale-95"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                id="hero-connect-btn"
                onClick={() => {
                  soundFx.playClick();
                  onConnect();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="px-7 py-3.5 rounded-xl bg-[#0b1411]/90 border border-emerald-500/30 text-emerald-300 font-display font-bold text-sm tracking-wide transition-all hover:bg-emerald-950/40 hover:border-emerald-400/60 hover:text-white flex items-center gap-2 active:scale-95 shadow-sm"
              >
                <span>LET'S CONNECT</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>

            {/* Interactive Code Snippet / Tech Glimpse */}
            <div className="pt-4 w-full max-w-lg">
              <div className="p-3 rounded-xl bg-[#060a08]/80 border border-emerald-500/15 backdrop-blur-md font-mono text-xs text-slate-400 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="text-slate-300">const ethos = ['Precision', 'Curiosity', 'Scale'];</span>
                </div>
                <span className="text-[10px] text-emerald-500/60 font-semibold uppercase">READY</span>
              </div>
            </div>

          </div>

          {/* Right Column: Central 3D Interactive Visual (5 cols on lg) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-[500px] lg:max-w-none aspect-square relative rounded-3xl p-1 bg-gradient-to-b from-emerald-500/20 via-emerald-950/10 to-transparent border border-emerald-500/20 backdrop-blur-sm shadow-2xl">
              <HeroScene3D className="w-full h-full rounded-2xl overflow-hidden" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">Scroll to Explore</span>
        <div className="w-4 h-7 rounded-full border border-emerald-500/40 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
