import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-emerald-500/15 bg-[#030605] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-emerald-500/10">
          
          {/* Logo & Identity */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-mono font-bold">
                R
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wider">
                {PERSONAL_INFO.domain}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Built with curiosity, code, and creativity.
            </p>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.githubPlaceholder}
              onClick={(e) => {
                e.preventDefault();
                soundFx.playChirp();
                alert(`GitHub profile placeholder: ${PERSONAL_INFO.githubPlaceholder}`);
              }}
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedinPlaceholder}
              onClick={(e) => {
                e.preventDefault();
                soundFx.playChirp();
                alert(`LinkedIn profile placeholder: ${PERSONAL_INFO.linkedinPlaceholder}`);
              }}
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.emailPlaceholder}`}
              onClick={() => soundFx.playChirp()}
              aria-label="Email Address"
              className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all ml-2"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Rudra. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>HQ STATUS: RUNNING NORMALLY</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
